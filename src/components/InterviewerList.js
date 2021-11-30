import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"

export default function InterviewerList (props){

  const {interviewers, onChange, interviewer}=props;


  const interviewerArray=interviewers.map((interviewerArr)=>{
    return(
      <InterviewerListItem 
      key={interviewerArr.id}
      name={interviewerArr.name}
      avatar={interviewerArr.avatar}
      selected={interviewer===interviewerArr.id}
      setInterviewer={()=>onChange(interviewerArr.id)}
      />
    )
  })

  return(
    <section className="interviewers">

  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
  {interviewerArray}

  </ul>
</section>
  )
}