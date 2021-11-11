import { Button, DialogActions, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useLocalContext } from "../../context/context";
import classApi from '../../apis/class.api';
import cookie from 'react-cookies';
import authApi from '../../apis/auth.api';

const Form = () => {
  const { setShowForm } = useLocalContext();
  const { check, setChecked } = useLocalContext();
  const { dataInfo, setDataInfo } = useLocalContext();

  const [name, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [ownerId,setOwnerID]= useState("");

  const { setCreateClassDialog } = useLocalContext();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      let response = await authApi.getInfo()
      console.log("response: ", response)

      // set response.data to global state user
      setDataInfo(response.data);
      setOwnerID(dataInfo.id);
      console.log("ownerId: ", ownerId);
    }
    catch (err) {
        console.log("ERROR login, err: ", err)
    }

    try {
        e.preventDefault()

        let response = await classApi.createClass({ name, description, ownerId })
        console.log("response: ", response)
    }
    catch (err) {
        console.log("ERROR login, err: ", err)
    }
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
          value={name}
          onChange={(e) => setClassName(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Description"
          className="form__input"
          variant="filled"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <DialogActions>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="primary" disabled={!name} onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </div>
  );
};

export default Form;
