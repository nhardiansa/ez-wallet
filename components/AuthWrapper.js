import {useRouter} from 'next/router'
import Dashboard from '../pages/dashboard';
import Login from "../pages/login";

const AuthWrapper = (WrappedComponent) => {

  const isLogin = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      return true;
    }

    return false;
  }

  const Auth = (props) => {
    if (typeof window !== "undefined") {
      console.log('AuthWrapper');
      const router = useRouter();
      const logged = isLogin();
      
      if (!logged) {
        router.replace("/login");
        return <Login />;
      }

      if (logged) {
        router.replace("/dashboard");
        return <Dashboard />;
      }
  
      return <WrappedComponent {...props} />;
    } else {
      return <WrappedComponent {...props} />;
    }
  }

  if (WrappedComponent.getInitialProps) {
    Auth.getInitialProps = WrappedComponent.getInitialProps;
  }

  return Auth;
}

export default AuthWrapper;
