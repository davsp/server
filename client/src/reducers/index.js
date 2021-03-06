import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer'
import surveysReducer from './surveysReducer'


// combineReducers takes all reducers and assigns them all to state properties


export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer
})