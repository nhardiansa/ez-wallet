import {useRouter} from 'next/router'
import Dashboard from '../pages/dashboard';
import Login from "../pages/login";

const AuthWrapper = (WrappedComponent, restricted = false) => {
  const Auth = (props) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const token = localStorage.getItem("token");
      
      if (!token) {
        router.replace("/login");
        return <Login />;
      }

      if (restricted && !token) {
        router.replace("/login");
        return <Login />;
      }

      if (restricted && token) {
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
