import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";


const Appointment = function (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR DELETE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(()=> transition(ERROR_SAVE, true))
  };

  const remove = function (id) {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(()=> transition(ERROR_DELETE, true))
  }


  return (
    <article className="appointment" data-testid="appointment" >
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={()=> transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interview={props.interview}
          interviewers={props.interviewers}
          onSave={(name, interviewer) => save(name, interviewer)}
          onCancel={() => back()}
          

        />
      )}
      {mode === SAVING && (
        <Status
          message={'Saving'}
        />
      )}
      {mode === DELETING && (
        <Status
          message={'Deleting'}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={'Are you sure you would like to Delete!?!'}
          onConfirm={(id) => remove(id)}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={(name, interviewer) => save(name, interviewer)}
          onCancel={()=> back()}

        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"SAVE unsuccessful, try again."}
          onClose={()=> back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message={"DELETE unsuccessful, try again."}
          onClose={()=> back()}
        />
      )}
    </article>
  )
}

export default Appointment;