import Signup from "./components/authentication/registerForm";
import Login from "./components/authentication/loginForm";
import Home from "./components/Home/Home";
import Profile from './components/Profile/Profile';
import GradesList from "./components/GradesList/GradesList";
import { useRoutes } from 'react-router-dom';
import MemberList from "./components/MemberList/MemberList";

function App() {
  const element = useRoutes([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/register',
      element: <Signup />
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/people',
      element: <MemberList />
    },
    {
      path: '/profile',
      element: <Profile />
    },
    {
      path: '/grades',
      element: <GradesList />
    }
  ])
  return element
}

export default App;
