import mongoose from "mongoose";

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'Contact'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})


const groupModel = mongoose.model("Group", groupSchema);

export default groupModel;