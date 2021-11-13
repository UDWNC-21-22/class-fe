import { Avatar } from "@material-ui/core";
import { FolderOpen, PermContactCalendar } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useLocalContext } from "../../context/context";
import "./style.css";
const JoinedClasses = ({ classData }) => {
  const { dataInfo } = useLocalContext();
  /*
  const image="../../img/"+idOwner.substr(idOwner.length-1)+".jpg";
  console.log("link: ",image);
  */
  return (
    <li className="joined__list">
      <div className="joined__wrapper">
        <div className="joined__container">
          <div className="joined__imgWrapper">
          </div>
          <div className="joined__image" />
          <div className="joined__content">
            <Link className="joined__title" to={`/${classData.id}`}>
              <h2>{classData.name}</h2>
              <p>{classData.description}</p>
            </Link>
            <p className="joined__owner">
              {classData.ownerId!==dataInfo.id ? dataInfo.username :null}
            </p>
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
