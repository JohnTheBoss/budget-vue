const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const jwt = require("express-jwt");

const app = express();
app.use(cookieParser());
const server = http.createServer(app);

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 8000;

app.set("port", port);
app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: "false" }));

const ApiRoute = require("./routes");
app.use("/api", ApiRoute);

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

if (config.dev) {
  app.use(require("morgan")("dev"));
}

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  server.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
