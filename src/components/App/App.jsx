import { Routes, Route } from 'react-router-dom';
import HomePage from "../../pages/HomePage/HomePage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import Navigation from "../Navigation/Navigation";
import LoginForm from "../LoginForm/LoginForm";
import MainBCS from "../../pages/MainBCS/MainBCS"; // Импортируем компонент MainBCS
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../redux/auth/authActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/MainBCS" element={<MainBCS />} /> {/* Добавляем маршрут для MainBCS */}
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
