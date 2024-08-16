/** @format */

import { connectToDatabase } from "./database";
import { bot } from "./bot";

async function main() {
  await connectToDatabase();
  await bot.start();
  console.log("Bot is running...");
}

main().catch(console.error);
