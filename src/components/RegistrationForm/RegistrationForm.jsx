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

  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    
    console.log('Отправка данных:', userData);
    
    try {
      const response = await dispatch(registerUser(userData));
      
      if (response.type.endsWith('/rejected')) {
        throw new Error(response.payload?.message || 'Ошибка при регистрации');
      }
      
      console.log('Регистрация успешна:', response.payload);
      
    } catch (error) {
      console.error('Ошибка регистрации:', {
        error: error.toString(),
        userData: userData,
        timestamp: new Date().toISOString()
      });
      
      setValidationError(error.message);
    }
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

        {validationError && <p style={{ color: "red" }}>{validationError}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {isLoading ? (
          <button type="button" disabled>
            Loading...
          </button>
        ) : (
          <button type="submit">Register</button>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
