const express = require("express");
const redis = require("redis");
const path = require("path");

const app = express();
const client = redis.createClient({
  url: "redis://redis:6379"
});

client.connect();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/queue", async (req, res) => {
  const queue = await client.incr("queue_number");
  res.json({
    queue_number: queue,
    server: process.env.HOSTNAME
  });
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});
