import React from 'react'
import { connect, store, appContext} from './redux'

export const App = () => {
  return (
    <appContext.Provider value={store}>
      <大儿子/>
      <二儿子/>
      <幺儿子/>
    </appContext.Provider>
  )
}
const 大儿子 = () => <section>大儿子<User/></section>
const 二儿子 = () => <section>二儿子<UserModifier/>二儿子的崽</section>
const 幺儿子 = () => <section>幺儿子</section>
const User = connect(({state, dispatch}) => {
  return <div>User:{state.user.name}</div>
})
const UserModifier = connect(({dispatch, state, children}) => {
  const onChange = (e) => {
    dispatch({type:'updateUser', payload: {name: e.target.value}})
  }
  return <div>
    {children}
    <input value={state.user.name}
      onChange={onChange}/>
  </div>
})
