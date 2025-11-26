import { createClient } from "@supabase/supabase-js";
import env from "../config/env.js";
import logger from "../config/logger.js";

const supabase = createClient(env.supabaseUrl, env.supabaseKey, {
  auth: { persistSession: false },
});

export const pingSupabase = async () => {
  const { data, error } = await supabase.from("projects").select("*");
  if (error) {
    logger.error("pingSupabase failed %o", error);
    throw error;
  }
  return data;
};

// ====== PostgreSQL CRUD Operations ======
export async function createRecord(tableName, record) {
  // Validate tableName and record
  if (tableName === undefined || tableName === null || tableName === "")
    return Error("table name is required");
  if (record === undefined || record === null || record === "")
    return Error("record is required");

  try {
    const { data: result, error } = await supabase
      .from(tableName)
      .insert(record);
    if (error) {
      logger.error(`createRecord failed for table ${tableName}: %o`, error);
      throw error;
    }
    return result;
  } catch (error) {
    logger.error(`createRecord failed for table ${tableName}: %o`, error);
    throw error;
  }
}

export async function readRecords(tableName, query = {}) {
  // Validate tableName
  if (tableName === undefined || tableName === null || tableName === "")
    return Error("table name is required");

  try {
    const { data: results, error } = await supabase
      .from(tableName)
      .select(query);
    if (error) {
      logger.error(`readRecords failed for table ${tableName}: %o`, error);
      throw error;
    }
    return results;
  } catch (error) {
    logger.error(`readRecords failed for table ${tableName}: %o`, error);
    throw error;
  }
}

export async function updateRecord(tableName, record) {
  // Validate tableName and record
  if (tableName === undefined || tableName === null || tableName === "")
    return Error("table name is required");
  if (record === undefined || record === null || record === "")
    return Error("record is required");

  try {
    const { data: result, error } = await supabase
      .from(tableName)
      .update(record)
      .eq("id", record.id)
      .select()
      .single();
    if (error) {
      logger.error(`updateRecord failed for table ${tableName}: %o`, error);
      throw error;
    }
    return result;
  } catch (error) {
    logger.error(`updateRecord failed for table ${tableName}: %o`, error);
    throw error;
  }
}

export async function deleteRecord(tableName, recordId) {
  // Validate tableName and record
  if (tableName === undefined || tableName === null || tableName === "")
    return Error("table name is required");
  if (recordId === undefined || recordId === null || recordId === "")
    return Error("record id is required");

  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq("id", recordId);
    if (error) {
      logger.error(`deleteRecord failed for table ${tableName}: %o`, error);
      throw error;
    }
    return true;
  } catch (error) {
    logger.error(`deleteRecord failed for table ${tableName}: %o`, error);
    throw error;
  }
}

// ====== Storage Bucket CRUD Operations ======
export async function uploadFile(bucketName, path, fileBuffer, options = {}) {
  // Validate bucketName, path, fileBuffer, and options
  if (bucketName === undefined || bucketName === null || bucketName === "")
    return Error("bucket name is required");
  if (path === undefined || path === null || path === "")
    return Error("path is required");
  if (fileBuffer === undefined || fileBuffer === null || fileBuffer === "")
    return Error("file buffer is required");
  if (options === undefined || options === null || options === "")
    return Error("options are required");

  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(path, fileBuffer, options);
    if (error) {
      logger.error(`uploadFile failed for bucket ${bucketName}: %o`, error);
      throw error;
    }
    return data;
  } catch (error) {
    logger.error(`uploadFile failed for bucket ${bucketName}: %o`, error);
    throw error;
  }
}

export async function getSignedUrl(bucketName, path, expiresIn = 3600) {
  // Validate bucketName, path, and expiresIn
  if (bucketName === undefined || bucketName === null || bucketName === "")
    return Error("bucket name is required");
  if (path === undefined || path === null || path === "")
    return Error("path is required");

  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(path, expiresIn);
    if (error) {
      logger.error(`getSignedUrl failed for bucket ${bucketName}: %o`, error);
      throw error;
    }
    return data;
  } catch (error) {
    logger.error(`getSignedUrl failed for bucket ${bucketName}: %o`, error);
    throw error;
  }
}

export async function removeFile(bucketName, paths) {
  // Validate bucketName, paths
  if (bucketName === undefined || bucketName === null || bucketName === "")
    return Error("bucket name is required");
  if (paths === undefined || paths === null || paths === "")
    return Error("paths are required");

  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove(Array.isArray(paths) ? paths : [paths]);
    if (error) {
      logger.error(`removeFile failed for bucket ${bucket}: %o`, error);
      throw error;
    }
    return true;
  } catch (error) {
    logger.error(`removeFile failed for bucket ${bucket}: %o`, error);
    throw error;
  }
}

export default {
  pingSupabase,
  createRecord,
  readRecords,
  updateRecord,
  deleteRecord,
  uploadFile,
  getSignedUrl,
  removeFile,
};
