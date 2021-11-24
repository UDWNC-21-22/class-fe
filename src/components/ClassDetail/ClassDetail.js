import React,{useState,useEffect} from 'react';
import { useLocalContext } from "../../context/context";
import "./style.css";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Button } from '@material-ui/core'
import cookie from 'react-cookies';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '10rem',
}));

export default function ClassDetail() {
  const {classDetail} = useLocalContext();
  const { dataInfo } = useLocalContext();
  const [code,setCode]=useState();
  const {setCheckTeacher} = useLocalContext();

  const handleClick= () => {
    window.open("/memberlist", "_self", "")
  }

  useEffect(() => {
  const _code= classDetail.owner.map((item)=>{
    let temp;
    if (item.id===dataInfo.id) {
      temp=classDetail.code
    }
    if (temp){
      setCheckTeacher(true)
      cookie.save('check_teacher', true)

      return(
        <div className="footer">
          <Item>
          <p>CODE:
            {
              (temp) 
              ? <h3>{temp}</h3>
              :null
            }
            </p>
          </Item>
          <Button variant="outlined" onClick={handleClick}>MEMBER LIST</Button>
        </div>
      )
    }
    setCheckTeacher(false)
    cookie.save('check_teacher', false)
    return <Button variant="outlined" onClick={handleClick}>MEMBER LIST</Button>
  });
  setCode(_code)
},[]);

                
  return (
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
      <div>{code}</div>
    </div>
  );
}