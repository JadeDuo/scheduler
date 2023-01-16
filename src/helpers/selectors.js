

export function getAppointmentsForDay(state, day) {
  let results = [];
  let dayArr = [];
  for (const curDay of state.days) {
    if (day === curDay.name) {
      dayArr = curDay.appointments
    }
  }

  for (const dayApt of dayArr) {
    for (const key of Object.keys(state.appointments)) {
      if (parseInt(key) === dayApt) {
        results.push(state.appointments[key])
      }
    }
  }
  return results;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  const interviewerID = interview.interviewer;
  for (let ID in state.interviewers) {
    if (interviewerID === parseInt(ID)) {
      let result = { ...interview }
      result.interviewer = state.interviewers[ID];
      return result;
    }
  }
}


