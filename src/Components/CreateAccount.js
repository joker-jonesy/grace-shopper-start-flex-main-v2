import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  useEffect(() => {username.match(/^[A-Za-z][A-Za-z0-9_]{7,29}$/) ? setIsValidUsername(true) : setIsValidUsername(false)}, [username]);
  useEffect(() => {password.match(/^[A-Za-z]\w{7,14}$/) ? setIsValidPassword(true) : setIsValidPassword(false)}, [password])
  useEffect(() => {email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? setIsValidEmail(true) : setIsValidEmail(false)}, [email])

  const createUser = async (newUser) => {
    const response = await axios.post("/api/account/create", newUser);
  }

  const create = (event) => {
    event.preventDefault();
    const newUser = {username, password, email}
    createUser(newUser);
  }

  return (
    <>
      <form
        className="flex flex-col justify-center"
        onSubmit={create}
      >
        <h3>Username</h3>
        <input
          className={
            isValidUsername
              ? "input-bordered input-primary input m-1"
              : "input-bordered input-warning input m-1"
          }
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <h3>Password</h3>
        <input
          className={
            isValidPassword
              ? "input-bordered input-primary input m-1"
              : "input-bordered input-warning input m-1"
          }
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <h3>Email</h3>
        <input
          className={
            isValidEmail
              ? "input-bordered input-primary input m-1"
              : "input-bordered input-warning input m-1"
          }
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button
          disabled={!isValidEmail || !isValidPassword || !isValidUsername}
          className="btn-primary btn m-1"
        >
          Creat Account
        </button>
      </form>
    </>
  )
}

export default CreateAccount;