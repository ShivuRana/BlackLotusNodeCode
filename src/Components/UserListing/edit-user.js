import React, { useState, useEffect } from 'react'
import Header from '../NavMenu/Header'
import Sidebar from '../NavMenu/Sidebar'
import NavLinkHeader from '../NavMenu/NavLinkHeader'
import Services from '../../Services/auth.service';
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import $ from 'jquery';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const EditUser = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const history = useNavigate();
    useEffect(() => {

        const loggedInUser = localStorage.getItem("token");
        !loggedInUser && history("/");

        getDataById();
    }, []);

    const getid = useLocation().search;
    const UserID = new URLSearchParams(getid).get("id");
    const [phone, setPhone] = useState({})
    const [formFields, setFormFields] = useState({
        fullName: "",
        email: "",
        phone: "",
        start_date: "",
        end_date: "",
        status: ""


    });

    console.log(formFields, "formFields");
    const [err, seterr] = useState({
        fullName: "",
        email: "",
        phone: "",
        start_date: "",
        end_date: "",
        status: ""


    });
    const getDataById = () => {

        Services.getAdminUserById(UserID)
            .then((response) => {
                console.log(response, "response");
                // return false;
                if (response.data.status === 200) {
                    var data = response.data.data;
                    // var phoneFormate = data.phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")

                    var reqData = {
                        _id: data._id,
                        fullName: data.fullName,
                        email: data.email,
                        phone: data.phone,
                        status: data.status
                    }

                    setFormFields(reqData);
                    setStatus(data.status);
                    setStartDate(new Date(response.data.data.start_date.split("T")[0]));
                    setEndDate(new Date(response.data.data.end_date.split("T")[0]));
                }

            })
            .catch(function (err) {
                console.log(err, "err");
                // swal("Failed", err.response.data.message, "error");
            });

    }





    const [status, setStatus] = useState();
    const handleStatus = () => {
        setStatus(!status)
        console.log(!status, "sts")
    }
    const handleOnchange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case "fullName":
                err.fullName = value.length > 0 ? "" : "Enter fullname";
                break;
            // case "email":
            //     // err.email = value.length > 0 ? "" : "Enter your email";

            //     err.email = value.length > 0 ?
            //         !new RegExp(
            //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            //         ).test(value)
            //             ? "Enter a valid email address"
            //             : "" : "Enter your email"
            case "phone":
                if (value.length !== 10) {
                    // we will set the error state
                    err.phone = "phone atleast have 10 number";
                } else if (!/^[0-9\b]+$/.test(value)) {
                    err.phone = "Enter only number";
                } else if (value.length === "") {
                    err.phone = "Please enter a number";
                } else {
                    err.phone = "";
                }
                var phoneVal = $('#phone').val().replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

                break;
            default:
                break;
        }

        setFormFields({ ...formFields, [name]: value });
        setPhone({ phone: phoneVal })
        // setFormFields({ ...formFields, phone: phoneVal });

        seterr({ ...err });
        console.log(err, "errr on change");
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formFields.fullName === "") {
            err.fullName = "Enter fullname";
        } else {
            err.fullName = "";
        }
        // if (formFields.phone === "") {
        //     err.phone = "Enter phone";
        // } else {
        //     err.email = "";
        // }



        seterr({ ...err });
        console.log(err, "111");
        if (
            err.fullName === "" &&
            err.phone === ""
            // err.status === ""

        ) {
            var editUserData = {
                id: UserID,
                fullName: formFields.fullName,
                // email: formFields.email,
                start_date: startDate,
                end_date: endDate,
                phone: phone.phone,
                status: status,

            };
            console.log(editUserData, "editAdminUser");
            // return false;
            // $(".loader-main").show();

            Services.editAdminUser(UserID, editUserData)
                .then((response) => {
                    // $(".loader-main").hide();

                    console.log(response, "response")
                    if (response.data.status == 200) {
                        swal("Success", response.data.message, "success");
                        // $("#edit-sub")[0].reset();

                    } else {
                        swal("Failed", response.data.message, "error");
                    }
                })
                .catch((err) => {
                    swal("Failed", err.response.data.message, "error");
                });
        }
    };

    return (
        <>
            <div className='wrapper dashboard-main'>
                <Header />
                <div className='top-header-divider'></div>
                <div className='fullpage-layout'>
                    <Sidebar />
                    <div className='rightPanel'>
                        <div className='right-panel-content'>
                            <NavLinkHeader main_title="Dashboard" title1="User List" title1_link="users" title2="Edit User" />

                            <div className='maintable'>
                                <div className='cstm-contentHeader cstm-viewtopicMain'>
                                    <div className='cstm-header'>
                                        <h3>Edit User</h3>
                                    </div>
                                </div>

                                <div className='addtopic-main'>
                                    <form onSubmit={handleSubmit} id="edit-user">
                                        <div className='addtopic-field'>
                                            <div className='col-6 InputField-1 cstm-ModalField'>
                                                <label>User Name</label>
                                                <input type="text" name="fullName" value={formFields.fullName} placeholder="Username" onChange={handleOnchange} ></input>
                                                {err.fullName !== "" && (
                                                    <span style={{ color: "red" }}>
                                                        {err.fullName}
                                                    </span>)}
                                            </div>
                                            <div className='col-6 InputField-1 cstm-ModalField '>
                                                <label>Email Address</label><br />
                                                <input type="text" name="email" onChange={handleOnchange} value={formFields.email} disabled placeholder="curtis.weaver@example.com"></input>
                                            </div>
                                        </div>

                                        <div className='addtopic-field'>
                                            <div className='col-6 InputField-1 cstm-ModalField '>
                                                <label>Start Date</label><br />
                                                <DatePicker
                                                    selected={startDate}
                                                    dateFormat="d MMM, yyyy"
                                                    onChange={(date) => setStartDate(date)}
                                                    wrapperClassName="cstm-datepicker"
                                                    disabled
                                                />
                                                {/* <input type="date" placeholder="1 Feb,2022"></input> */}
                                            </div>

                                            <div className='col-6 InputField-1 cstm-ModalField '>
                                                <label>End Date</label><br />
                                                <DatePicker
                                                    selected={endDate}
                                                    minDate={startDate}
                                                    dateFormat="d MMM, yyyy"
                                                    onChange={(date) => setEndDate(date)}
                                                    wrapperClassName="cstm-datepicker"
                                                    disabled

                                                />
                                                {/* <input type="date" placeholder="1 Feb,2023"></input> */}
                                            </div>
                                        </div>
                                        <div className='addtopic-field'>
                                            <div className='col-6 InputField-1 cstm-ModalField '>
                                                <label>Phone No</label><br />
                                                <input type="text" id="phone" maxLength="10" name="phone" onChange={handleOnchange} value={formFields.phone} placeholder="(205) 555-0100"></input>
                                                {err.phone !== "" && (
                                                    <span style={{ color: "red" }}>
                                                        {err.phone}
                                                    </span>)}
                                            </div>
                                            <div className='col-6 InputField-1 cstm-ModalField '></div>
                                        </div>

                                        <div className='addtopic-field'>
                                            <div className='col-6 InputField-1 cstm-ModalField cstm-switch'>
                                                <label>Status</label><br />
                                                <label className="switch">
                                                    <input type="checkbox" checked={status} onChange={handleStatus}></input>
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                            <div className='col-6 InputField-1 cstm-ModalField '></div>
                                        </div>

                                        <div class="col-12 modal-addbtn"><button class="cstm-btn1">Update</button></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal cstm-modal fade" id="myModal4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel4">
                <div class="modal-dialog modal-dialog-centered cstm-delete-modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header cstm-modalheader">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title cstm-modal-title" id="myModalLabel4"></h4>
                        </div>
                        <div class="modal-body modal-contentbody">
                            <div className='delte-header'>
                                <h4>Are you sure to delete<br /> this audio?</h4>
                            </div>
                            <div className='delete-btn'>
                                <button className='cstm-deletebtn'>Delete</button>
                                <button className='cstm-discardbtn'>Discard</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default EditUser
