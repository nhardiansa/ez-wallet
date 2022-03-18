import { useRouter } from "next/router";

const AuthWrapper = (WrappedComponent) => {
  return (props) => {
    // console.log(window);
    if (typeof window !== 'undefined') {
      const router = useRouter();
      const token = localStorage.getItem("token");
  
      if (!token) {
        router.push("/login");
        return null;
      }
    }

    return <WrappedComponent {...props} />;
  }
}

export default AuthWrapper;
