const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
{
    user:{
        type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
    },
    role:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    level:{
        type: String,
        required: true,
    },
    techstack:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    questions:{
        type: [String],
        required: true,
    },
    company:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Interview", interviewSchema);