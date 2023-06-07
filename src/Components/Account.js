import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { auth } = useSelector((state) => state);

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [isValidUsername, setIsValidUsername] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(false)

  const [editAccount, setEditAccount] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      <>
        <h1>Welcome {auth.username}</h1>
        <>
          {!editAccount ? (
            <>
              <h2>{auth.email}</h2>
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
      </>
    )
  }else{
    navigate("/account/create")
  }
}

export default Account