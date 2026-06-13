import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    title: String,
    desc: String,
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: { updatedAt: false },
    versionKey: false,
  }
);

export const Note = model("Note", schema);
