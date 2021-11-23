import { createContext, useContext, useState } from "react";
import cookie from 'react-cookies';

const AddContext = createContext();

export function useLocalContext() {
  return useContext(AddContext);
}

export function ContextProvider({ children }) {
  const [createClassDialog, setCreateClassDialog] = useState(false);
  const [joinClassDialog, setJoinClassDialog] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [check, setChecked] = useState(false);
  const [dataInfo, setDataInfo] = useState(cookie.load('user_data'));
  const [dataClassCreate, setDataClassCreate] = useState([]);
  const [dataClassJoined, setDataClassJoined] = useState([]);
  const [classDetail, setClassDetail]=useState(cookie.load('class_data'));
  const [checkTeacher, setCheckTeacher]=useState(cookie.load('check_teacher'));

  const value = {
    createClassDialog, setCreateClassDialog,
    joinClassDialog, setJoinClassDialog,
    showForm, setShowForm,
    check, setChecked,
    dataInfo, setDataInfo,
    dataClassCreate, setDataClassCreate,
    dataClassJoined, setDataClassJoined,
    classDetail, setClassDetail,
    checkTeacher, setCheckTeacher
  };
  return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
}

