import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import "./db/connection.js";

import { __dirname } from './utils.js';

//-------------------------📌VIEWS IMPORTS

import userRouter from "./routes/users.router.js";
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars';

//-------------------------📌APIS IMPORTS
import cookiesRouter from "./routes/cookies.router.js";


//-------------------------📌FILESTORE IMPORTS
/* 
import sessionFileStore from "session-file-store";
 */
//-------------------------📌MONGOSTORE

import MongoStore from "connect-mongo";
import { connectionString } from "./db/connection.js";


const app = express();

//-------------------------📌FILESTORE SESSION OPTIONS
/* 
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
 */
//-------------------------📌FILESTORE SESSION OPTIONS

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

//-------------------------📌GENERAL SETTINGS

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');  

//-------------------------📌SESSION OPTION

//app.use(session(fileStoreOptions));
app.use(session(mongoStoreOptions));


//-------------------------📌 VIEWS
app.use("/users", userRouter);
app.use('/views', viewsRouter);

//-------------------------📌APIS ROUTES
app.use("/api/cookies", cookiesRouter);


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server OK on port:: ${PORT}`);
});

export default app;
