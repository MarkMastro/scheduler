import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import React, { useState } from 'react';

export default function Form(props){
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset=()=>{
    setStudent("");
    props.onCancel();
  }

  const validate=()=>{
    props.save(student, interviewer)
  }
  console.log("interviewer", interviewer)
  return(

    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name={props.student}
        type="text"
        placeholder="Enter Student Name"
        onChange={(event)=>setStudent(event.target.value)}
        value={student}
      />
    </form>
    <InterviewerList 
    interviewers={props.interviewers}
    onChange={setInterviewer}
    interviewer={interviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={reset}>Cancel</Button>
      <Button confirm onSubmit={event => event.preventDefault()} onClick={validate}>Save</Button>
    </section>
  </section>
</main>

  )
}