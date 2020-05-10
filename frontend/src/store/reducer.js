const initialState = {

    isLoggedIn: false,
    userType: 'none',
    user: {}
};

const reducer = (state = initialState, action) => {
    console.log(action);
    if (action.type === 'LOGOUT') {
        return {
            ...state,
            isLoggedIn: false,
            userType: "none"
        }
    }
    if (action.type === 'LOGIN') {
        return {
            ...state,
            isLoggedIn: true,
            userType: action.value,
            user: action.user
        }
    }
    if (action.type === 'saveToProfile') {
        return {
            ...state,
            user: action.user
        }
    }
    return state;
};


export default reducer;