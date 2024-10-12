import React, {useState, useEffect} from 'react'
let state = undefined
let reducer = undefined
let listeners = []
const setState = (newState) => {
  state = newState
  listeners.map((fn)=> fn(state))
}
let dispatch = (action) => {
  setState(reducer(state, action))
}
const prevDispatch = dispatch
const prevDispatch2 = dispatch

dispatch = (action) => {
  if(typeof action === 'function') {
    action(dispatch)
  } else {
    prevDispatch(action)  
  }
}

dispatch = (action) => {
  if(action.payload instanceof Promise) {
    action.payload.then(data => {
      dispatch({...action, payload: data})
    })
  } else {
    prevDispatch2(action)  
  }
}

export const store = {
  getState() {
    return state
  },
  subCancel(fn) {
    listeners.push(fn)
    return () => {
      const index = listeners.indexOf(fn)
      listeners.splice(index)
    }
  }
}

export const createStore = (initState, _reducer) => {
  state = initState
  reducer = _reducer
  return store
}

const changed = (oldState, newState) => {
  let changed = false
  for(let key in oldState) {
    if(oldState[key] !== newState[key]) {
      changed = true
    }
    return changed;
  }
}

export const connect = (selector, dispatchSelector) => (Component) => {
  const Wrapper = (props) => {
    const [, update] = useState({})    
    const data = selector ? selector(state) : {state}
    const dispatchers = dispatchSelector ? dispatchSelector(dispatch) : {dispatch}
    useEffect(() => store.subCancel(() => {
      const newData = selector ? selector(state) : state
      if(changed(data, newData)) {
          update({})
      }
    }), [selector])
    return <Component {...props} {...dispatchers} {...data} />
  }
  return Wrapper
}

export const appContext = React.createContext(null)

export const Provider = ({store, children}) => {
  return (
    <appContext.Provider value={store}>
      {children}
    </appContext.Provider>
  )
}