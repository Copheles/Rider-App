import createDataContext from "./createDataContext";
import riderApi from "../api/rider";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext } from "react";

const authReducer = (state, action) => {
  switch(action.type){
    case 'add_error':
      return { ...state, errorMessage: action.payload}
    case 'clear_error_message':
      return { ...state, errorMessage: null}
    case 'signin':
      return {...state, token: action.payload , errorMessage: null}
    case 'logout':
      return { ...state, token: null, errorMessage: null}
    default: 
      return state;
  }
}

const signUp = (dispatch) => async ({ email, password, username}) => {
  try {
    console.log(email, password, username)
    const response = await riderApi.post("/register", { email, password, name: username})
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signin', payload: response.data.token})

    console.log(response.data)
  } catch (error) {
    console.log(error.response.data)
    dispatch({ type: 'add_error', payload: error.response.data.error})
  }
}


const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message'})
}

const signIn = (dispatch) => async ({ email, password}) => {
  try {
    console.log(email, password)
    const response = await riderApi.post("/login", { email, password })
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user))
    dispatch({ type: 'signin', payload: response.data.token})

  } catch (error) {
    console.log(error.response.data)
    dispatch({ type: 'add_error', payload: error.response.data.message})
  }  
}

const tryLocalSignIn = (dispatch) => async() => {
  const token = await AsyncStorage.getItem('token');
  if(token) {
    dispatch({ type: "signin", payload: token})
  }
}

const signOut = (dispatch) => async () => {
  await AsyncStorage.removeItem('token')
  dispatch({ type: 'logout'})
}

export const { Provider, Context} = createDataContext(
  authReducer,
  {signUp, signIn, signOut, clearErrorMessage, tryLocalSignIn},
  { token: null , errorMessage: null}
)

export const useAuth = () => {
  const authContext = useContext(Context);
  return authContext;
};