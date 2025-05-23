import { interviewEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import {toast} from "react-hot-toast";

const {GET_INTERVIEW_DETAILS_API} = interviewEndpoints;

export async function getInterviewDetails(token, interviewid){
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET",GET_INTERVIEW_DETAILS_API,interviewid,
        {
            Authorization: `Bearer ${token}`,
        } 
        );

        console.log("GET_INTERVIEW_DETAILS_API API RESPONSE............", response);
    
        if (!response.data.success) {
        throw new Error(response.data.message);
        }
        result = response.data.interview;
    } catch (error) {
        console.log("GET_INTERVIEW_DETAILS_API API ERROR............", error);
    }
    toast.dismiss(toastId);
    return result;
};

