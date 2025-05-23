import React from 'react'
import { useState } from 'react'
import InterviewCard from '../components/common/InterviewCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import IconBtn from '../components/common/IconBtn';
import robo from "../assets/AIinterview/robot.png";
import Footer from "../components/common/Footer";
const InterviewDash = () => {
    const user = useSelector((state) => state.auth.user);
    const [hasPastInterviews, sethasPastInterviews] = useState(false);
    const [hasUpcomingInterviews, sethasUpcomingInterviews] = useState(false);
    const [userInterviews, setUserInterviews] = useState([]);
    const [allInterview, setAllInterview] = useState([]);
    const [loading, setLoading] = useState(false);
  return (
    <div className="gap-10 flex flex-col">
      <div className='mx-auto mt-10 w-10/12 max-w-maxContent justify-center'>
      
      <div className='flex flex-row gap-4 rounded-3xl p-4 items-center justify-around bg-gradient-to-b from-richblack-800 to-richblack-900'>
        <div className="flex flex-col gap-4 max-w-lg text-white">
            <h2 className='font-bold text-3xl'>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
            <p className="text-lg">
              Practice real interview questions & get instant feedback
            </p>

            <div className='w-maxContent mt-2'>
              <IconBtn >
                <Link to="/GenerateInterview">Start an Interview</Link>
              </IconBtn>
            </div>
        </div>

        <img
          src={robo}
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </div> 

      <section className="flex flex-col gap-6 mt-8 w-full">
        <h2 className=' text-white font-bold text-3xl'>Your Interviews</h2>
        <div className="flex flex-row gap-4 flex-wrap w-full items-stretch">
        <InterviewCard
                key={1}
                userId={123}
                interviewId={123}
                role={"Software Engineer"}
                type={"Technical"}
                techstack={"React, Node.js"}
                createdAt={"2023-10-01T12:00:00Z"}
              />
              <InterviewCard
                key={1}
                userId={123}
                interviewId={123}
                role={"Software Engineer"}
                type={"Technical"}
                techstack={"React, Node.js"}
                createdAt={"2023-10-01T12:00:00Z"}
              />
          {/* {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )} */}
          <p>You haven&apos;t taken any interviews yet</p>
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8 w-full">
        <h2 className='text-white font-bold text-3xl'>Take Interviews</h2>

        <div className="flex flex-row gap-6 flex-wrap w-full items-stretch">
        <InterviewCard
                key={1}
                userId={123}
                interviewId={123}
                role={"Software Engineer"}
                type={"Technical"}
                techstack={"React, Node.js"}
                createdAt={"2023-10-01T12:00:00Z"}
              />
          {/* {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )} */}
          <InterviewCard
                key={1}
                userId={123}
                interviewId={123}
                role={"Software Engineer"}
                type={"Technical"}
                techstack={"React, Node.js"}
                createdAt={"2023-10-01T12:00:00Z"}
              />
        </div>
      </section>
      </div>
      <Footer />
    </div>
)
}

export default InterviewDash