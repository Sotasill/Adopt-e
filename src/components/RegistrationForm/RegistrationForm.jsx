import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  return (
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
  );
};

export default RegistrationForm;
