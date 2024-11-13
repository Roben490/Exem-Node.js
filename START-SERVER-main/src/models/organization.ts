import mongoose, { Document, Schema } from "mongoose";

export interface IOrganizations extends Document {
  name: string,
  resources: resources[],
  budget: number,
}

export interface resources {
    name: string,
    amount: number
}

const organizationSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  resources: { type: { type: [Schema.Types.ObjectId] } }, //????????????
  budget: { type: Number, required: true },
});

export default mongoose.model<IOrganizations>("Organizations", organizationSchema);