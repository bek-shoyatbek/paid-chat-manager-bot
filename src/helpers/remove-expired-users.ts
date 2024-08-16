/** @format */

import { bot } from "../bot";
import { getExpiredSubscriptions } from "../database";

export async function removeExpiredUsers() {
  const expiredUsers = await getExpiredSubscriptions();
  for (const user of expiredUsers) {
    try {
      await bot.api.banChatMember(user.channelId, user.telegramId);
      await bot.api.unbanChatMember(user.channelId, user.telegramId); // Immediately unban to allow re-joining
      await bot.api.sendMessage(
        user.telegramId,
        "Your subscription has expired. You've been removed from the channel. " +
          "Use /pay to renew your subscription, and you'll receive a new invite link to rejoin."
      );
    } catch (error) {
      console.error(
        `Error removing user ${user.telegramId} from channel:`,
        error
      );
    }
  }
}
