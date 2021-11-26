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

export function getInterview(state, interview){
  if(interview){

    return ({
      "student": interview.student,
      "interviewer":{
        "id":interview.interviewer,
        "name": state.interviewer[interview.interviewer].name,
        "avatar": state.interviewer[interview.interviewer].avatar
      }
    })
  }
  return null;
}