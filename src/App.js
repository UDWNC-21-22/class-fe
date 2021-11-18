import Signup from "./components/authentication/registerForm";
import Login from "./components/authentication/loginForm";
import Home from "./components/Home/Home";
import Profile from './components/Profile/Profile';
import GradesList from "./components/GradesList/GradesList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MemberList from "./components/MemberList/MemberList";
import { Header } from "./components";
import SwipeableTemporaryDrawer from "./components/ClassDetail/ClassDetail"
import {useLocalContext} from './context/context'

function App() {
  // const element = useRoutes([
  //   {
  //     path: '/',
  //     element: <Login />
  //   },
  //   {
  //     path: '/register',
  //     element: <Signup />
  //   },
  //   {
  //     path: '/home',
  //     element: <Home />
  //   },
  //   {
  //     path: '/people',
  //     element: <MemberList />
  //   },
  //   {
  //     path: '/profile',
  //     element: <Profile />
  //   },
  //   {
  //     path: '/grades',
  //     element: <GradesList />
  //   }
  // ])
  // return element
  const{dataInfo}=useLocalContext();

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' exact element={<Login />} />
          <Route path='/register' exact element={<Signup />} />
          <Route path='/home' exact element={<Home />} />
          <Route path='/profile' exact element={<Profile />} />
          <Route path='/grade' exact element={<GradesList />} />
          <Route path="`/${dataInfo.username}`" element={<SwipeableTemporaryDrawer />} />
          <Route path='/memberlist' element={<MemberList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
