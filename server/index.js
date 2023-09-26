const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1677668",
  key: "50f2bc5d526d3e030b8f",
  secret: "a8c75711e7f34a63e774",
  cluster: "ap2",
  useTLS: true,
});

const app = express();

// middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "http://localhost:4200",
    ],
  })
);

app.use(express.json());

app.post("/api/messages", async (req, res) => {
  await pusher.trigger("next-chat", "message", {
    username: req.body.username,
    message: req.body.message,
  });

  res.json([]);
});

console.log("listening to port 8000");
app.listen(8000);
