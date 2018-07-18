import { FETCH_USER } from '../actions/types'

export default function(state = null, action) {
    const { payload, type } = action;
    console.log(action)
    switch (type) {
        case FETCH_USER:
            return payload || false //look into this falsy stuff
        default:
            return state
    }
}