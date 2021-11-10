import Signup from "./components/authentication/registerForm";
import Login from "./components/authentication/loginForm";
import Home from "./components/Home/Home";
import { useRoutes } from 'react-router-dom';

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
    }
  ])
  return element
}

export default App;
