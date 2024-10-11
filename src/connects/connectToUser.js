import { connect } from "../redux";

const useSelector = (state) => {
    return {user: state.user}
}

const useDispatchers = (dispatch) => {
  return {
    updateUser: (attrs) => dispatch({type:'updateUser', payload: attrs})
  }
}

export const connectToUser = connect(useSelector, useDispatchers)