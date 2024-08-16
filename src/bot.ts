/** @format */

import { Bot } from "grammy";
import {
  handleGetChannelIdCmd,
  handlePayCmd,
  handleRegisterCmd,
  handleStartCmd,
} from "./handlers/command.handler";
import { BOT_TOKEN } from "./config";
import { handleChatJoinRequestEvent } from "./handlers/event.handler";
import {
  REMOVAL_OF_EXPIRED_USERS_TIME_INTERVAL,
  SUBSCRIPTION_EXPIRING_CHECK_TIME_INTERVAL,
} from "./constants/times";
import { checkExpiringSubscriptions } from "./helpers/check-expiring-sub";
import { removeExpiredUsers } from "./helpers/remove-expired-users";

const bot = new Bot(BOT_TOKEN);

bot.command("start", handleStartCmd);

bot.command("register", handleRegisterCmd);

bot.command("pay", handlePayCmd);

bot.command("channel_id", handleGetChannelIdCmd);

bot.on("chat_join_request", handleChatJoinRequestEvent);

// Run the expiration check every 30 seconds
setInterval(
  checkExpiringSubscriptions,
  SUBSCRIPTION_EXPIRING_CHECK_TIME_INTERVAL
);

// Run the removal of expired users every 30 seconds
setInterval(removeExpiredUsers, REMOVAL_OF_EXPIRED_USERS_TIME_INTERVAL);

export { bot };
