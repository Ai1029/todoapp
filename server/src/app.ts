import express from "express";
import createError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { ErrorRequestHandler } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import indexRouter from "./routes/index";
import categoryRouter from "./routes/category";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:3000", //アクセス許可するオリジン
    optionsSuccessStatus: 200, //レスポンスstatusを200に設定
  })
);

app.use("/api/v1/list", indexRouter);
app.use("/api/v1/category", categoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
const errorHandler: ErrorRequestHandler = function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error as JSON
  res.status(500).json({ error: err });
};
app.use(errorHandler);

export default app;
