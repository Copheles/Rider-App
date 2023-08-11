import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch(action.type){
    default: 
    return state;
  }
}

const signUp = (dispatch) => ({ email, password}) => {

}


const signIn = (dispatch) => ({ email, password}) => {

  
}

const signOut = (dispatch) =>  () => {

}

export const { Provider, Context} = createDataContext(
  authReducer,
  {signUp, signIn, signOut},
  { isSignedIn: true}
)