import env from "./config/env.js";
import logger from "./config/logger.js";
import { createServer } from "./server.js";
import * as supabaseService from "./services/supabaseService.js";

async function bootstrap() {
  try {
    const supabasePingResult = await supabaseService.pingSupabase();
    if (supabasePingResult.error) {
      logger.error(
        "Supabase connectivity failed: %o",
        supabasePingResult.error
      );
      process.exit(1);
    }
    logger.info("Supabase connectivity verified");

    const app = createServer({ supabaseService });

    const server = app.listen(env.port, () => {
      logger.info(`Equipment API listening on http://localhost:${env.port}`);
    });

    const shutdown = async (signal) => {
      logger.info(`Signal ${signal} received, closing server...`);
      server.close(() => {
        process.exit(0);
      });
    };

    ["SIGINT", "SIGTERM"].forEach((signal) => {
      process.on(signal, () => shutdown(signal));
    });
  } catch (error) {
    logger.error("Failed to bootstrap server %o", error);
    process.exit(1);
  }
}

bootstrap();
