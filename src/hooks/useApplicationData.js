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
      const days=spotsRemaining(appointments);
      setState({...state, 
        appointments,
        days})
     
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
      const days=spotsRemaining(appointments);
      setState({...state, 
        appointments,
        days
      })
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
    const newDays = [...state.days];
    let spots = 0;

    const index=state.days.findIndex(day=>day.name === state.day)
    const dayObj=state.days.find(day=>day.name ===state.day);
    for(let appointmentid of dayObj.appointments){
      if(!appointments[appointmentid].interview){
        spots++;
      }
    }
    const newDay={...dayObj, spots}
    newDays[index] = newDay;
    return newDays
  }


  return {setDay, state, cancelInterview, bookInterview}
}
export default useApplicationData;

