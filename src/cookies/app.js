import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

//-----------------------📌FILESTORE

import sessionFileStore from "session-file-store";
import mainRouter from "./routes/cookie.router.js";

const app = express();

const FileStore = sessionFileStore(session)

const fileStoreOptions = {
  store: new FileStore({
    path: './sessions',
    ttl: 120,
    reapInterval: 60
  }),
  secret: '1234',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 120000
  }
}

app.use(express.json());
app.use(cookieParser());

app.use(session(fileStoreOptions)); 

//-----------------------📌MONOGSTORE

/* import MongoStore from "connect-mongo";
import mainRouter from "./routes/user.routes.js";
import "./db/connection.js";
import { connectionString } from "./db/connection.js";

const app = express();

const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: connectionString,
    ttl: 120,
    crypto: {
      secret: '1234'
    }
  }),
  secret: "1234",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 120000,
  },
};

app.use(express.json());
app.use(cookieParser());

app.use(session(mongoStoreOptions));
 */
app.use("/cookies", mainRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor express listo para usar "FileStore" en el puerto ${PORT}`);
});

export default app;
