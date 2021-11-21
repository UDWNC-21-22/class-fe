import { createContext, useContext, useState } from "react";

const AddContext = createContext();

export function useLocalContext() {
  return useContext(AddContext);
}

export function ContextProvider({ children }) {
  const [createClassDialog, setCreateClassDialog] = useState(false);
  const [joinClassDialog, setJoinClassDialog] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [check, setChecked] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const [dataClassCreate, setDataClassCreate] = useState([]);
  const [dataClassJoined, setDataClassJoined] = useState([]);
  const [classDetail, setClassDetail]=useState();

  const setContext = (data) => {
    setDataInfo(data);
  }


  const value = {
    createClassDialog, setCreateClassDialog,
    joinClassDialog, setJoinClassDialog,
    showForm, setShowForm,
    check, setChecked,
    dataInfo, setDataInfo,
    dataClassCreate, setDataClassCreate,
    dataClassJoined, setDataClassJoined,
    classDetail, setClassDetail,
    setContext,
  };
  return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
}

