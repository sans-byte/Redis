import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.on("error", console.error);

app.post("/submit", async (req, res) => {
  const { problemId, code, language } = req.body;
  try {
    await client.lPush(
      "submissions",
      JSON.stringify({ code, language, problemId })
    );
    res.status(200).send("Submission recieved and stored");
  } catch (err) {
    console.error("Redis error", err);
    return res.status(500).send("Failed to store submission");
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to redis client");

    app.listen(3000, () => {
      console.log("Connected to server");
    });
  } catch (error) {
    console.log("Failed to connect to redis or server", error);
  }
}

startServer();
