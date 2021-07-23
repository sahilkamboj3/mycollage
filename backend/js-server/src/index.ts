import express, { json } from "express";
import fileUpload from "express-fileupload";
import redis from "redis";
import session from "express-session";
import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import bcrypt from "bcrypt";
import cors from "cors";
import { Socket } from "socket.io";
import http from "http";
const redisStore = require("connect-redis")(session);
import fetch from "node-fetch";

import accountApi from "./Account/api";
import { Account } from "./entity/Account";

createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "lovebread3",
  database: "mycollage",
  entities: [Account],
  synchronize: true,
  logging: false,
})
  .then(async (connection) => {
    console.log("Postgres connection established");

    const app = express();
    let redisClient = redis.createClient({
      port: 6379,
      host: "localhost",
    });
    const corsOptions = {
      origin: "http://localhost:3000",
      credentials: true,
    };

    app.use(json());
    app.use(cors(corsOptions));
    app.use(fileUpload());

    redisClient.on("connect", () => {
      console.log("Redis client connected");
    });

    app.use(
      session({
        store: new redisStore({
          client: redisClient,
        }),
        secret: "mycollage",
        saveUninitialized: false,
        resave: false,
        cookie: {
          secure: false, // allows transmission over HTTP
          maxAge: 1000 * 60 * 60 * 12, // 12 hours
        },
      })
    );

    const port: number = 5000 || process.env.PORT;

    app.get("/", (_req, res) => {
      res.send("js-server app");
    });

    // repositories
    const accountRepository = getRepository(Account);

    // Account API endpoints
    app.use("/accounts", await accountApi(accountRepository, bcrypt));

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });

    // sockets
    const httpServer = http.createServer(app);
    httpServer.listen(port + 1);

    const io = require("socket.io")(httpServer, {
      cors: {
        origin: "http://localhost:3000",
      },
    });

    io.on("connection", (socket: Socket) => {
      socket.on("PUT/image", (image) => {
        fetch(`http://localhost:8080/images/${image.imageID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true",
          },
          body: JSON.stringify({
            imageID: image.imageID,
            width: image.width,
            height: image.height,
            posX: image.posX,
            posY: image.posY,
            rot: image.rot,
            zindex: image.zindex,
          }),
        });
        // TODO: do error handling
      });
    });
  })
  .catch((err) => console.error(err));
