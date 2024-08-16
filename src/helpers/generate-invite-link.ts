/** @format */

import { bot } from "../bot";

export async function generateInviteLink(channelId: string): Promise<string> {
  try {
    const invite = await bot.api.createChatInviteLink(channelId, {
      member_limit: 1,
      expire_date: Math.floor(Date.now() / 1000) + 300, // Link expires in 5 minutes
    });
    return invite.invite_link;
  } catch (error) {
    console.error("Error generating invite link:", error);
    throw error;
  }
}
