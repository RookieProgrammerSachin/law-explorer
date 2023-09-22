import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    name: String,
    userName: String,
    phone: String,
    age: Number,
    password: String
});

const UserModel = model('user', UserSchema);

export default UserModel;