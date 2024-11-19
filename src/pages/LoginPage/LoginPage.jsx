import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import LoginForm from "../../components/LoginForm/LoginForm";
import { loginSuccess } from '../../redux/auth/authActions';
import { useEffect } from 'react';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    // Перенаправление после успешной авторизации
    if (isAuthenticated) {
      navigate('/MainBCS');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    
    const user = {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
    };

    localStorage.setItem('user', JSON.stringify(user));
    dispatch(loginSuccess(user));
    navigate('/MainBCS');
  };

  const handleGoogleLoginError = () => {
    console.error('Google login failed');
    // Здесь можно добавить обработку ошибки, например показать уведомление
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '0 auto', 
      padding: '20px',
      textAlign: 'center' 
    }}>
      <h2>Войти в аккаунт</h2>
      
      {/* Стандартная форма входа */}
      <LoginForm />
      
      {/* Разделитель */}
      <div style={{ 
        margin: '20px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{ flex: 1, height: '1px', background: '#ccc' }} />
        <span>или</span>
        <div style={{ flex: 1, height: '1px', background: '#ccc' }} />
      </div>
      
      {/* Google авторизация */}
      <div style={{ marginTop: '20px' }}>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
          useOneTap
          theme="outline"
          size="large"
          text="continue_with"
          shape="rectangular"
        />
      </div>
    </div>
  );
};

export default LoginPage;
