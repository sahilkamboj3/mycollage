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
import {
  DB_PASSWORD,
  DB_NAME,
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
} from "./config/db";
import { REDIS_PORT, REDIS_HOST } from "./config/redis";
import {
  SESSIONS_IS_SECURE,
  SESSIONS_MAX_AGE,
  SESSIONS_SECRET,
} from "./config/sessions";
import { CORS_FRONTEND_URI } from "./config/cors";
import { JAVA_BACKEND_SERVER } from "./config";

/*
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
*/
createConnection({
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [Account],
  synchronize: true,
  logging: false,
})
  //.then(async (connection) => {
  .then(async (connection) => {
    console.log("Postgres connection established");

    const app = express();
    let redisClient = redis.createClient({
      port: REDIS_PORT,
      host: REDIS_HOST,
    });

    const corsOptions = {
      origin: CORS_FRONTEND_URI,
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
        secret: SESSIONS_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
          secure: SESSIONS_IS_SECURE, // allows transmission over HTTP
          maxAge: SESSIONS_MAX_AGE, // 12 hours
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
        origin: CORS_FRONTEND_URI,
      },
    });

    io.on("connection", (socket: Socket) => {
      socket.on("PUT/image", (image) => {
        console.log("Socket PUT/image request received...");
        fetch(`${JAVA_BACKEND_SERVER}/images/${image.imageID}`, {
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
