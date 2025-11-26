import winston from "winston";
import { env } from "./env.js";

const { combine, timestamp, printf, colorize, splat } = winston.format;

const logFormat = printf(({ level, message, timestamp: ts, ...meta }) => {
  const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
  return `${ts} [${level}] ${message}${metaString}`;
});

const logger = winston.createLogger({
  level: env.nodeEnv === "production" ? "info" : "debug",
  format: combine(splat(), timestamp(), logFormat),
  transports: [
    new winston.transports.Console({
      format:
        env.nodeEnv === "production"
          ? combine(timestamp(), logFormat)
          : combine(colorize(), timestamp(), logFormat),
    }),
  ],
});

export default logger;
