import { useState } from "react";
import AiAvtart from "../../../assets/AIinterview/ai-avatar.png";
import UserAvtar from "../../../assets/AIinterview/user-avatar.png";
import Footer from "../../common/Footer";
import CompanyLogo from "../../../assets/AIinterview/Company/Volkswagen.png";
import TechLogo from "../../../assets/AIinterview/react.svg";
import { TypeAnimation } from 'react-type-animation'
import {vapi} from "../../../utils/vapi.sdk";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {CALL_STATUS} from "../../../utils/constants";
import {interviewer} from "../../../utils/constants";

const Agent = ({type, questions, interviewDetails}) => {

//    console.log("questions are : ", questions);
 //   console.log("interview details are : ", interviewDetails);
    const nevigate = useNavigate();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [messages, setMessages] = useState([""]);
    const [lastMessage, setLastMessage] = useState("");
    const [callStatus, setCallStatus] = useState("INACTIVE");
    const { user } = useSelector((state) => state.profile)

    useEffect(() => {
      
    const onCallStart = () => {
    console.log("call started");
      setCallStatus(CALL_STATUS.ACTIVE);
    };

    const onCallEnd = () => {
      console.log("call ended");
      setCallStatus(CALL_STATUS.FINISHED);
    };

    const onMessage = (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
      //console.log("message: ", messages);
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };
    const onError = (error) => {
      console.log("Error:", error);
    };

    let conversationTranscript = "";
    vapi.on("transcription", (data) => {
    if (data.speaker === "user" || data.speaker === "assistant") {
        const speaker = data.speaker === "user" ? "User" : "AI";
        conversationTranscript += `${speaker}: ${data.transcript}\n`;
            }
        });
    console.log("conversationTranscript", conversationTranscript);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, [callStatus, setCallStatus, setMessages, setIsSpeaking, messages]);

   //second useEffect
    useEffect(() => {    

    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
      console.log("last message", lastMessage);
    }

    if (callStatus === CALL_STATUS.FINISHED) {
      if (type === "generate") {
        nevigate("/");
      } else {
        console.log("Update interview Details");
      }
    }
      }, [messages, callStatus, nevigate, type,lastMessage]);
    
    
    const handleCall = async () => {
      setCallStatus(CALL_STATUS.CONNECTING);

      if (type === "generate") {
        await vapi.start(process.env.REACT_APP_PUBLIC_VAPI_WORKFLOW_ID, {
          variableValues: {
            username: user.firstName,
            userId: user._id,
          },
          clientMessages: [],
          serverMessages: []
        });
      } else {
        let formattedQuestions = "";
        if (questions) {
            const parsedQues = JSON.parse(questions);
          formattedQuestions = parsedQues.join("\n");
        }

        await vapi.start(interviewer, {
          variableValues: {
            questions: formattedQuestions,
          },
          clientMessages: [],
          serverMessages: []
        });
      }
    };

    const handleDisconnect = () => {
    setCallStatus(CALL_STATUS.FINISHED);
    vapi.stop();
    };


    return (
    <div className="w-full flex flex-col gap-10 justify-center py-10">
      {type === "generate" ?(
        <div className=" mx-auto w-10/12 text-white">
          <h2 className="text-3xl font-bold w-full text-center">
            Generating Interview
          </h2>
        </div>
      ):(
        <div className="flex flex-row justify-between items-center text-white w-10/12 mx-auto">
        <div className="flex items-center flex-row gap-1">
          <img alt="Company-logo" src={CompanyLogo} height={100} width={100}/>
          <h2 className="text-3xl font-bold -mx-2">
            React Devloper Interview
          </h2>
          <img alt="Tech-logo" src={TechLogo} width={35} className="bg-richblack-700 rounded-full p-2 mx-4"/>
        </div>
        <h3 className="text-2xl bg-richblack-700 rounded-full w-[150px] p-2 h-100 font-semibold text-richblack-200 text-center">
          Technical
        </h3>
      </div>
      )}
      <div className="flex text-white mx-auto sm:flex-row flex-col gap-10 items-center justify-between w-10/12">
        {/* AI Interviewer Card */}
        <div className="flex mx-auto border-richblack-500 bg-gradient-to-b from-richblack-700 to-richblack-800 flex-col item-center justify-center gap-2 p-7 h-[400px] w-[400px] border-2 sm:basis-1/2 rounded-lg">
          <div className=" flex mx-auto items-center bg-richblack-50 justify-center w-[100px] h-[100px] rounded-full size-[120px] relative">
            <img
              src={AiAvtart}
              alt="profile"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="absolute inline-flex w-20 h-20 animate-ping rounded-full bg-richblack-5 opacity-70"/>}
          </div>
          <h3 className="text-center mt-5 font-semibold text-2xl">AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="flex mx-auto border-richblack-500 bg-gradient-to-b from-richblack-700 to-richblack-800 flex-col item-center justify-center gap-2 p-7 h-[400px] border-2 sm:basis-1/2 w-full rounded-lg">
          <div className="flex flex-col gap-2 justify-center items-center p-7 dark-gradient rounded-2xl min-h-full">
            <img
              src={UserAvtar}
              alt="profile"
              width={95}
              height={85}
              className="rounded-full object-cover size-[120px]"
            />
            <h3 className="text-center font-semibold text-2xl mt-5">{user.firstName} {user.lastName}</h3>
          </div>
        </div>
      </div>
      {/* Displaying messages by interviewer and user */}
      {messages.length > 0 && (
        <div className= {`${callStatus === CALL_STATUS.ACTIVE ? "text-richblack-200 text-center w-10/12 mx-auto" : "hidden"}`}>
           
                  <p className="text-lg font-semibold"
                  key={lastMessage}>
                      <TypeAnimation
                        sequence={[lastMessage, 500, ""]}
                        repeat={false}
                        cursor={true}
                        style = {
                            {
                                whiteSpace: "pre-line",
                                display:"block",
                            }
                          }
                        omitDeletionAnimation={true}
                      />
                  </p>              
        </div>
      )}
      {/* {call Button} */}
        {
          callStatus !== CALL_STATUS.ACTIVE ? (
          <button type="button" onClick={() => handleCall()} class={` text-white h-20 w-40 mx-auto bg-green focus:outline-none font-medium rounded-full text-3xl px-5 py-2.5 text-center me-2 mb-2`}>
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                    ? "Call"
                    : ". . ."}
          </button>
          ):(
            <button type="button" onClick={() => handleDisconnect()} class="text-white h-20 w-40 mx-auto bg-red focus:outline-none font-medium rounded-full text-3xl px-5 py-2.5 text-center me-2 mb-2">
          End
        </button>
          )
        }
      <Footer/>
    </div>  
  )
}

export default Agent;