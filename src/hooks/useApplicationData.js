import axios from "axios"
import {useState, useEffect} from "react";

const useApplicationData=()=>{

const bookInterview=(id, interview)=>{
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(()=>{
      spotsRemaining(appointments);
      setState({...state, 
        appointments})
     
    })
  
}

 const cancelInterview=(id)=>{

  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
    return axios.delete(`/api/appointments/${id}`)
    .then(res => {
      spotsRemaining(appointments);
      setState({...state, 
        appointments})
    })
    .then(res=>{
    })
  };

  const setDay = day => setState({ ...state, day });

  const [state, setState]=useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: {}

  })
  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all)=>{
      setState(prev=>({...prev, days: all[0].data, appointments: all[1].data, interviewer: all[2].data}))
    })

  }, []);

  const spotsRemaining=(appointments)=>{
    let spots=0;
    for(let day of state.days){
      if(day.name===state.day){
        for(let appointment of day.appointments){
          if(!appointments[appointment].interview){
            spots++;
            day.spots=spots;
          }
        }
      }
    }
    console.log(state.day)
  }


  return {setDay, state, cancelInterview, bookInterview}
}
export default useApplicationData;

