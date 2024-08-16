/** @format */

import { bot } from "../bot";
import { CHANNEL_ID } from "../config";
import { getExpiringSubscriptions } from "../database";
import { generateInviteLink } from "./generate-invite-link";

export async function checkExpiringSubscriptions() {
  const expiringUsers = await getExpiringSubscriptions();
  for (const user of expiringUsers) {
    try {
      const inviteLink = await generateInviteLink(CHANNEL_ID);
      await bot.api.sendMessage(
        user.telegramId,
        `Your channel subscription is expiring in 2 minutes. Please use /pay to renew your subscription. ` +
          `If you renew, you can use this link to rejoin: ${inviteLink}\nThis link will expire in 5 minutes.`
      );
    } catch (error) {
      console.error(`Error notifying user ${user.telegramId}:`, error);
    }
  }
}
