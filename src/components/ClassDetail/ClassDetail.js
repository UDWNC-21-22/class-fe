import React,{useState,useEffect} from 'react';
import { useLocalContext } from "../../context/context";
import "./style.css";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Button } from '@material-ui/core'

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

  const handleClick= () => {

  }

  useEffect(() => {
  const _code= classDetail.owner.map((item)=>{
    let temp;
    if (item.id===dataInfo.id) {temp=classDetail.code}
    if (temp){
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
          <Button variant="outlined" onClick={handleClick}>INVITE</Button>
        </div>
      )
    }
    return <></>
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