import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { __dirname } from './utils.js';
import userRouter from "./routes/user.router.js";
import viewsRouter from './routes/views.router.js'
import "./db/connection.js";
import handlebars from 'express-handlebars';

//-------------------------📌FILESTORE IMPORTS
import sessionFileStore from "session-file-store";
import cookieRouter from "./routes/cookieFS.router.js";

const app = express();

//-------------------------📌FILESTORE

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
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');  

//-------------------------📌SESSION OPTION

app.use(session(fileStoreOptions));

app.use("/users", userRouter);
app.use('/views', viewsRouter);

//-------------------------📌APIS ROUTES
app.use("/api/cookies", cookieRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});

export default app;
