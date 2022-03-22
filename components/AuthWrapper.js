import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';
import Dashboard from '../pages/dashboard';
import Login from "../pages/login";

const isLogin = () => {
  const token = localStorage.getItem('token');
  
  if (token) {
    return true;
  }

  return false;
}

export const MustLogin = (WrappedComponent) => {
  const AuthenticatedComponent  = () => {
    const router = useRouter();
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
      const loginStatus = isLogin();

      if (!loginStatus) {
        router.replace('/login');
      } else {
        setIsLogged(loginStatus);
      }
    }, []);

    return isLogged ? <WrappedComponent /> : <Login />;
  }
  return AuthenticatedComponent;
}
