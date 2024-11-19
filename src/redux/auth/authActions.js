import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  UPDATE_AVATAR_SUCCESS
} from "./authConstant";
import { setTestUser } from "../../utils/testAuth";
import { uploadProfileBackground } from '../../services/api';

export const login = () => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const testData = setTestUser();
    localStorage.setItem('user', JSON.stringify(testData.user));
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: testData.user,
    });

    return Promise.resolve();
  } catch (error) {
    localStorage.removeItem('user');
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || 'Ошибка входа',
    });
    return Promise.reject(error);
  }
};

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logout = () => (dispatch) => {
  localStorage.removeItem('user');
  dispatch({ type: LOGOUT });
};

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

export const checkAuth = () => (dispatch) => {
  const user = localStorage.getItem('user');
  if (user) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: JSON.parse(user)
    });
  }
};

export const updateAvatar = (blob) => async (dispatch) => {
  try {
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64data = reader.result;
      
      dispatch({
        type: UPDATE_AVATAR_SUCCESS,
        payload: base64data
      });
    };

    reader.readAsDataURL(blob);
    
    return Promise.resolve();
  } catch (error) {
    console.error('Ошибка обновления аватара:', error);
    return Promise.reject(error);
  }
};

export const updateProfileBackground = (imageFile) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_PROFILE_BACKGROUND_START' });
    
    const backgroundUrl = await uploadProfileBackground(imageFile);
    
    dispatch({ 
      type: 'UPDATE_PROFILE_BACKGROUND_SUCCESS',
      payload: backgroundUrl
    });
    
    return backgroundUrl;
  } catch (error) {
    dispatch({ 
      type: 'UPDATE_PROFILE_BACKGROUND_FAILURE',
      payload: error.message
    });
    throw error;
  }
};
