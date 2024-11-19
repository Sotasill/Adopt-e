const API_BASE_URL = "http://localhost:3001"; // Измените на ваш URL когда будет бэкенд

export const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Что-то пошло не так");
  }
  return response.json();
};

// Пока у нас нет бэкенда, будем использовать localStorage
export const uploadProfileBackground = async (imageFile) => {
  try {
    // Конвертируем файл в base64
    const base64 = await convertToBase64(imageFile);
    
    // Сохраняем в localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.profileBackground = base64;
    localStorage.setItem('user', JSON.stringify(user));
    
    return base64;
  } catch (error) {
    console.error('Error uploading background:', error);
    throw error;
  }
};

// Функция для конвертации файла в base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const uploadAvatar = async (imageFile) => {
  try {
    const base64 = await convertToBase64(imageFile);
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.avatar = base64;
    localStorage.setItem('user', JSON.stringify(user));
    
    return base64;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
};
