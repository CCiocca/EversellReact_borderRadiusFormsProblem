import LoginForm from '../components/LoginForm';
import logo from '../assets/images/fulllogo_transparent.png';

function Login() {
  return (
    <div id='login'>
      <div className='auth-card'>
        <div className='dx-card content'>
          <div className='header'>
            <img src={logo} alt="logo" />
            <div className='title'>{('Log In')}</div>
            <div className='description'>{('Welcome on my app')}</div>
            </div>
            <div className="login-content">
              <LoginForm />
            </div>
        </div>
      </div>
    </div>
  );
}


export default Login