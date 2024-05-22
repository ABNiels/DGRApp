import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

var DBObject = null;

async function getDBConnection(): Promise<SQLite.WebSQLDatabase> {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/discgolfrewards.db')).exists) {
    await FileSystem.downloadAsync(
      Asset.fromModule(require('../assets/discgolfrewards.db')).uri,
      FileSystem.documentDirectory + 'SQLite/discgolfrewards.db'
    );
  }
  DBObject = await SQLite.openDatabase('discgolfrewards.db');
  return DBObject
}

const DBQueries = {
/* Get rounds and their relevant information. */
  RoundsQuery:  `
SELECT
  s.Date,
  p.name AS playerName,
  c.name AS courseName,
  l.name AS layoutName,
  COUNT(h.ID) AS numHoles,
  l2.numLayoutHoles as numLayoutHoles,
  SUM(s.strokes) AS totalStrokes,
  SUM(h.par) AS totalPar,
  s.RoundNumber AS RoundNumber,
  s.CardNumber as CardNumber
FROM Scores s
  JOIN Players p ON p.ID = s.PlayerID
  JOIN Layouts l ON l.id = s.LayoutID
  JOIN Holes h ON h.ID = l.HoleID
  JOIN Courses c ON c.ID = h.CourseID
  LEFT JOIN (
    SELECT
        layout,
        COUNT(h.ID) AS numLayoutHoles
    FROM LAYOUTS l
    JOIN Holes h ON h.ID = l.HoleID
    GROUP BY layout
  ) AS l2 ON l2.layout = l.layout
WHERE s.RoundNumber > 0
GROUP BY s.RoundNumber
ORDER BY s.Date DESC;
`,

/* Get courses and their relevant information. */
  CoursesQuery : `
SELECT
	c.Name as CourseName, l.Name as LayoutName, l.layout as LayoutNum,
  COUNT(l.Hole) as NumHoles,
  SUM(h.distance) as TotalDistance,
  LayoutRatings.Rating as cRating,
  SUM(h.distance)/285 + 30 as EstimateSSA, SUM(h.par) as cPar
FROM
	Courses c
	JOIN Holes h on h.CourseID = c.ID
	JOIN Layouts l on l.HoleID = h.id
	JOIN (
		SELECT
			AVG(s.HoleRating) as Rating, l.Layout as layout
		FROM
			Scores s
			JOIN Layouts l on s.LayoutID = l.ID
		GROUP BY l.layout
		ORDER BY DATE DESC
	) LayoutRatings on LayoutRatings.layout = l.layout
GROUP BY l.Layout
`,

/* Get Players latest rating for non-calibration players. */
  PlayersQuery : `
WITH RankedScores AS (
  SELECT
      PlayerID,
      PlayerRating,
      Date,
  CardNumber,
      ROW_NUMBER() OVER (PARTITION BY PlayerID ORDER BY Date DESC, LayoutID DESC) AS rn
  FROM scores
)
SELECT PlayerID as PlayerID, PlayerRating as PlayerRating, p.Name as PlayerName
FROM RankedScores
JOIN Players p on RankedScores.PlayerID = p.ID
WHERE rn = 1 AND CardNumber > 0;
`,

/* Cancer. */
  HoleInfoQuery : `
WITH HoleRatings AS (
  SELECT
      l.hole,
      s.HoleRating,
      h.par,
      h.distance,
      s.layoutID,
      ROW_NUMBER() OVER (PARTITION BY l.HoleID ORDER BY s.Date DESC) AS rowNum
  FROM Scores s
  JOIN Layouts l ON s.LayoutID = l.ID
  JOIN Holes h ON l.HoleID = h.ID
  WHERE l.layout = ?
),
PlayerRatings AS (
  SELECT
      PlayerID,
      PlayerRating,
      ROW_NUMBER() OVER (PARTITION BY PlayerID ORDER BY Date DESC, LayoutID DESC) AS rowNum
  FROM scores
),
PHRating AS (
  SELECT 
      playerID, Score, Date, HoleRating, LayoutID,
      ROW_NUMBER() OVER (PARTITION BY playerID, LayoutID ORDER BY date DESC) AS row_num
  FROM Scores
)
SELECT
  hr.hole,
  hr.HoleRating,
  hr.par,
  hr.distance,
  MAX(CASE WHEN pr.PlayerID = 1 THEN pr.PlayerRating END) AS Player1Rating,
  MAX(CASE WHEN pr.PlayerID = 2 THEN pr.PlayerRating END) AS Player2Rating,
  AVG(CASE WHEN phr.PlayerID = 1 THEN phr.Score ELSE NULL END)*800.0-400.0+AVG(CASE WHEN phr.PlayerID = 1 THEN phr.HoleRating ELSE NULL END) as Player1HoleRating,
  AVG(CASE WHEN phr.PlayerID = 2 THEN phr.Score ELSE NULL END)*800.0-400.0+AVG(CASE WHEN phr.PlayerID = 2 THEN phr.HoleRating ELSE NULL END) as Player2HoleRating,
  (SELECT Name FROM Players WHERE ID = 1) as Player1Name,
  (SELECT Name FROM Players WHERE ID = 2) as Player2Name
FROM 
  HoleRatings hr
  JOIN PlayerRatings pr ON hr.rowNum = 1 AND pr.rowNum = 1
  JOIN PHRating phr ON hr.LayoutID = phr.LayoutID AND phr.row_num <= 3
GROUP BY hr.hole, hr.HoleRating, hr.par, hr.distance;

`
}

export { DBObject, getDBConnection, DBQueries };