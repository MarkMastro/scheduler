import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"



export default function Appointment(props){
  

  const  save=(name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(()=>transition(SHOW))
    .catch(()=>transition(ERROR_SAVE, true))
  }

  const destroy=()=>{
    transition(SAVING, true)
    props
    .cancelInterview(props.id)
    .then(()=>transition(EMPTY))
    .catch(()=>transition(ERROR_DELETE, true))
  }

  const confirm =()=>{
    transition(CONFIRM)
  }

  const cancel=()=>{
    transition(SHOW)
  }

  const edit=()=>{
    transition(EDIT)
  }

 const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

 return(
    <article className="appointment">

      <Header time={props.time}/>
       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
       {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
        />
       )}
       {mode === CREATE && <Form interviewers = {props.interviewers} save={save} onCancel = {back}/>}
       {mode === EDIT && <Form  
        student = {props.interview.student}
        interviewer = {props.interview.interviewer.id} 
        interviewers = {props.interviewers} 
        save = {save} 
        onCancel = {back} 
       />}
        {mode === SAVING && <Status />}
        {mode === CONFIRM && <Confirm onCancel={cancel} onDelete={destroy}/>}
        {mode === ERROR_SAVE && <Error message={"error"} onClose={back}/>}
        {mode === ERROR_DELETE && <Error message={"error"} onClose={back  }/>}

    </article>

  )
} 