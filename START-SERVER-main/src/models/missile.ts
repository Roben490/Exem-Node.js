
import mongoose, { Document, Schema } from "mongoose";

export interface IMissile extends Document {
  name: string;
  description: string;
  speed: number,
  intercepts?: string[],
  price: number
}

const missileSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  speed: { type: Number, required: true },
  intercepts:{type: [String], required: false},
  price: { type: Number, required: true}
});

export default mongoose.model<IMissile>("Missiles", missileSchema);