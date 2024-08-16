/** @format */

import dotenv from "dotenv";

dotenv.config();

export const BOT_TOKEN = process.env.BOT_TOKEN || "";

export const CHANNEL_ID = process.env.CHANNEL_ID || "";

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/channel-admin-bot";
