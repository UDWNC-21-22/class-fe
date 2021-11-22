import { Avatar } from "@material-ui/core";
import { FolderOpen, PermContactCalendar } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useLocalContext } from "../../context/context";
import "./style.css";
const JoinedClasses = ({ classData, key }) => {
  const { dataInfo } = useLocalContext();
  const {setClassDetail} = useLocalContext();

  return (
    <li key={key} className="joined__list">
      <div className="joined__wrapper">
        <div className="joined__container">
          <div className="joined__imgWrapper">
          </div>
          <div className="joined__image" />
          <div className="joined__content">
            <Link className="joined__title" to="/classdetail" onClick={()=>{
              setClassDetail(classData)
            }}>
              <h2>{classData.name}</h2>
              <p>{classData.description}</p>
            </Link>
            {classData.owner.map((item)=>(
              <p className="joined__owner">
                {item.id!==dataInfo.id ? item.username :null}
              </p>
            ))}
          </div>
        </div>
        <Avatar
          className="joined__avatar"
          src="../../img/photo.png"
        />
      </div>
      <div className="joined__bottom">
        <PermContactCalendar />
        <FolderOpen />
      </div>
    </li>
  );
};

export default JoinedClasses;
