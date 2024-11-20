import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "../../pages/HomePage/HomePage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import Navigation from "../Navigation/Navigation";
import LoginForm from "../LoginForm/LoginForm";
import MainBCS from "../../pages/MainBCS/MainBCS"; // Импортируем компонент MainBCS
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../redux/auth/authActions';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const token = localStorage.getItem('token');
  
  // Проверяем как состояние auth, так и наличие токена
  return (isAuthenticated || token) ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setAuth(true)); // action для установки авторизации
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route 
            path="/MainBCS" 
            element={
              <PrivateRoute>
                <MainBCS />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
