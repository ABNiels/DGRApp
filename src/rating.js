a1 = 0.2 // playerHoleScore Weight
a2 = 0.384310893 // LOG(10^0.5,20) Expected Strokes Constant

const LOG20 = (x) => Math.log(x) / Math.log(20);

const calcExpectedScore = (playerScore, playerHoleScore, holeScore) => {
    /*
    Modified Player Score = Mps = Player Score + (Player Hole Score - Player Score) * a1
    Rating Differential = Rd = Hole Score - Mps
    Expected Score = Es = 1 / (1 + 10 ^ (Rd / 360))
    */
    return 1/(1+Math.pow(10, (holeScore-playerScore+(playerHoleScore-playerScore)*a1)/360));
}

const calcExpectedStrokes = (eScore) => {
    return (LOG20(1-eScore) - LOG20(eScore)) / a2;
}

// export all functions
module.exports = {
    calcExpectedScore,
    calcExpectedStrokes
}