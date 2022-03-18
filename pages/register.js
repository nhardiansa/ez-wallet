import Login from './login';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo } from '../redux/actions/authAction';

export default function Register () {
  const router = useRouter();
  const dispatch = useDispatch();
  const { authReducer } = useSelector(state => state);

  const registerInputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(setAuthInfo({
      [name]: value
    }));
  };

  const sendRegisterInfo = (e) => {
    e.preventDefault();
    alert('register');
    router.push('/login');
  };
  return (
    <>
      <Login changeHandler={registerInputHandler} values={authReducer} submitHandler={sendRegisterInfo} />
    </>
  );
}
