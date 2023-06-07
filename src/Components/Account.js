import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/auth";

const Account = () => {
  const { auth } = useSelector((state) => state);

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [isValidUsername, setIsValidUsername] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(false)

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

  useEffect(() => {
    username.match(/^[A-Za-z][A-Za-z0-9_]{7,29}$/)
      ? setIsValidUsername(true)
      : setIsValidUsername(false)
  }, [username])
  useEffect(() => {
    email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ? setIsValidEmail(true)
      : setIsValidEmail(false)
  }, [email]);
  
  if(auth.id){
    console.log(auth);
    return (
      <div className="">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-9xl font-extrabold text-transparent">
            Welcome {auth.username}
          </div>
        </div>
        <>
          {!editAccount ? (
            <>
              <div>{auth.email}</div>
              <button
                onClick={() => {
                  setEditAccount(true)
                }}
              >
                Edit Account
              </button>
            </>
          ) : (
            <>
              <h2>Edit Mode</h2>
              <button
                onClick={() => {
                  setEditAccount(false)
                }}
              >
                Finnish
              </button>
            </>
          )}
        </>
        <button onClick={() => handleLogout()}>logout</button>
      </div>
    )
  }else{
    navigate("/account/create")
  }
}

export default Account