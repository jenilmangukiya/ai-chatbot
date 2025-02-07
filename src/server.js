import express from "express";
import next from "next";
import cron from "node-cron";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Define your cron job here
  cron.schedule("*/10 * * * * *", () => {
    console.log("Running a task every 10 seconds...");
    // Your task logic here
  });

  // Handle Next.js API routes
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
