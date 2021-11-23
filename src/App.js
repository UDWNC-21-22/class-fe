import React, { useState, useEffect } from 'react'
import Logout from "./components/authentication/registerForm";
import Login from "./components/authentication/loginForm";
import Home from "./components/Home/Home";
import Profile from './components/Profile/Profile';
import GradesList from "./components/GradesList/GradesList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClassDetail from "./components/ClassDetail/ClassDetail";
import { Header } from "./components";
import { useLocalContext } from './context/context';
import cookie from 'react-cookies';
import authApi from './apis/auth.api';
import AuthMiddleware from './middleware/auth.middleware';

function App() {
  const { dataInfo, authLogin, setDataInfo, setAuthLogin } = useLocalContext();

  const [loadingAuth, setloadingAuth] = useState(true)

  // auto check access_token
  useEffect(async () => {
    let access_token = cookie.load('access_token')
    if (!!access_token) {
      try {
        setloadingAuth(true)
        let response = await authApi.authenticate()

        setDataInfo(response.data);
        setAuthLogin(true)

        // set access_token to cookie
        cookie.save('access_token', response.data?.access_token);
        cookie.save('user_data', response.data);

      }
      catch (err) {
        console.log(err)
        setAuthLogin(false)
      }
    }
    setloadingAuth(false)

  }, [])


  return (
    <>
      {
        !loadingAuth ? (
          <Router>
            <Header />
            <Routes>
              <Route path='/login' exact element={<Login />} />
              <Route path='/register' exact element={<Logout />} />
              {/* <Route path='/home' exact element={<Home />} /> */}
            </Routes>
            <AuthMiddleware>
              <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/profile' exact element={<Profile />} />
                <Route path='/grade' exact element={<GradesList />} />
                {/* <Route path='/memberlist' element={<MemberList />} /> */}
                <Route path='/classdetail' element={<ClassDetail />} />
              </Routes>
            </AuthMiddleware>

          </Router>
        ) : (<h3>Loading....</h3>)
      }
    </>
  )
}

export default App;
