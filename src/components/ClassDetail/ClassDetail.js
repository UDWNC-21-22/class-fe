import React, { useState, useEffect } from 'react';
import { useLocalContext } from "../../context/context";
import "./style.css";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Button, Box, FormControl, InputLabel, NativeSelect, Grid, TextField} from '@material-ui/core'
import cookie from 'react-cookies';
import { useNavigate } from 'react-router-dom'
import classApi from '../../apis/class.api';
import Notification from '../Notifications/Notification';
import severity from "../Notifications/severity";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '10rem',
}));

export default function ClassDetail() {
  const navigate = useNavigate()
  const { classDetail } = useLocalContext();
  const { dataInfo } = useLocalContext();
  const [code, setCode] = useState();
  const { checkTeacher, setCheckTeacher } = useLocalContext();
  const [emailInvite, setEmailInvite] = useState();
  const [role, setRole] = useState('member');
  const [showForm, setShowForm] = useState(false);
  const [Notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  const handleClick = () => {
    navigate("/memberlist")
  }  

  useEffect(() => {
    const _code = classDetail.owner.map((item) => {
      let temp;
      if (item.id === dataInfo.id) {
        temp = classDetail.code
      }
      if (temp) {
        setCheckTeacher(true)
        cookie.save('check_teacher', true)

        return (
          <div className="footer">
            <Item>
              <p>CODE:
                {
                  (temp)
                    ? <h3>{temp}</h3>
                    : null
                }
              </p>
            </Item>
            <Button variant="outlined" onClick={() => setShowForm(true)}>INVITE MEMBER</Button>
            <Button variant="outlined" onClick={handleClick}>MEMBER LIST</Button>
          </div>
        )
      }
      setCheckTeacher(false)
      cookie.save('check_teacher', false)
      return <Button variant="outlined" onClick={handleClick}>MEMBER LIST</Button>
    });
    setCode(_code)
  }, []);

  const handleInvite = async () => {
    try {
      await classApi.inviteMember({ email: emailInvite, classId: classDetail.id, role: role })
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

  let codeLink=(process.env.NODE_ENV === "production" 
            ? process.env.REACT_APP_PRODUCTION : process.env.REACT_APP_LOCAL)
            +"/confirm-invite-by-code/"+classDetail.code;

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
                  <h1>{classDetail.name}</h1>
                  <p>{classDetail.description}</p>
                </div>
              </div>
            </div>
          </div>
      </div>
          
          {!checkTeacher ? <></> :
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
        
        {console.log("classDetail.assignments data:",classDetail.assignments)}
        {!classDetail.assignments 
        ? <Button onClick={()=>{navigate("/assignment")}}>GO TO ASSIGNMENT</Button>
        : <Grid>
                {classDetail.assignments.map((item)=>(
                  <p>{item.name}</p>
                ))}
                <Button onClick={()=>{
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
            :<></>
        }

          <Notification
            Notify={Notify}
            setNotify={setNotify}
          />
    </Grid>
  );
}