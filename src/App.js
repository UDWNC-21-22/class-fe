import React, { useState } from 'react'
import Logout from "./components/authentication/registerForm";
import Login from "./components/authentication/loginForm";
import Home from "./components/Home/Home";
import Profile from './components/Profile/Profile';
import GradesList from "./components/GradesList/GradesList";
import MemberList from "./components/MemberList/MemberList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClassDetail from "./components/ClassDetail/ClassDetail";
import { Header } from "./components";
import { useLocalContext } from './context/context'

function App() {
  const { dataInfo } = useLocalContext();

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' exact element={dataInfo?.access_token !== undefined ? <Home /> : <Login />} />
          <Route path='/register' exact element={<Logout />} />
          <Route path='/profile' exact element={<Profile />} />
          <Route path='/grade' exact element={<GradesList />} />
          <Route path='/memberlist' element={<MemberList />} /> 
          <Route path='/classdetail' element={<ClassDetail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
