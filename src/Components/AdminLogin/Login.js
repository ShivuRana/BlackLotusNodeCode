import React ,{ useEffect, useState } from 'react'
import logo from "../../Images/logo.png";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from "yup"; // used when validating with a pre-built solution
import swal from 'sweetalert';
import $ from 'jquery';
import { useNavigate, Navigate } from "react-router-dom";
import Services from '../../Services/auth.service';

const Login = () => {

    const history = useNavigate();
    useEffect(() => {
        const loggedInUser = localStorage.getItem("token");
        loggedInUser && history("/dashboard");
    }, []);

    const validationSchema = Yup.object().shape({
        user_email: Yup.string().email('Invalid email format').required('Enter email'),
        password: Yup.string().required('Enter password')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onchange',
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data, e) => {

        // console.log(data, "Login Details")

        var dataValue = {
            "email": data.user_email,
            "password": data.password
        }

        Services.adminLogin(dataValue)
            .then(response => {
                // $(".loader-main").show();
                console.log(response,"res")
                // return false;

                if (response.data.status == true) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user_id", response.data.data.admin._id);
                    swal("Success", "Login Successfully", "success");
                    history("/dashboard")

                } else {
                    // swal("Failed", response.data.message, "error");
                swal("Success", "Login Failed", "error");

                }
            }).catch(err => {
                console.log(err,"err")
                // swal("Success", "Login Failed", "error");
                swal("Failed", err.message, "error");


            })
    }

    return (
        <>
            <div class="wrapper login-main-page">
                <div class="container-fluid pageLayoutMain">
                    <div class="row">
                        <div class="col-12 logo logo-content text-center">
                            <img src={logo} />
                            <h5>GUATEMALA</h5>
                            <p>SHADOW WORK FOR LIGHT WORKERS</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 login-header'>
                            <h2>Login</h2>
                            <div className='loginheader-border'></div>
                        </div>
                    </div>
                    <div className='row'>
                        {/* <form> */}
                        <form noValidate onSubmit={handleSubmit(onSubmit)}>
                            <div className='col-12 cstm-formMain'>
                                <label>Email*</label><br />
                                <input type="email" {...register('user_email')} name="user_email" className="form-control" placeholder="Enter your email" id="" required="" />
                                <span className="invalid-error-login" style={{ color: "red" }}>{errors.user_email?.message}</span>

                                {/* <input type="email" placeholder="enter your email"></input> */}
                            </div>
                            <div className='col-12 cstm-formMain'>
                                <label>Password*</label><br />
                                {/* <input type="text" placeholder="enter your password"></input> */}
                                <input type="password" className="form-control" {...register('password')} placeholder="Enter your password" name="password" id="" required="" />
                                <span className="invalid-error-login" style={{ color: "red" }}>{errors.password?.message}</span>
                            </div>
                            <div className=' cstm-checkbox-forgotpwd-main'>
                                <div className='col-6 cstm-checkbox'>
                                    <input type="checkbox"></input>
                                    <label>Remember me</label>
                                </div>
                                <div className='col-6 txt-forgot-pwd'>
                                    <a href='#'>Forgot Password?</a>
                                </div>
                            </div>
                            <div className=''>
                                <div className='col-12'>
                                    <a href='#'><button type="submit" className='cstm-btn'>Login</button></a>
                                    {/* <div id="login-loader" className='loader-main' style={{ display: 'none' }}>
                                        <img src={loader} />
                                    </div> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;
