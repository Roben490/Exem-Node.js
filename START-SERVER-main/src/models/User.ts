import mongoose, { Schema } from "mongoose";
import validator from 'validator';


export interface IUser extends Document {
        username: string;
        password: string
        organization: string;
        place?: string;
}

const enum Place {
    North = "North",
    South = "South"
}

const UserSchema: Schema = new Schema<IUser> ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: false
    }
})

export default mongoose.model<IUser>("User", UserSchema)