Chosen Component: Real-time Leaderboard

What We Will Implement for the Leaderboard:

    •	A route or socket event on the backend that continuously sends updated ranking data to the frontend whenever a participant’s score changes.
    •	A frontend Leaderboard component that subscribes to a leaderboard_update event and updates the UI in real-time.

What We Will Mock:

    1.	Real-time Quiz Participation:

We will mock the quiz joining process. Instead of fully implementing “join with a unique quiz ID” flows, we will hard-code a quiz ID or simulate a user joining via a simple mock function or a fake form. The backend can have a hardcoded set of participants. 2. Real-time Score Updates:
We will mock the score updating events. Instead of implementing full user answer submissions and scoring logic, we can simulate periodic random score updates from the server to trigger leaderboard changes. This way, we don’t have to build the entire quiz flow.

Implementation Plan
• Real-Time Leaderboard Component (Focus Area):
• Frontend:
• Develop the Leaderboard component to display participants’ scores.
• Establish a WebSocket connection to receive real-time score updates.
• Update the leaderboard dynamically as new data arrives.
• Backend:
• Set up a WebSocket server to broadcast score updates to all connected clients.
• Manage score data in an in-memory store for quick access and updates.
• Mocked Components:
• Quiz Participation:
• Mock the user authentication and quiz joining process.
• Simulate multiple users joining a quiz session using hardcoded data or simple scripts.
• Score Submission:
• Create a mock function to simulate answer submissions and score calculations.
• Trigger score updates at intervals to demonstrate real-time leaderboard functionality.

4. Development Steps
   • Backend Setup:
   • Initialize the Node.js project and install necessary dependencies (express, socket.io).
   • Set up the Express server and integrate Socket.IO for real-time communication.
   • Implement mock endpoints and functions to simulate quiz participation and score submissions.
   • Frontend Setup:
   • Initialize the React project and install necessary dependencies (socket.io-client).
   • Develop the Leaderboard component to display real-time scores.
   • Establish a WebSocket connection to the backend to receive score updates.
   • Implement mocked components or scripts to simulate user participation and answer submissions.s

# Backend Endpoints

1. Join Quiz

- Endpoint: POST /api/quiz/join
- Description: Allows a user to join a quiz session by providing a unique quiz ID.
- Request Payload:

```json
{
  "quizId": "12345",
  "userId": "user1",
  "userName": "John Doe"
}
```

- Response

```json
{
  "quizId": "12345",
  "userId": "user1",
  "userName": "John Doe"
}
```

- Mock function
  Simulate storing the user in a mock in-memory data structure:

```js
const quizSessions = {};
function joinQuiz({ quizId, userId, userName }) {
  if (!quizSessions[quizId]) {
    quizSessions[quizId] = { participants: {} };
  }
  quizSessions[quizId].participants[userId] = { userName, score: 0 };
  return { status: "success", message: "User joined the quiz successfully" };
}
```

2. Submit Answer

- Endpoint: POST /api/quiz/submit
- Description: Submits a user’s answer and updates their score.
- Request Payload:

```json
{
  "quizId": "12345",
  "userId": "user1",
  "answer": "A"
}
```

- Response

```json
{
  "status": "success",
  "message": "Answer submitted successfully",
  "score": 10
}
```

- Mock function

```js
function submitAnswer({ quizId, userId, answer }) {
  const correctAnswer = "A"; // Hardcoded correct answer for simplicity
  const scoreIncrement = answer === correctAnswer ? 10 : 0;
  quizSessions[quizId].participants[userId].score += scoreIncrement;
  return {
    status: "success",
    score: quizSessions[quizId].participants[userId].score,
  };
}
```

3. Get Leaderboard

- Endpoint: GET /api/quiz/leaderboard/:quizId
- Description: Retrieves the current leaderboard for a quiz.
- Response:

```json
{
  "quizId": "12345",
  "leaderboard": [
    { "userId": "user1", "userName": "John Doe", "score": 20 },
    { "userId": "user2", "userName": "Jane Doe", "score": 15 }
  ]
}
```

- Mock function
  Return sorted participant score:

```js
function getLeaderboard(quizId) {
  const participants = quizSessions[quizId]?.participants || {};
  const leaderboard = Object.entries(participants)
    .map(([userId, { userName, score }]) => ({ userId, userName, score }))
    .sort((a, b) => b.score - a.score);
  return { quizId, leaderboard };
}
```
