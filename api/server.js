const express = require("express");
const path = require("path");

const { middlewares } = require("./middlewares/index");
const { validateEnv } = require("./utils/validateEnv");
const { connectDB } = require("./db/config");

const spotifyRouter = require("./routes/spotifyRouter");

const { PORT } = validateEnv();

const app = express();

middlewares(app);
connectDB();

app.use("/spotify/v1", spotifyRouter);

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

app.all("/{*splat}", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Backend Server Running > PORT = ${PORT}`);
});
