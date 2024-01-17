import React, { useEffect, useState } from 'react';
import Header from '../NavMenu/Header';
import Sidebar from '../NavMenu/Sidebar';
import NavLinkHeader from '../NavMenu/NavLinkHeader';
import Services from '../../Services/auth.service';
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { Link, useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import loader from "../../Images/loder.gif";
import moment from "moment";



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
            initialState: { pageIndex: 0, pageSize: 20 }
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
        page,
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

    return (
        <>
            <div className='maintable'>
                <div className='cstm-contentHeader'>
                    <div className='cstm-header'>
                        <h3>Topics Listing</h3>
                    </div>
                    <div className='cstm-search-createbtn'>
                        <div className=''>
                            <Link
                                to="/add-topic"
                            >
                                <button type="button" class="cstm-btn1" data-toggle="modal" data-target="#myModal1">
                                    Create Topic
                                </button>
                            </Link>
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
                                        pgnumber !== pageCount && pageCount !== 1 && page.length !== 0 &&
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


const Index = () => {
    const history = useNavigate();

    const [selectedId, setselectedId] = useState();
    const [showCount, setCount] = useState(0);
    const [data, setdata] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [moduleData, setModuleData] = useState();
    const [selectedModule, setSelectedModule] = useState('');
    var moduleArr = [];
    var DataArray = [];

    const columns = [

        {
            Header: 'No',
            accessor: 'serial'
        },

        {
            Header: "Topic Name",
            accessor: "name"
        },
        {
            Header: "Description",
            accessor: "description"
        },
        {
            Header: "Rating",
            accessor: "rating"
        },
        {
            Header: "Date",
            accessor: "createdAt"
        },
        {
            Header: "Actions",

            Cell: (row) => {
                return (
                    <div>

                        {/* <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal2"
                            onClick={() => handlePopup(row.cell.row.original._id)
                            }>
                            <i class="fa fa-eye cstm-eye" aria-hidden="true"></i>

                        </button> */}

                        <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal3">
                            <Link to={"/view-topic/?id=" + row.cell.row.original._id} class="cstm-eye"><i class="fa fa-eye" aria-hidden="true"></i></Link>
                        </button>

                        <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal3">
                            <Link to={"/edit-topic/?id=" + row.cell.row.original._id} class="cstm-edit"><i class="fa fa-pencil" aria-hidden="true"></i></Link>
                        </button>

                        <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal4"
                            onClick={() => setselectedId(row.cell.row.original._id)}>
                            <i class="fa fa-trash cstm-delete" aria-hidden="true"></i>
                        </button>
                    </div>
                );
            },
        },

    ];


    function createData(_id, name, description, rating, createdAt, moduleId, action) {
        return {
            _id,
            name,
            description,
            rating,
            createdAt,
            moduleId,

        };
    }
    // No of Index 
    filterData.forEach((data_id, index) => { data_id.serial = index + 1; });

    function createDataModule(_id, name) {
        return {
            _id,
            name,
        };
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("token");
        !loggedInUser && history("/");

        var queryVar = {
            "month_type": true
        }
        Services.GetModuleListing(queryVar)
            .then((response) => {
                if (response.data.status === 200) {
                    var arr = response.data.data;
                    if (response.data.data.length > 0) {
                        var newarr = [];
                        for (var i = 0; i < arr.length; i++) {

                            newarr[i] = createDataModule(
                                arr[i]._id,
                                arr[i].name,
                            );
                        }
                        newarr.map((data1) => {
                            moduleArr = [...moduleArr, data1]
                        })
                        setModuleData(moduleArr);
                        TopicListing();
                    }
                } else {
                    console.log("error");
                }
            })
            .catch(function (err) {
                console.log(err, "erron api");
            });
        setCount(100)
    }, []);

    const TopicListing = () => {

        const queryVar = {
            "month_type": true
        }
        Services.getTopicListing(queryVar)
            .then((response) => {
                console.log(response, "res");
                if (response.data.status = true) {
                    var arr = response.data.data;
                    if (response.data.data.length > 0) {
                        var newarr = [];
                        for (var i = 0; i < arr.length; i++) {
                            var date = moment(arr[i].createdAt).format('DD MMM, YYYY')
                            newarr[i] = createData(
                                arr[i]._id,
                                arr[i].name,
                                arr[i].description,
                                arr[i].rating,
                                date,
                                arr[i].moduleId,
                            );
                        }
                        newarr.map((data1) => {
                            DataArray = [...DataArray, data1]
                        })
                        setdata(DataArray);
                        setFilterData(DataArray)
                    }
                } else {
                    console.log("error");
                }
            })
            .catch(function (err) {
                console.log(err, "erron api");
            });

    }
    const handleDelete = () => {
        var dataValue =
        {
            "id": selectedId,
            "month_type": true,
        }

        Services.deleteTopic(dataValue)
            .then((response) => {
                if (response.data.status === 200) {
                    setFilterData(response.data.data);
                    swal("Success", response.data.message, "success");
                    document.querySelector("#myModal4 .btn-close").click();
                    document.querySelector(".modal-content").remove();
                    document.querySelector(".modal-backdrop").remove();
                    document.querySelector("#myModal4").classList.remove("in");

                } else {
                    swal("Failed", response.data.message, "error");
                }
            })
            .catch(function (err) {
                swal("Failed", err.response.data.message, "error");
            });
    };

    const handleSelect = (e) => {
        e.preventDefault();
        setSelectedModule(e.target.value);
        if (e.target.value) {
            setFilterData(
                data.filter((topics) => {
                    return topics.moduleId === e.target.value;
                })
            );
        } else {
            setFilterData(data);
        }

    }
    return (
        <>
            <div className='wrapper dashboard-main'>
                <Header />
                <div className='top-header-divider'></div>
                <div className='fullpage-layout'>
                    <Sidebar />
                    <div className='rightPanel'>
                        <div className='right-panel-content'>
                            <NavLinkHeader
                                main_title="Dashboard"
                                title1="Month Long Course"
                                // title1_link="topic"
                                title2="Topics"
                                title2_link="topic"
                            />
                            <div class="dropdown">
                                <select
                                    value={selectedModule}
                                    onChange={handleSelect}
                                    className="cstm-moduldroupdown"
                                    name="search module"
                                >
                                    <option value="">Select Module</option>
                                    {moduleData && moduleData.map((module, index) => (
                                        <option value={module._id}>{module.name}</option>
                                    ))}
                                </select>
                            </div>
                            <Table columns={columns} data={filterData} moduleData={moduleData} />
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal cstm-modal fade" id="myModal4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel4">
                <div class="modal-dialog modal-dialog-centered cstm-delete-modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header cstm-modalheader">
                            <button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title cstm-modal-title" id="myModalLabel4"></h4>
                        </div>
                        <div class="modal-body modal-contentbody">
                            <div className='delte-header'>
                                <h4>Are you sure to delete<br /> this Topic?</h4>
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
export default Index;
