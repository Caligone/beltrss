export const INIT_APP = 'INIT_APP';
export const INIT_APP_SUCCESS = 'INIT_APP_SUCCESS';

export const APP_STATUS = {
    INITIALIZING: 0,
    INITIALIZED: 1,
};

export const initialState = {
    status: APP_STATUS.INITIALIZING,
};

export default (state = initialState, action) => {
    switch(action.type) {
    case INIT_APP:
        return {
            ...state,
            status: APP_STATUS.INITIALIZING,
        };
    case INIT_APP_SUCCESS:
        return {
            ...state,
            status: APP_STATUS.INITIALIZED,
        };
    default:
        return state;
    }
};

/*
    Action creators
*/
export const initApp = () => ({ type: INIT_APP });
export const initAppSuccess = () => ({ type: INIT_APP_SUCCESS });

/*
    Selectors
*/
export const appStatusSelector = (state) => ( state.App.status );
