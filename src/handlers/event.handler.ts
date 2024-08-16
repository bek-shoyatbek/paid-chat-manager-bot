/** @format */

import { Context } from "grammy";
import { checkSubscription } from "../database";
import {
  APPROVED_MESSAGE_ENG,
  SUBSCRIPTION_EXPIRING_MESSAGE_ENG,
} from "../constants/messages";

export async function handleChatJoinRequestEvent(ctx: Context) {
  const chatId = ctx.chatJoinRequest!.chat.id;
  const userId = ctx.chatJoinRequest!.from.id;

  if (await checkSubscription(userId)) {
    try {
      await ctx.api.approveChatJoinRequest(chatId, userId);
      await ctx.api.sendMessage(userId, APPROVED_MESSAGE_ENG);
    } catch (error) {
      console.error("Error approving join request:", error);
    }
  } else {
    try {
      await ctx.api.declineChatJoinRequest(chatId, userId);
      await ctx.api.sendMessage(userId, SUBSCRIPTION_EXPIRING_MESSAGE_ENG);
    } catch (error) {
      console.error("Error declining join request:", error);
    }
  }
}
