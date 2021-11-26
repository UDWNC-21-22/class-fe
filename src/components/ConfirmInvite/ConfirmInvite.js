import React, { useEffect, useState } from "react";
import { JoinedClasses } from "..";
import { useLocalContext } from "../../context/context";
import classApi from '../../apis/class.api';
import { Button} from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'

const ConfirmInvite = () => {
    const [code, setCode] = useState();
    const navigate = useNavigate()

    const path = window.location.pathname.substring(1).split("/")
    const token=path[1]
    const {id} = useParams()

    const handleClick = () => {
        navigate("/")
      }

  useEffect(() => { 
    const fetchData = async () => {
      try {
        let response = await classApi.verifyMember({inviteToken: token})
        alert(response.message)        
      }
      catch (err) {
        console.log("ERROR verify, err: ", err)

        if (Object.keys(err).length > 0) {
            alert(err?.message)
        }
        else {
            // An error has occurred
            alert('An error has occurred')
        }      
    }
    };
    fetchData();
  }, []);

  return (
    <div>
        {console.log(id)}
        <Button onClick={handleClick}>HOME</Button>
    </div>
  );
}

export default ConfirmInvite;
