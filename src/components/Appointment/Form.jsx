import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = function (props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  const reset = function() {
    setStudent("");
    setInterviewer("")
    setError("")
  }
  const cancel = function() {
    reset();
    props.onCancel();
  }
  const validate = function(student, interviewer) {
    
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("")
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            data-testid="student-name-input"
            placeholder="Enter Student Name"

          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          value={interviewer}
          interviewers={props.interviewers}
          onChange={(interviewerId) => setInterviewer(interviewerId)}


        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>

  )

}

export default Form;