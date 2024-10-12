import React from 'react'
import { connect, createStore, Provider} from './redux'
import {connectToUser} from './connects/connectToUser'

const initState = {
  user: {name: 'a-tione', age: 18},
  group: {name: '前端'}
}

const reducer = (state, {type, payload}) => {  
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  } else {
    return state
  }
}

const store = createStore(initState, reducer)

export const App = () => {
  return (
    <Provider store={store}>
      <大儿子/>
      <二儿子/>
      <幺儿子/>
    </Provider>
  )
}
const 大儿子 = () => {
  console.log('大儿子执行了 ' + Math.random())
  return <section>大儿子<User/></section>
}
const 二儿子 = () => {
  console.log('二儿子执行了 ' + Math.random())
  return <section>二儿子<UserModifier/>二儿子的崽</section>
}
const 幺儿子 = connect(state => {
  return {group: state.group}
})(({group}) => {
  console.log('幺儿子执行了 ' + Math.random())
  return <section>幺儿子<div>Group: {group.name}</div></section>
})
const ajax = () => {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      return resolve({data: {haha:'3秒后出现结果'}})
    }, 3000)
  })
}
const fetchUserPromise = () => {
  return ajax('/user').then(res => res.data)
}
const fetchUser = (dispatch) => {
  return ajax('/user').then(res => dispatch({type: 'updateUser', payload: res.data}))
}
const User = connectToUser(({user}) => {
  return <div>User:{user.name}</div>
})
const UserModifier = connect(null, null)(({state, dispatch}) => {
  const onClick = (e) => {
    dispatch({type: 'updateUser', payload: fetchUserPromise()})
    // dispatch(fetchUser)
  }
  return <div>
    <div>User: {state.user.haha}</div>
    <button onClick={onClick}>异步获取 user</button>
  </div>
})
