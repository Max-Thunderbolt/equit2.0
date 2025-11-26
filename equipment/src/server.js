import express from "express";
import morgan from "morgan";
import logger from "./config/logger.js";
import storageRoutes from "./routes/storageRoutes.js";

export const createServer = (dependencies = {}) => {
  const app = express();

  app.use(express.json());
  app.use(
    morgan("combined", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );

  app.use((req, _res, next) => {
    req.context = dependencies;
    next();
  });

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().getTime() });
  });

  app.use("/api/storage", storageRoutes);

  app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
  });

  app.use((err, _req, res, _next) => {
    logger.error("Unhandled error: %o", err);
    res.status(err.status || 500).json({ message: "Internal Server Error" });
  });

  return app;
};

export default createServer;
