import { Button, DialogActions, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useLocalContext } from "../../context/context";
import axios from 'axios';

const Form = () => {
  const { showForm, setShowForm } = useLocalContext();
  const { check, setChecked } = useLocalContext();

  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [Room, setRoom] = useState("");
  const [Subject, setSubject] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const { createClassDialog, setCreateClassDialog } = useLocalContext();

  const handleSubmit = () => {
    setLoading(true);
    setIsError(false);
    const data = {
      className: className,
      section: section,
      room: Room,
      subject: Subject
    }
    axios.post('https://api-new-demo.herokuapp.com/api/classroom/', data).then(res => {
      setData(res.data);
      setClassName('');
      setSection('');
      setRoom('');
      setSubject('');
      setLoading(false);
      setCreateClassDialog(false);
      setShowForm(false);
      window.location.reload(false);
    }).catch(err => {
      setLoading(false);
      setIsError(true);
    });
  }

  const handleCancel = () => {
    setCreateClassDialog(false);
    setShowForm(false);
    setChecked(!check);
  };

  return (
    <div className="form">
      <p className="class__title">Create Class</p>

      <div className="form__inputs">
        <TextField
          id="filled-basic"
          label="Class Name (required)"
          className="form__input"
          variant="filled"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Section"
          className="form__input"
          variant="filled"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Room"
          className="form__input"
          variant="filled"
          value={Room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Subject"
          className="form__input"
          variant="filled"
          value={Subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <DialogActions>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="primary" disabled={!className} onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </div>
  );
};

export default Form;
