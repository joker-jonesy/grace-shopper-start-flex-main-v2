import React, { useState } from "react"
import { attemptLogin } from "../store"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

const Login = () => {
  const { auth } = useSelector((state) => state)
  const navigate = useNavigate()

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
  if (!!auth.id) {
    navigate("/products")
  }
  return (
    <div className="mt-4 w-1/2">
      <div className="card">
        <Link to="/account/create">Sign Up</Link>
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
