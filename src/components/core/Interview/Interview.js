import {GenratedQuestions} from "../../../utils/GenratedQuestions";
import Agent from "./Agent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getInterviewDetails} from "../../../services/operations/InterviewDetailsAPI";
import { useSelector } from "react-redux";
const Interview = () => {
    const InterviewId = useParams();
    const [questions, setQuestions] = useState([]);
    const [interviewDetails, setInterviewDetails] = useState({});
    const {token} = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      const response = await getInterviewDetails(InterviewId.id, token);
      setInterviewDetails(response);
    }
    fetchInterviewDetails();
    const type= interviewDetails.type
    const role = interviewDetails.role
    const level =  interviewDetails.level
    const techstack = interviewDetails.techstack
    const amount = interviewDetails.amount

    const fetchQuestions = async () => {
      const result = await GenratedQuestions(type, role, level, techstack, amount); // make sure to await
      setQuestions(result);
    };

    fetchQuestions();
  }, []);

    return (
        <div>
            <Agent questions={questions}
                interviewDetails={interviewDetails} type = "Interview" />
        </div>
    );
};

export default Interview;