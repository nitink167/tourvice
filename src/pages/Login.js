import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBValidationItem, MDBBtn, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { login } from "../redux/features/authSlice";

const initialState = {
    email: "",
    password: ""
}

const Login = () => {
    const [formValue, setFormValue] = useState(initialState);
    const { email, password } = formValue;
    const { loading, error } = useSelector((state) => ({...state.auth}))
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(login({formValue, navigate, toast}))
        }
    }

    // const googleSuccess = (resp) => {
    //     console.log(resp);
    //     window.alert("Did it login?")
    // };

    // const googleFailure = (err) => {
    //     console.log(err.error);
    //     toast.error(err.error)
    // }

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value })
    }
    return (
        <div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }}>
            <MDBCard alignment='center'>
                <MDBIcon fas icon="user-circle" className='fa-2x' />
                <h5>Sign In</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                        <div className='col-md-12'>
                            <MDBValidationItem feedback='Please enter a valid email' invalid>
                                <MDBInput label="Email" type="email" value={email} name="email" onChange={onInputChange} required />
                            </MDBValidationItem>
                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback='Please enter correct password' invalid>
                                <MDBInput label="Password" type="password" value={password} name="password" onChange={onInputChange} required />
                            </MDBValidationItem>
                        </div>
                        <div className='col-12'>
                            <MDBBtn style={{ width: "100%", className: "mt-2" }}>
                                { loading && (
                                    <MDBSpinner size='sm' role="status" tag="span" className='me-2'/>
                                )}
                                Login
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                    <br />
                    {/* <GoogleLogin 
                        clientId="886242466658-koo1ksmlb8kqfelh7l5j2sgg52fk7rai.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <MDBBtn style={{width:"100%"}} color="danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <MDBIcon className='me-2' fab icon="google" />Google Sign In
                            </MDBBtn>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    /> */}
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/register">
                        <p>Don't have an account? Sign Up</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    )
}

export default Login