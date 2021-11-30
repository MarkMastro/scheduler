const matchIds = (appointments, ids) => {
  const matched = ids.map(id => appointments[id]);
  return matched;
}

//Go through a state array with a days object and an appointments object
//Match the appointments given in the days object to those in the appointments object
export function getAppointmentsForDay(state, day) {
  let appointmentArr = [];
  // eslint-disable-next-line
  state.days.map(dayObject => {
    if (dayObject.name === day) {
      dayObject.appointments.forEach(apptId => appointmentArr.push(apptId))
    }
  })
  return matchIds(state.appointments, appointmentArr);
}


export function  getInterviewersForDay(state, day) {

  let interviewersArr = [];
  // eslint-disable-next-line
  state.days.map(dayObject => {
    if (dayObject.name === day) {
      dayObject.interviewers.forEach(interviewerId => interviewersArr.push(interviewerId))
    }
  })
  return matchIds(state.interviewer, interviewersArr);
}

export function getInterview(state, interview){
  if(interview ){
    const result = ({
      "student": interview.student,
      interviewer:state.interviewer[interview.interviewer]
      // "interviewer":{
      //   "id":interview.interviewer,
      //   "name": state.interviewer[interview.interviewer].name,
      //   "avatar": state.interviewer[interview.interviewer].avatar
      // }
    })
    return result
  }
  return null;
}

// export function getAppointmentsForDay(state, day) {
//   const { days, appointments } = state;

//   const dayObj = days.find((d) => d.name.toLowerCase() === day.toLowerCase());

//   if (state.days.length === 0 || dayObj === undefined) return [];

//   return dayObj.appointments.map((id) => appointments[id]);
// }


// export function getInterviewersForDay(state, day) {
//   const { days, interviewer } = state;

//   const dayObj = days.find((d) => d.name.toLowerCase() === day.toLowerCase());

//   if (state.days.length === 0 || dayObj === undefined) return [];

//   return dayObj.interviewers.map((id) => interviewer[id]);
// }

// export function getInterview(state, appointmentInterview) {
//   // returns null if no interview is booked
//   if (!appointmentInterview) return null;

//   const { student: studentName, interviewer: interviewerId } =
//     appointmentInterview;
//   return {
//     student: studentName,
//     interviewer: state.interviewer[interviewerId],
//   };
// }