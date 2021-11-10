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

  const value = {
    createClassDialog, setCreateClassDialog,
    joinClassDialog, setJoinClassDialog,
    showForm, setShowForm,
    check, setChecked
  };

  return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
}
