import mongoose, { Document, Schema } from "mongoose";

export interface IOrganizations extends Document {
  name: string,
  resources: [{
    name: string,
    amount: number
  }],
  budget: number,
}


const organizationSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  resources: { type: [{ name: String, amount: Number }] }, //????????????
  budget: { type: Number, required: true },
});

export default mongoose.model<IOrganizations>("Organizations", organizationSchema);