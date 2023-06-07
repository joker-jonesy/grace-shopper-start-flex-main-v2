import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/auth";
import { updateUser } from "../store/users";

const Account = () => {
  const { auth } = useSelector((state) => state);

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

  const [editAccount, setEditAccount] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  useEffect(()=>{
    if(auth.id){
      setEmail(auth.email);
      setUsername(auth.username)
    }
  },[auth])

  

  const EditAccount = () => {
    const originalEmail = email;
    const originalUsername = username;
    const [updatedEmail, setUpdatedEmail] = useState(email);
    const [updatedUsername, setUpdatedUsername] = useState(username)
    const [isValidUsername, setIsValidUsername] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(false)

    useEffect(() => {
      updatedUsername.match(/^[A-Za-z][A-Za-z0-9_]{7,29}$/)
        ? setIsValidUsername(true)
        : setIsValidUsername(false)
    }, [updatedUsername])
    useEffect(() => {
      updatedEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ? setIsValidEmail(true)
        : setIsValidEmail(false)
    }, [updatedEmail])

    const handleAccountEdit = (event) => {
      event.preventDefault()
      if (
        originalEmail === updatedEmail &&
        originalUsername === updatedUsername
      ) {
        setEditAccount(false)
      } else {
        dispatch(
          updateUser({
            id: auth.id,
            data: { username: updatedUsername, email: updatedEmail },
          })
        )
        location.reload()
        setEditAccount(false);
      }
    }

    return (
      <div className="shadow-2x m-auto mb-4 mt-4 flex w-1/2 justify-center rounded-xl border-2 border-secondary bg-base-200">
        <div className="card ">
          <h2>Edit Mode</h2>
          <form
            className="flex flex-col justify-center"
            onSubmit={handleAccountEdit}
          >
            <h3>Email</h3>
            <input
              value={updatedUsername}
              onChange={(event) => setUpdatedUsername(event.target.value)}
              className="input-md"
            />
            <h3>username</h3>
            <input
              value={updatedEmail}
              onChange={(event) => setUpdatedEmail(event.target.value)}
              className="input-md"
            />
            <button
              disabled={!isValidEmail || !isValidUsername}
              className="btn-primary btn"
            >
              Finnish
            </button>
          </form>
        </div>
      </div>
    )
  }

  const ViewAccount = () => {
    return (
      <div className="shadow-2x m-auto mb-4 mt-4 flex w-1/2 justify-center rounded-xl border-2 border-secondary bg-base-200">
        <div className="card ">
          <div>Your Email: {auth.email}</div>
          <button
            onClick={() => {
              setEditAccount(true)
            }}
          >
            Edit Account
          </button>
        </div>
      </div>
    )
  }
  
  if(auth.id){
    return (
      <div className="">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-9xl font-extrabold text-transparent">
            Welcome {username}
          </div>
        </div>
        <>{!editAccount ? <ViewAccount /> : <EditAccount />}</>
        <button className="btn-primary btn" onClick={() => handleLogout()}>
          logout
        </button>
      </div>
    )
  }else{
    navigate("/account/create")
  }
}

export default Account