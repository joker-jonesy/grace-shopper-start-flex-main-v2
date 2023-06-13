import React, { useState } from 'react'
import { emailValidator, passwordValidator, usernameValidator } from '../../util'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../store/users'


function AccountForm({ user }) {
    const dispatch = useDispatch()
    if (!user) {
        return <div>Loading...</div>
    }
    const [isDisabled, setIsDisabled] = useState(true)
    const [formErrors, setFormErrors] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false
    })

    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        password: "",
        confirmPassword: "",
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        id: user.id
    })

    const handleSaveClick = (event) => {
        event.preventDefault()
        console.log(formData)
        dispatch(updateUser({
            id: formData.id,
            data: {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                avatar: formData.avatar
            }
        }));
        setIsDisabled(true)
    }


    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
        validateForm(event)

    }

    const validateForm = (event) => {
        const { username, email, password, confirmPassword } = formData
        let passwordToCheck = event.target.name === "confirmPassword" ? event.target.value : confirmPassword
        const errors = {
            username: event.target.name === 'username' ? !usernameValidator(event.target.value) : !usernameValidator(username),
            email: !emailValidator(email),
            password: (password !== "" || confirmPassword !== "") ? !passwordValidator(password) : false,
            confirmPassword: (password !== "" || confirmPassword !== "") ? password !== passwordToCheck : false
        }
        setFormErrors(errors)
        setIsDisabled(Object.values(errors).some((error) => error === true))
    }


    const onFileChange = (event) => {
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = () => {
            setFormData({ ...formData, avatar: reader.result })
        }
        reader.onerror = function (error) {
            console.log("Error: ", error)
        }
        setIsDisabled(false)

    }


    return (
        <div className="shadow-2x m-auto mb-4 mt-4 flex w-3/4 justify-center rounded-xl border-2 border-secondary bg-base-200">
            <div className="card w-full p-3">
                <h2 className="card-title">
                    <div className="bg-gradient-to-r from-secondary to-accent bg-clip-text font-extrabold text-transparent">
                        Welcome {formData.username}
                    </div>
                </h2>
                <div className="card-body">
                    <div className="flex flex-row">
                        <span className="flex-grow">Edit your account and press save.</span>
                        <div className="avatar self-end">
                            <div className="mask mask-squircle h-20 w-20">
                                <img src={formData.avatar} alt={formData.username} />
                            </div>
                        </div>
                    </div>
                    <div>
                        Joined: {new Date(formData.createdAt).toLocaleDateString()}
                    </div>

                    <form
                        className="flex flex-col justify-center"
                        onSubmit={(event) => handleAccountEdit(event, formData)}
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" placeholder="Username" className="input input-bordered" name="username" value={formData.username} onChange={handleInputChange} />
                            {formErrors.username && (
                                <div className="text-xs text-error">
                                    Must be 8-30 characters long and no special chacters
                                </div>)}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="Email" className="input input-bordered" name="email" value={formData.email} onChange={handleInputChange} />
                            {formErrors.email && (
                                <div className="text-xs text-error">
                                    Email must be valid
                                </div>)}
                        </div>
                        <div className="flex flex-row">
                            <div className="form-control w-1/2 px-1">
                                <label className="label">
                                    <span className="label-text">Change Password</span>
                                </label>
                                <input type="password" placeholder="Password" className="input input-bordered" autoComplete='newpassword' name="password" value={formData.password} onChange={handleInputChange} />
                                {formErrors.password && (
                                    <div className="text-xs text-error">
                                        Must be 8-15 characters long and no special chacters
                                    </div>)}
                            </div>
                            <div className="form-control w-1/2 px-1">
                                <label className="label">
                                    <span className="label-text">Confirm New Password</span>
                                </label>
                                <input type="password" placeholder="Confirm Password" name="confirmPassword" autoComplete='newpassword' className="input input-bordered" value={formData.confirmPassword} onChange={handleInputChange} />
                                {formErrors.confirmPassword && (
                                    <div className="text-xs text-error">
                                        Passwords must match
                                    </div>)}
                            </div>

                        </div>
                        <div className="form-control w-3/4">
                            <label className="label">
                                <span className="label-text">Profile Image</span>
                            </label>
                            <input
                                type="file"
                                className="file-input-bordered file-input w-3/4"
                                onChange={onFileChange}
                            />
                        </div>

                        <button className="btn-primary btn mt-4" disabled={isDisabled} onClick={handleSaveClick}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AccountForm


