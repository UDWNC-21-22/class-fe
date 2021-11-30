import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';
import { Button, Grid, TextField, Typography, makeStyles, Paper } from '@material-ui/core'
import { useLocalContext } from "../../context/context";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'
import Notification from '../Notifications/Notification';
import severity from "../Notifications/severity";
import cookie from 'react-cookies';
import AxiosBasic from "../../services/api";
import { Update } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    width: '60%',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: '60%',
    height: '100px',
    margin: theme.spacing(4),
  },
  cardButton: {

  },
}))

const { v1: uuidv1 } = require('uuid');

function Assignment() {
  const navigate = useNavigate()
  const style = useStyles();
  const [name, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [scoreRate, setscoreRate] = useState("");
  const [index, setIndex] = useState("");
  const { classDetail, setClassDetail } = useLocalContext();
  const [characters, updateCharacters] = useState(classDetail.assignments);

  const [check, setChecked] = useState(false)
  const [nameButton, setNameButton] = useState("")

  const [Notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  function isNumeric(value) {
    return /^\d+$/.test(value);
  }

  const handleAdd = async (e) => {
    try {
      e.preventDefault()

      if (!isNumeric(scoreRate)) {
        setNotify({
          isOpen: true,
          message: 'Grade is a number value',
          type: severity.warning
        })
      }
      else {
        let items = Array.from(characters)
        items.push({ id: uuidv1(), name: name, description: description, scoreRate: scoreRate })

        if (nameButton === "UPDATE") {
          const reorderedItem = items.pop();
          console.log(reorderedItem)
          items.splice(index, 1, reorderedItem);
        }

        console.log(items)
        updateCharacters(items)
        setClassName("")
        setDescription("")
        setscoreRate("")
        setChecked(false)
      }
    }
    catch (err) {
      console.log("ERROR create assignment, err: ", err)
    }
  }

  console.log(items)
  updateCharacters(items)
  setClassName("")
  setDescription("")
  setscoreRate("")
  setChecked(false)
}

function handleOnDragEnd(result) {
  if (!result.destination) return;

  const items = Array.from(characters);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  updateCharacters(items);
}

const handleSave = async () => {
  let classID = classDetail.id
  let ass = Array.from(characters)

  const updateAssignment = async () => {
    return AxiosBasic({
      url: '/class/update-assignment',
      method: 'POST',
      data: {
        classId: classID,
        assignments: ass
      }
    })
  }

  try {
    let response = await updateAssignment()

    // set response.data to global state user
    console.log("response: ", response.message)
    setNotify({
      isOpen: true,
      message: 'update assignment succeeded',
      type: severity.success
    })

    //update class detail assignment
    // const updateClass = async () => {
    //   return AxiosBasic({
    //       url: '/class/me/'+classDetail.id,
    //       method: 'GET'
    //   })
    // }
    // try{
    //   let res=await updateClass()
    //   console.log("res DATA: ", res.data)
    //   setClassDetail([
    //     ...classDetail,
    //     res.data
    //   ])

    //   console.log("classDetail DATA: ", classDetail)

    // }
    // catch (err) {
    //   if (Object.keys(err).length > 0) {
    //     setNotify({
    //       isOpen: true,
    //       message: err?.message,
    //       type: severity.error
    //     })
    //   }
    //   else {
    //     alert('An error has occurred')
    //   }      
    // }
  }
  catch (err) {
    if (Object.keys(err).length > 0) {
      setNotify({
        isOpen: true,
        message: err?.message,
        type: severity.error
      })
    }
    else {
      // An error has occurred
      alert('An error has occurred')
    }
  }
}

return (
  <Grid className="App">
    <Button onClick={handleSave}>SAVE</Button>
    <Button onClick={() => {
      navigate("/classdetail")
    }}>RETURN TO CLASS</Button>
    <header className="App-header">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul className={style.cardContainer} {...provided.droppableProps} ref={provided.innerRef}>
              {characters.map(({ id, name, description, scoreRate }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Paper>
                          <Grid container className={style.card}>
                            <Grid item>
                              <Typography>{name}</Typography>
                              <p>
                                {description}
                              </p>
                              <p>
                                {scoreRate}
                              </p>
                            </Grid>
                            <Grid item className="li-button">
                              <Button startIcon={<Update />}
                                style={{ backgroundColor: '#00a152' }}
                                onClick={() => {
                                  setChecked(true)
                                  setNameButton("UPDATE")
                                  setClassName(name)
                                  setDescription(description)
                                  setscoreRate(scoreRate)
                                  setIndex(index)
                                }} />
                              <Button startIcon={<DeleteIcon />}
                                style={{ backgroundColor: '#ff1744' }}
                                onClick={() => {
                                  const items = Array.from(characters);
                                  items.splice(index, 1);
                                  updateCharacters(items);
                                }} />
                            </Grid>
                          </Grid>
                        </Paper>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </header>

    <header className="App-header">
      <Button onClick={() => {
        setChecked(true)
        setNameButton("ADD")
      }}>ADD ASSIGNMENT</Button>
      {check ?
        <Grid>
          <div>
            <TextField
              id="filled-basic"
              label="Assignment Name (required)"
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
            <TextField
              id="filled-basic"
              label="Grade"
              className="form__input"
              variant="filled"
              value={scoreRate}
              onChange={(e) => setscoreRate(e.target.value)}
            />
          </div>
          <Button onClick={handleAdd} color="primary" disabled={!name | !scoreRate}>
            {nameButton}
          </Button>
        </Grid>
        : <></>
      }
    </header>
    <Notification
      Notify={Notify}
      setNotify={setNotify}
    />
  </Grid>
);


export default Assignment;