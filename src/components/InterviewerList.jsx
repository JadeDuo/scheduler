import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

const InterviewerList = function(props) {
  const fullList = props.interviewers.map((interviewer)=> {
    
    return <InterviewerListItem 
    id={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={props.interviewer === interviewer.id}
    setInterviewer={props.setInterviewer}
    key={interviewer.id} />
  })

  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{fullList}</ul>
</section>
  )
};

export default InterviewerList;