
import createDataContext from "./createDataContext";
import riderApi from "../api/rider";
import AsyncStorage from "@react-native-async-storage/async-storage";



const userProfileReducer = (state, action) => {

  // Define your reducer logic here based on action types
  switch(action.type){
    case 'get_profile':
      return { ...state, userProfile: action.payload}
    case 'clear_profile':
      return { ...state, userProfile: null};
    default: 
      return state;
  }
};

const getUserProfile = (dispatch) => async () => {
  // Fetch the user's profile data from an API and dispatch an action
  try {
    const user = await AsyncStorage.getItem('user')
    console.log(JSON.parse(user))
    dispatch({ type: 'get_profile', payload: JSON.parse(user) });
  } catch (error) {
    // Handle error
    console.log(error);
  }
};

const clearProfile = (dispatch) => async() => {
  dispatch({ type: 'clear_profile'})
}

// Define other actions related to user profile management

export const { Provider, Context } = createDataContext(
  userProfileReducer,
  { getUserProfile, clearProfile },
  { userProfile: null,  } // Initial state
);

