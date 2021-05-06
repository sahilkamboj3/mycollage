import express, { json } from "express";
import redis from "redis";
import session from "express-session";
const redisStore = require("connect-redis")(session);
import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import bcrypt from "bcrypt";
import cors from "cors";

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
    console.log("connection established");

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

    redisClient.on("connect", () => {
      console.log("redisClient connected");
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
          maxAge: 1000 * 60 * 30,
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
      console.log(`listening on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
