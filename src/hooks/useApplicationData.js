
import { useState, useEffect } from "react";
import axios from "axios";


const useApplicationData = function () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = [
      ...state.days,
    ]

    return axios.put(`/api/appointments/${id}`, appointments[id])
      .then(() => {
        const dayID = getDayIDFromAppID(id)
        
        for (const day of days) {
          if (day.id === dayID) {
            
            day.spots = spotsRemaining(day, appointments)
            
          }
        }

        setState({
          ...state,
          appointments
        })
      })


  }

  const cancelInterview = function (id) {


    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        }
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const days = [
          ...state.days,
        ]
        const dayID = getDayIDFromAppID(id)
        
        for (const day of days) {
          if (day.id === dayID) {
            day.spots = spotsRemaining(day, appointments)
          }
        }

        setState({
          ...state,
          appointments,
          days
        })
      })
  };

  const setDay = day => setState({ ...state, day });

  const getDayIDFromAppID = function (appId) {

    for (const day of state.days) {
      for (const app of day.appointments) {
        if (app.toString() === appId.toString()) {
          return day.id;
        }
      }
    }
  }

  const spotsRemaining = function (day, appointments) {
    let spots = 0;

    for (const app of day.appointments) {
      if (!appointments[app.toString()].interview) {
        spots += 1;
      }
    }
    return spots;
  }



  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    });

  }, [])

  return { state, setDay, bookInterview, cancelInterview }
}

export default useApplicationData;