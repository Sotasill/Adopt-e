import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { registerUser } from "../../redux/registration/registrationThunks";
import {
  selectIsLoading,
  selectError,
} from "../../redux/registration/registrationSelectors";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    // другие поля для регистрации
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData)); // Отправляем данные на сервер через thunk
  };

  const handleGoogleLoginSuccess = (response) => {
    const userObject = jwtDecode(response.credential);
    console.log('Google User:', userObject);
  };

  const handleGoogleLoginFailure = () => {
    console.error('Google login failed');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Registration Form</h2>

        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Password"
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        {isLoading ? (
          <button type="button" disabled>
            Loading...
          </button>
        ) : (
          <button type="submit">Register</button>
        )}
      </form>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginFailure}
      />
    </div>
  );
};

export default RegistrationForm;
