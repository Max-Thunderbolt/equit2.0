import logger from "../config/logger.js";
import supabaseService from "../services/supabaseService.js";

export const pingStorage = async (_req, res, next) => {
  try {
    const result = await supabaseService.pingSupabase();
    res.json({ status: "ok", upstream: result });
  } catch (error) {
    logger.error("pingStorage failed %o", error);
    next(error);
  }
};
