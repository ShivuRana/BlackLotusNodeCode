import drag from "../../Images/drag.png";
import { useParams } from 'react-router-dom';
import ViewTopic from './ViewTopic';
import AddTopic from './AddTopic';
import EditTopic from './EditTopic';

import React, { useEffect, useState } from 'react';
import Header from '../NavMenu/Header';
import Sidebar from '../NavMenu/Sidebar';
import NavLinkHeader from '../NavMenu/NavLinkHeader';
import Services from '../../Services/auth.service';
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { Link, useNavigate } from 'react-router-dom';
import loader from "../../Images/loder.gif";
import moment from "moment";

import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import swal from "sweetalert";



function Table({ columns, data }) {
    const [showLoader, setLoader] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 2500)
    }, [])
    const props = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 100 }
        },
        useGlobalFilter, // useGlobalFilter!
        usePagination
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
        state,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,


        state: { pageIndex, pageSize, globalFilter }
    } = props;


    let firstRecord = pageIndex * pageSize + 1;
    let lastRecord = firstRecord + pageSize - 1;

    useEffect(() => {

        // console.log(globalFilter);
    }, [globalFilter]);

    return (
        <>

            <div className='maintable'>
                <div className='cstm-contentHeader'>
                    <div className='cstm-header'>
                        <h3>Requested User Listing</h3>
                    </div>
                    <div className='cstm-search-createbtn'>
                        <div className='serachbox searchbox-2'>
                            <i class="fa fa-search" aria-hidden="true"></i>
                            <input name="search-user" id="search-user" value={globalFilter || ""} onChange={e => setGlobalFilter(e.target.value)} type="text" class="cstm-input-seacrh" placeholder="Search User" />

                            {/* <input type="text" placeholder='Search'></input> */}
                        </div>
                    </div>
                </div>
                <div id="Dashboard" className="main-tab">
                    <div class="table-responsive bg-white rounded">
                        <table class="table mb-0 table-center cstm-cl-mn3 cstm-table" {...getTableProps()}>
                            <thead>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()} className="border-top">
                                        {headerGroup.headers.map(column => (
                                            <th class="border-bottom w-4 cstm-userheading" {...column.getHeaderProps()}>
                                                {column.render("Header")}
                                                {/* Render the columns filter UI */}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()} >
                                {
                                    page.length > 0 && page.map((row, i) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()} className="cstm-Tabledesign cstm-usertable-design">
                                                {row.cells.map(cell => {
                                                    return (
                                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>

                        {!showLoader ? page.length === 0 &&
                            <div className="NoRecord-cstm">No record found!</div> : <div className="NoRecord-cstm"> <img className="pageloader" src={loader} /></div>
                        }
                    </div>
                </div>
            </div>

            <div class="row text-center">
                <div class="col-12 mt-4">
                    <div class="d-md-flex align-items-center text-center justify-content-between">
                        <span class="text-muted me-3">
                            {page.length !== 0 && `Showing ${firstRecord} -${" "}
                  ${lastRecord < rows.length ? lastRecord : rows.length} out of${" "}
                  ${rows.length}`}
                        </span>
                        <ul className="pagination justify-content-center mb-0 mt-3 mt-sm-0">

                            {pageOptions.length !== 1 && page.length !== 0 && (<li class="page-item">
                                <a
                                    class="page-link"
                                    onClick={() => previousPage()}
                                    disabled={!canPreviousPage}
                                    href="javascript:void(0)"
                                >
                                    Prev
                                </a>
                            </li>)}

                            {
                                pageOptions.map(pgnumber => {
                                    return (
                                        pgnumber !== pageCount && pageCount !== 1 &&
                                        <li className={`page-item ${pageIndex == pgnumber ? 'active' : ''}`} ><a className="page-link" href="javascript:void(0)" onClick={() => gotoPage(pgnumber)} > {pgnumber + 1} </a></li>)

                                })
                            }
                            {pageOptions.length !== 1 && page.length !== 0 && (<li class="page-item">
                                <a
                                    class="page-link"
                                    onClick={() => nextPage()}
                                    disabled={!canNextPage}
                                    href="javascript:void(0)"
                                >
                                    Next
                                </a>
                            </li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

const RequestedUserList = () => {
    const history = useNavigate();
    const [selectedId, setselectedId] = useState();

    const columns =
        [
            {
                Header: 'No',
                accessor: 'serial'
            },

            {
                Header: "User Name",
                accessor: "firstName"
            },
            {
                Header: "Email",
                accessor: "email"
            },
            {
                Header: "Course",
                accessor: "course"
            },
            {
                Header: "Start Date",
                accessor: "start_date"
            },
            {
                Header: "End Date",
                accessor: "end_date"
            },
            {
                Header: "Joining Date",
                accessor: "createdAt"
            },
            {
                Header: "Actions",

                Cell: (row) => {
                    return (
                        <div>

                            <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal2"
                                onClick={() => handlePopup(row.cell.row.original._id)
                                }>
                                <i class="fa fa-eye cstm-eye" aria-hidden="true"></i>

                            </button>

                            <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal3">
                                <Link to={"/edit-user/?id=" + row.cell.row.original._id} class="cstm-edit"><i class="fa fa-pencil" aria-hidden="true"></i></Link>
                            </button>

                            <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal4"
                                onClick={() => setselectedId(row.cell.row.original._id)}>
                                <i class="fa fa-trash cstm-delete" aria-hidden="true"></i>
                            </button>

                        </div>
                    );
                },
            },
        ]

    function createData(_id, firstName, email, course, start_date, end_date ,createdAt, action) {
        return {
            _id,
            firstName,
            email,
            course,
            start_date,
            end_date,
            createdAt,

        };
    }
    const [data, setdata] = useState([]);

    // No of Index 
    data.forEach((data_id, index) => { data_id.serial = index + 1; });
    data.forEach((data_id, index) => { data_id.null = "-"; });

    var DataArray = [];
    useEffect((data, e) => {
        const loggedInUser = localStorage.getItem("token");
        !loggedInUser && history("/");
        getData();
    }, []);

    const getData = () => {
        
        var userData={
            "month_course_request": "requested",
            // "year_course_request": "approved",
        }

        Services.getAdminUser(userData)
            .then((response) => {
                console.log(response, "res");
                // return false;
                if (response.data.status = true) {
                    var arr = response.data.data.user_data;
                    if (response.data.data.user_data.length > 0) {
                        var newarr = [];
                        for (var i = 0; i < arr.length; i++) {
                            var date = moment(arr[i].createdAt).format('DD MMM, YYYY')
                            

                            var status = "";
                            arr[i].status == true ? (status =

                                <div className="cstm-switch">
                                    <label className="switch">
                                        <input type="checkbox" checked disabled></input>
                                        <span className="slider round"></span>
                                    </label>
                                </div>

                            ) : (
                                status =
                                <div className="cstm-switch">
                                    <label className="switch">
                                        <input type="checkbox" disabled></input>
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            )
                            var CourseType="";
                           if(arr[i].month_course===true){
                            CourseType = "Monthly"
                           }else{
                            CourseType = "Yearly"
                           }

                           var start_date=moment(arr[i].start_date).format('DD MMM, YYYY')
                           var end_date=moment(arr[i].end_date).format('DD MMM, YYYY')

                            newarr[i] = createData(
                                arr[i]._id,
                                arr[i].fullName,
                                arr[i].email,
                                CourseType,
                                start_date,
                                end_date,
                                date,
                            );
                        }
                        newarr.map((data1) => {
                            DataArray = [...DataArray, data1]
                        })
                        setdata(DataArray);
                    }

                } else {
                    console.log("error");
                }
            })
            .catch(function (err) {
                console.log(err, "erron api");
            });

    }
    const [userInfo, setUserInfo] = useState({});
    const [status, setStatus] = useState();
    var start_date = new Date(userInfo.start_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })
    var end_date = new Date(userInfo.end_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })
    function handlePopup(userID) {
        Services.getAdminUserById(userID)
            .then((response) => {

                if (response.data.status === 200) {
                    setStatus(response.data.data.status);
                    setUserInfo(response.data.data);
                }
            })
            .catch(function (err) {
                console.log(err, "erron api");
            });
    }

    const handleDelete = () => {

        Services.deleteAdminUser(selectedId)
            .then((response) => {
                if (response.status === 200) {

                    setdata(
                        data.filter((post) => {
                            return post._id !== selectedId;
                        })
                    );

                    swal("Success", response.data.message, "success");
                    document.querySelector(".modal-content").remove();
                    document.querySelector(".modal-backdrop").remove();
                    document.querySelector("#myModal4").classList.remove("in");
                    //   document.querySelector("#cancelappointment .btn-close").click();

                } else {
                    swal("Failed", response.data.message, "error");
                }
            })
            .catch(function (err) {
                swal("Failed", err.response.data.message, "error");
            });
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
                            <NavLinkHeader main_title="Dashboard" title1="Requested User List" />
                            <Table columns={columns} data={data} />
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL-BODY */}

            <div class="modal cstm-modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
                <div class="modal-dialog modal-dialog-centered cstm-modal-dialog-user" role="document">
                    <div class="modal-content">
                        <div class="modal-header cstm-modalheader">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title cstm-modal-title" id="myModalLabel2">View User</h4>
                        </div>
                        <div class="modal-body modal-contentbody">
                            <div className='topicinduction-main  userlisting-main'>
                                <div className='viewtopic-para2'>
                                    <h5>User Name</h5>
                                    <h6>{userInfo.fullName}</h6>
                                </div>
                                <div className='viewtopic-para3'>
                                    <h5>Email Address</h5>
                                    <h6>{userInfo.email}</h6>
                                </div>
                            </div>
                            <div className='topicinduction-main'>
                                <div className='viewtopic-para2'>
                                    <h5>Phone_No</h5>
                                    <h6>{userInfo.phone}</h6>
                                </div>
                                <div className='viewtopic-para3'>
                                    <h5>Status</h5>
                                    <h6 className='cstm-switch'><label className="switch">
                                        <input type="checkbox" checked={status} disabled></input>
                                        <span className="slider round"></span>
                                    </label>
                                    </h6>
                                </div>
                            </div>

                            <div className='topicinduction-main'>
                                <div className='viewtopic-para2'>
                                    <h5>Start Date</h5>
                                    <h6>{start_date}</h6>
                                </div>
                                <div className='viewtopic-para3'>
                                    <h5>End Date</h5>
                                    <h6>{end_date}</h6>
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
                                <h4>Are you sure to delete<br /> this User?</h4>
                            </div>
                            <div className='delete-btn'>
                                <button className='cstm-deletebtn' onClick={handleDelete}>Delete</button>
                                <button className='cstm-discardbtn'>Discard</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RequestedUserList;
