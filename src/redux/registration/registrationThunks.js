import { startLoading, stopLoading, setError } from "./registrationSlice";

// Пример: асинхронная регистрация пользователя
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    // Пример запроса к API
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to register");
    }

    const data = await response.json();
    console.log("User registered:", data);
    // Здесь можно добавить успешные действия
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(stopLoading());
  }
};
