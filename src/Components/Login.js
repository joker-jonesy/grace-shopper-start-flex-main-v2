import React, { useState } from "react"
import { attemptLogin } from "../store"
import { useDispatch } from "react-redux"

const Login = () => {
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value })
  }

  const login = (ev) => {
    ev.preventDefault()
    dispatch(attemptLogin(credentials))
  }
  return (
    <div className="mt-4 w-1/2">
      <div className="card">
        <h2 className="mb-2 text-3xl">Login</h2>
        <form onSubmit={login} className="form-control ">
          <input
            placeholder="username"
            value={credentials.username}
            name="username"
            onChange={onChange}
            className="input my-5 p-2"
          />
          <input
            placeholder="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            className="input my-4 p-2"
          />
          <button className="btn-primary btn">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
