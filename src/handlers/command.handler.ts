/** @format */

import { CommandContext, Context } from "grammy";
import {
  ERROR_PROCESSING_PAYMENT_MESSAGE_ENG,
  MESSAGE_AFTER_PAYMENT_RECEIVED_ENG,
  MESSAGE_AFTER_REGISTERED_ENG,
  PERMISSION_ACCEPTED_MESSAGE_ENG,
  WELCOME_MESSAGE_ENG,
} from "../constants/messages";
import { recordPayment, registerUser } from "../database";
import { CHANNEL_ID } from "../config";
import { generateInviteLink } from "../helpers/generate-invite-link";

export async function handleStartCmd(ctx: Context) {
  await ctx.reply(WELCOME_MESSAGE_ENG);
}

export async function handleRegisterCmd(ctx: Context) {
  await registerUser(ctx.from?.id!, CHANNEL_ID);
  await ctx.reply(MESSAGE_AFTER_REGISTERED_ENG);
}

export async function handlePayCmd(ctx: Context) {
  await recordPayment(ctx.from!.id);
  await ctx.reply(MESSAGE_AFTER_PAYMENT_RECEIVED_ENG);

  try {
    const inviteLink = await generateInviteLink(CHANNEL_ID);
    await ctx.reply(
      `Here's your invite link to join the channel: ${inviteLink}\nThis link will expire in 5 minutes.`
    );

    // Optionally, you can still try to add the user directly
    const chatMember = await ctx.api.getChatMember(CHANNEL_ID, ctx.from!.id);
    if (chatMember.status === "left") {
      await ctx.api.approveChatJoinRequest(CHANNEL_ID, ctx.from!.id);
      await ctx.reply(PERMISSION_ACCEPTED_MESSAGE_ENG);
    }
  } catch (error) {
    console.error("Error processing payment or generating invite:", error);
    await ctx.reply(ERROR_PROCESSING_PAYMENT_MESSAGE_ENG);
  }
}

export async function handleGetChannelIdCmd(ctx: Context) {
  if (ctx.chat?.type === "channel") {
    await ctx.reply(`The ID of this channel is: ${ctx.chat.id}`);
  } else {
    await ctx.reply("This command only works in channels");
  }
}
