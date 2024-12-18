// services/scoreService.js
/**
 * •	We’ll have a setInterval in the backend that every 5 seconds:
    •	Picks a random participant.
    •	Increments their score by a random amount, say between 1 and 5 points.
    •	After updating the score, we emit a leaderboard_update event via Socket.IO.
 */
const fs = require('fs');

const dataPath = '/Users/admin/Desktop/elsa-coding-challenges/mock-data/participants.json'

const participants = JSON.parse(fs.readFileSync(dataPath));

const SCORE_UPDATE_INTERVAL = 3000

function randomScoreUpdate(io) {
    setInterval(() => {
        // Sort to find the lowest ranked participant (by score)
        const sorted = [...participants].sort((a, b) => b.score - a.score);
        const lowestParticipant = sorted[sorted.length - 1]; // last in sorted array

        // Give a big random increment to the lowest-ranked participant
        const bigIncrement = Math.floor(Math.random() * 91) + 10; // between 10 and 100
        lowestParticipant.score += bigIncrement;

        console.log(`Increase score for ${lowestParticipant.name} - ${bigIncrement}`)
        // Emit updated leaderboard
        const leaderboard = computeLeaderboard();
        io.emit('leaderboard_update', leaderboard);

        // Update the participants.json file
        fs.writeFileSync(dataPath, JSON.stringify(participants, null, 2));
    }, SCORE_UPDATE_INTERVAL);
}

function computeLeaderboard() {
    // Sort participants by score descending
    return [...participants].sort((a, b) => b.score - a.score);
}

module.exports = { randomScoreUpdate, computeLeaderboard };