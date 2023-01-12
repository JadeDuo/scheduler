import React from "react";
import DayListItem from "./DayListItem";

const DayList = function(props) {
  const fullList = props.days.map((day)=> {
    
    return <DayListItem 
    name={day.name}
    spots={day.spots}
    selected={props.value === day.name}
    setDay={props.onChange}
    key={day.id} />
  })

  return (
    <ul>
      {fullList}
    </ul>
  )
};

export default DayList;