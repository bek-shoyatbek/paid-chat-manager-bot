/** @format */

import mongoose from "mongoose";
import { addMinutes, addMonths } from "date-fns";
import User, { IUser } from "./models/User";
import { MONGODB_URI } from "./config";

export async function connectToDatabase(): Promise<void> {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
}

export async function registerUser(
  telegramId: number,
  channelId: string
): Promise<void> {
  await User.findOneAndUpdate(
    { telegramId },
    { telegramId, channelId },
    { upsert: true }
  );
}

export async function recordPayment(telegramId: number): Promise<void> {
  const now = new Date();
  const expirationDate = addMinutes(now, 5); // 5 minutes
  await User.findOneAndUpdate(
    { telegramId },
    { paymentDate: now, expirationDate }
  );
}

export async function checkSubscription(telegramId: number): Promise<boolean> {
  const user = await User.findOne({ telegramId });
  if (user && user.expirationDate) {
    return user.expirationDate > new Date();
  }
  return false;
}

export async function getExpiringSubscriptions(): Promise<IUser[]> {
  //   const threeDaysFromNow = addMonths(new Date(), 1);
  const twoMinutesFromNow = addMinutes(new Date(), 2);
  return User.find({
    expirationDate: { $lt: twoMinutesFromNow, $gt: new Date() },
  });
}

export async function getExpiredSubscriptions(): Promise<IUser[]> {
  return User.find({
    expirationDate: { $lt: new Date() },
  });
}
