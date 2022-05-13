import {useRouter} from 'next/router'
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
  const Auth = (props) => {
    if (typeof window !== "undefined") {
      console.log(typeof window);
      const router = useRouter();
      const logged = isLogin();
      
      if (!logged) {
        router.replace("/login");
        return <Login />;
      }
  
      return <WrappedComponent {...props} />;
    }
  }

  if (WrappedComponent.getInitialProps) {
    Auth.getInitialProps = WrappedComponent.getInitialProps;
  }

  return Auth;
}

export const HasLogged = (WrappedComponent) => {
  const Auth = (props) => {
    if (typeof window !== "undefined") {
      console.log(typeof window);
      const router = useRouter();
      const logged = isLogin();
      
      if (logged) {
        router.replace("/dashboard");
        return <Dashboard />;
      }
  
      return <WrappedComponent {...props} />;
    }
  }

  if (WrappedComponent.getInitialProps) {
    Auth.getInitialProps = WrappedComponent.getInitialProps;
  }

  return Auth;
}
