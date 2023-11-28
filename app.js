import "dotenv/config";

import express from 'express';
import cors from "cors";
import mongoose from "mongoose";

// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
//  || "mongodb://127.0.0.1:27017/kanbas";
const CONNECTION_STRING = "mongodb+srv://fountainsAdmin:67HywSBufIfOhfWm@cluster0.3pkvr30.mongodb.net/kanbas?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_STRING);

import session from "express-session";

import Hello from './hello.js';
import Lab5 from './Lab5.js';
import CourseRoutes from './courses/routes.js';
import ModuleRoutes from './modules/routes.js';
import AssignmentRoutes from "./assignments/routes.js";

import UserRoutes from "./users/routes.js";

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));

app.use(express.json());
  
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);

UserRoutes(app);

app.listen(process.env.PORT || 4000);