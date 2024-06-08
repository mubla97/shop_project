import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const navigate = useNavigate()

    const redirectToSettings = () => {
        navigate("/profile/settings");
    };

    const changePassword = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8080/profile/password', {
            oldPassword: oldPassword,
            newPassword: password,
            newPassword2: password2
        },
            {
                withCredentials: true,
            }
        )
            .then((res) => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("username");
            })
            .then(() => {
                alert("The session will be closed so you can enter with your new credentials");
                window.location = '/login';
            })

    }

    return (
        <>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-white">
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-5 mt-md-4">

                                    <h2 className="fw-bold mb-2 text-uppercase">Change password</h2>
                                    <p className="mb-5">Please enter your old Password and new password!</p>

                                    <div className="form-outline form-white mb-4">
                                        <label className="form-label" >Old Password</label>
                                        <input type="password" className="form-control form-control-lg" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Your current password..." />
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <label className="form-label" >New Password</label>
                                        <input type="password" className="form-control form-control-lg" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your new password..." />
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <label className="form-label" >Verify New Password</label>
                                        <input type="password" className="form-control form-control-lg" value={password2} onChange={e => setPassword2(e.target.value)} placeholder="Confirm new password..." />
                                    </div>

                                    <button className="btn btn-success btn-lg px-5" onClick={e => { changePassword(e) }} type="submit">Change</button>

                                    <div className="mt-4">
                                        <button className="btn btn-warning btn-lg px-5 margin-top: 5px" onClick={redirectToSettings}>Go Back </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword;