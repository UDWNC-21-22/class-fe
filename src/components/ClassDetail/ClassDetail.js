import React,{useState,useEffect} from 'react';
import { useLocalContext } from "../../context/context";
import "./style.css";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export default function ClassDetail() {
  const {classDetail} = useLocalContext();
  const { dataInfo } = useLocalContext();

  const [code,setCode]=useState();
  
  useEffect(() => {
  const _code= classDetail.owner.map((item)=>{
    let temp;
    if (item.id===dataInfo.id) {temp=classDetail.code}
    if (temp){
      return(
        <Item>
        <p>CODE:
          {
            (temp) 
            ? <h3>{temp}</h3>
            :null
          }
          </p>
        </Item>
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