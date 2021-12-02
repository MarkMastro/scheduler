import axios from "axios"

function bookInterview(id, interview) {
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
      setState({...state, 
        appointments})
     
    })
}

function cancelInterview(id){

  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
    return axios.delete(`/api/appointments/${id}`).then(res => {
      setState({...state, 
        appointments})
    });
  };

  const setDay = day => setState({ ...state, day });

  const [state, setState]=useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: {}

  })

  export default {bookInterview, cancelInterview, setDay, state }