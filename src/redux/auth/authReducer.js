import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_AVATAR_SUCCESS
} from './authConstant';

const initialState = {
  isAuthenticated: false,
  user: JSON.parse(localStorage.getItem('user') || '{}'),
  loading: false,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case UPDATE_AVATAR_SUCCESS: {
      const updatedUser = {
        ...state.user,
        avatar: action.payload
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return {
        ...state,
        user: updatedUser
      };
    }

    case 'UPDATE_PROFILE_BACKGROUND_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case 'UPDATE_PROFILE_BACKGROUND_SUCCESS':
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          profileBackground: action.payload
        }
      };
    
    case 'UPDATE_PROFILE_BACKGROUND_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
