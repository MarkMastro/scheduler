import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import React, { useState } from 'react';

export default function Form(props){
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("")

  const reset=()=>{
    setStudent("");
    setError("");

    props.onCancel();
  }

  const validate=()=>{

    if(student === ""){
      setError("Student name cannot be blank");
      return;
    }
    setError("");

    props.onSave(student, interviewer)
  }
  return(

    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        data-testid="student-name-input"
        className="appointment__create-input text--semi-bold"
        name={props.student}
        type="text"
        placeholder="Enter Student Name"
        onChange={(event)=>setStudent(event.target.value)}
        value={student}
      />
    <section className="appointment__validation">{error}</section>

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