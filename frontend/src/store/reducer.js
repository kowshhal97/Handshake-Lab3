const initialState = {

    isLoggedIn: false,
    userType: 'none',
    user: {
        
    },
    name:""
};

const reducer = (state = initialState, action) => {
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
            name:action.user.name,
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