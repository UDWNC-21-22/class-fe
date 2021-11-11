import Signup from "./components/authentication/registerForm";
import Login from "./components/authentication/loginForm";
import Home from "./components/Home/Home";
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
    }
  ])
  return element
}

export default App;
