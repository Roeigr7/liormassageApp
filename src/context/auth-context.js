import createDataContext from './createDataContext';
import indexApi from '../../api/index';
import AsyncStorage from '@react-native-community/async-storage';

import { storeAsyncStorage, updateAsyncStorage } from './contextHelpers';
import { comparePasswords } from '../helpers/helperFunctions';
const authReducer = (state, action) => {
  switch (action.type) {
    case 'logout':
      return {
        message: '',
        token: null,
        name: null,
        email: null,
        password: null,
        role: null,
        userId: null,
        phone: null,
      };
    case 'sign':
      return {
        message: '',
        token: action.payload.token,
        name: action.payload.user.name,
        phone: action.payload.user.phone,
        email: action.payload.user.email,
        userId: action.payload.user.id,
        role: action.payload.user.role,
      };
    case 'update_phone':
      return {
        ...state,
        phone: action.payload,
      };
    case 'update_name':
      return {
        ...state,
        name: action.payload,
      };
    case 'message':
      return {
        ...state,
        message: {
          content: action.payload.content,
          type: action.payload.type,
        },
      };
    case 'loading':
      return { ...state, loading: action.payload };
    case 'clear_errors':
      return { ...state, message: '' };
    default:
      return state;
  }
};

///////////////CLEAR ERRORS WHEN CHANGE PAGE/////////////////////
const clearErrors = (dispatch) => () => {
  dispatch({ type: 'clear_errors' });
};

///////////////////SIGN UP SIGN IN/////////////////////////////////////////////
const localSign = (dispatch) => async ({
  loginPage,
  name,
  email,
  phone,
  password,
  confirmPass,
}) => {
  dispatch({ type: 'loading', payload: true });
  const page = loginPage ? 'signin' : 'signup';
  if (comparePasswords(password, confirmPass, loginPage)) {
    try {
      const response = await indexApi.post(`/${page}`, {
        name,
        email,
        phone,
        password,
      });

      const userDetails = await storeAsyncStorage(response);
      dispatch({ type: 'sign', payload: userDetails });
      dispatch({ type: 'loading', payload: false });
    } catch (err) {
      dispatch({
        type: 'message',
        payload: {
          type: 'error',
          content: err.response.data.error || 'ישנה בעיה בתקשורת',
        },
      });
      dispatch({ type: 'loading', payload: false });
    }
  } else
    dispatch({
      type: 'message',
      payload: { type: 'error', content: 'סיסמאות לא תואמות' },
    });
  dispatch({ type: 'loading', payload: false });
};
////////////////GOOGLE SIGN//////////////////////////////////
// const googleSign = (dispatch) => async () => {
//   dispatch({ type: 'loading', payload: true });
//   try {
//     const result = await Google.logInAsync({
//       androidClientId:
//         '556835760268-jm5v5u3h1bu4uea3jr788k13ktgc0f2o.apps.googleusercontent.com',
//       androidStandaloneAppClientId:
//         '556835760268-jm5v5u3h1bu4uea3jr788k13ktgc0f2o.apps.googleusercontent.com',
//       scopes: ['profile', 'email'],
//     });

//     if (result.type === 'success') {
//       const response = await indexApi.post(`/sociallogin`, {
//         name: result.user.givenName,
//         email: result.user.email,
//       });

//       dispatch({ type: 'loading', payload: false });
//       const userDetails = await storeAsyncStorage(response);
//       dispatch({ type: 'sign', payload: userDetails });
//     }
//   } catch (err) {
//     dispatch({ type: 'loading', payload: false });
//     dispatch({
//       type: 'message',
//       payload: { type: 'error', content: 'ישנה בעיה בתקשורת' },
//     });
//   }
// };

////////////////FACEBOOK SIGN//////////////////////////////////
// const facebookSign = (dispatch) => async () => {
//   dispatch({ type: 'loading', payload: true });
//   try {
//     await Facebook.initializeAsync({
//       appId: '358621752139623',
//     });
//     res = await Facebook.logInWithReadPermissionsAsync({
//       permissions: ['public_profile', 'email'],
//     });

//     if (res.type === 'success') {
//       // Get the user's name using Facebook's Graph API
//       const facebookRes = await fetch(
//         `https://graph.facebook.com/me?access_token=${res.token}&fields=id,name,email`
//       );
//       const details = await facebookRes.json();
//       const response = await indexApi.post(`/sociallogin`, {
//         name: details.name,
//         email: details.email,
//         password: undefined,
//       });
//       const userDetails = await storeAsyncStorage(response);
//       dispatch({ type: 'sign', payload: userDetails });
//       dispatch({ type: 'loading', payload: false });
//     }
//   } catch (err) {
//     dispatch({
//       type: 'message',
//       payload: { type: 'error', content: 'ישנה בעיה בתקשורת' },
//     });
//     dispatch({ type: 'loading', payload: false });
//   }
// };

////Automatically sign in user////

const autoSignIn = (dispatch) => async (showModal) => {
  dispatch({ type: 'loading', payload: true });
  try {
    let user = await AsyncStorage.getItem('user');
    let parsedUser = JSON.parse(user);

    if (parsedUser.token) {
      showModal({ id: 'WelcomeModal' });
      dispatch({ type: 'sign', payload: parsedUser });
      dispatch({ type: 'loading', payload: false });
    }
  } catch (err) {
    showModal({ id: 'SignModal' });
    dispatch({ type: 'loading', payload: false });
  }
};
const logout = (dispatch) => async () => {
  dispatch({ type: 'loading', payload: true });
  const response = await indexApi.post('/signout');
  AsyncStorage.clear();
  dispatch({ type: 'logout' });
  dispatch({ type: 'loading', payload: false });
};
///////UPDATE USER///////////
const updateUser = (dispatch) => async (
  userId,
  token,
  param = 'phone',
  value
) => {
  dispatch({ type: 'loading', payload: true });
  try {
    const res = await indexApi.put(
      `/user/${userId}`,
      {
        [param]: value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await dispatch({ type: `update_${param}`, payload: value });
    await dispatch({ type: 'loading', payload: false });
    const userDetails = await updateAsyncStorage(res, token);
    dispatch({ type: 'sign', payload: userDetails });
    await dispatch({
      type: 'message',
      payload: { type: 'success', content: 'השינוי בוצע בהצלחה' },
    });
  } catch (err) {
    await dispatch({
      type: 'message',
      payload: {
        type: 'error',
        content: err.response.data.error || 'ישנה בעיה בתקשורת',
      },
    });
    await dispatch({ type: 'loading', payload: false });
  }
};

///////forgot Password/////////

export const forgotPassword = (dispatch) => async (email) => {
  dispatch({ type: 'loading', payload: true });
  try {
    const response = await indexApi.put('forgotPassword', {
      email,
    });
    dispatch({
      type: 'message',
      payload: {
        type: 'success',
        content: response.data || 'נשלח מייל לכתובת שנבחרה',
      },
    });

    dispatch({ type: 'loading', payload: false });
  } catch (err) {
    dispatch({ type: 'loading', payload: false });
    dispatch({ type: 'message', payload: { type: '', content: '' } });
    return err;
  }
};

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    logout,
    clearErrors,
    autoSignIn,
    localSign,
    updateUser,
    forgotPassword,
  }, //actions object
  {
    token: null,
    userId: null,
    message: { content: '', type: '' },
    loading: false,
  }
);
