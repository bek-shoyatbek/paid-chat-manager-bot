/** @format */

import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  telegramId: number;
  paymentDate: Date;
  expirationDate: Date;
  channelId: string;
}

const UserSchema: Schema = new Schema({
  telegramId: { type: Number, required: true, unique: true },
  paymentDate: { type: Date },
  expirationDate: { type: Date },
  channelId: { type: String, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
