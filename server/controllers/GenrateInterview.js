const Interview = require("../models/Interview");
const User = require("../models/User");


exports.generateInterview = async (req, res) => {
    const { role, type, level, techstack, amount, userid} = req.body;

    try{
        const Deatils = ({
            user: userid,
            role: role,
            type: type,
            level: level,
            techstack: techstack,
            amount: amount,
        });

        const UserDetails = await User.findById(userid, {
                accountType: "Student",
              })
        if (!UserDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        
        const Interviewdeatils  = await Interview.create(Deatils);

        return res.status(200).json({
            success: true,
            message: "Interview Details genrated successfully",
            interview: Interviewdeatils,
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in Generate Interview",
        });
    }
}

exports.getInterviewDetails = async (req, res) => {
    const { Interviewid } = req.body;
    try {
        const interviewDetails = await Interview.findById(Interviewid);
        if (!interviewDetails) {
            return res.status(404).json({
                success: false,
                message: "Interview not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Interview Details fetched successfully",
            interview: interviewDetails,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in Get Interview Details",
        });
    }
}