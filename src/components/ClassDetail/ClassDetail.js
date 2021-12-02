import React, { useState, useEffect } from 'react';
import { useLocalContext } from "../../context/context";
import "./style.css";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Button, Box, FormControl, InputLabel, NativeSelect, Grid, TextField } from '@material-ui/core'
import cookie from 'react-cookies';
import { useNavigate } from 'react-router-dom'
import classApi from '../../apis/class.api';
import Notification from '../Notifications/Notification';
import severity from "../Notifications/severity";
import { useParams } from 'react-router';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '10rem',
}));

export default function ClassDetail() {
  const { classId } = useParams();
  const { dataInfo } = useLocalContext();
  const [emailInvite, setEmailInvite] = useState();
  const [role, setRole] = useState('member');
  const [showForm, setShowForm] = useState(false);
  const [Notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [classData, setClassData] = useState({});
  const [isTeacher, setIsTeacher] = useState(false);


  useEffect(async () => {
    try{
      const res = await classApi.getClassById({ id: classId });
      setClassData(res.data);

  const handleClick = () => {
    navigate("/memberlist")
  }


      for(let i = 0; i < res.data.ownerId.length; i++){
        if(res.data.ownerId[i] == dataInfo.id){
          setIsTeacher(true);
          break;
        }
      }
    }
    catch(e){

    }
  }, []);

  const handleInvite = async () => {
    try {
      await classApi.inviteMember({ email: emailInvite, classId: classData?.id, role: role })
      setNotify({
        isOpen: true,
        message: 'invite succeeded',
        type: severity.success
      })
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

  let codeID = (process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION : process.env.REACT_APP_LOCAL)
    + "/confirm-invite-by-code/" + classData?.code;

  const handleSubmit = async () => {
    navigator.clipboard.writeText(codeLink)

    setNotify({
      isOpen: true,
      message: 'copied',
      type: severity.success
    })
    setShowForm(false);
  }

  const handleCancel = () => {
    setShowForm(false);
  }

  return (
    <Grid className="cover">
      <div className="list">
        <div className="wrapper">
          <div className="container">
            <div className="image" />
            <div className="content">
              <div className="title">
               <h1>{classData?.name}</h1>
              <p>{classData?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {!isTeacher ? <></> :
        <Grid>
          <div>
            <form>
              <Box sx={{ maxWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Role
                  </InputLabel>
                  <NativeSelect
                    defaultValue={'member'}
                    onChange={e => { setRole(e.target.value) }}
                  >
                    <option value={'member'}>Student</option>
                    <option value={'owner'}>Teacher</option>
                  </NativeSelect>
                </FormControl>
              </Box>
              <TextField onChange={(e) => setEmailInvite(e.target.value)} label='Email' placeholder='Enter email' fullWidth required />
              <Button onClick={handleInvite}>Invite</Button>
            </form>
          </div>
        </Grid>
      }

      {!classDetail.assignments
        ? <Button onClick={() => { navigate("/assignment") }}>GO TO ASSIGNMENT</Button>
        : <Grid>
          {classDetail.assignments.map((item) => {
            return (
              <div>
                <p>{item.name} : {item.scoreRate}</p>
                
              </div>
            )
          }
          )}
          <Button onClick={() => {
            navigate("/assignment")
          }}>SHOW MORE ASSIGNMENT</Button>
        </Grid>
      }

      <div>{code}</div>
      {showForm ?
        <Grid>
          <h1>Invite member</h1>
          <div>
          </div>
          <div>
            <Button color="primary" onClick={handleSubmit}>
              Copy link
            </Button>

            <Button onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Grid>

        : <></>}


      <Notification
        Notify={Notify}
        setNotify={setNotify}
      />



    </Grid>

  );
}