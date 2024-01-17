import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../NavMenu/Header';
import Sidebar from '../NavMenu/Sidebar';
import NavLinkHeader from '../NavMenu/NavLinkHeader';
import Services from '../../Services/auth.service';
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { Link, useNavigate } from 'react-router-dom';
import drag from "../../Images/drag.png";
import loaderImg from "../../Images/loder.gif";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import swal from "sweetalert";
import authService from '../../Services/auth.service';



const Tr = styled.tr`
    background-color: white;
    display: ${({ isDragging }) => (isDragging ? "table" : "")};
  `;


function Table({ columns, data, updateMyData,
    // removeRow,
    // addRow,
    // resetData,
    reorderData }) {
    // const [showLoader, setLoader] = useState(true);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoader(false);
    //     }, 1500)
    // }, [])
    const props = useTable(
        {
            columns,
            data,
            updateMyData,
            // removeRow,
            // addRow,
            reorderData,

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
    console.log(props, "props");
    // const [Data,setData]=useState(data);

    const handleDragEnd = result => {
        const { source, destination } = result;
        if (!destination) return;
        reorderData(source.index, destination.index);

        if (source.index === destination.index) {
            return;
        }

        //   let items = [...Data];
        //   const [removed] = items.splice(source.index, 1);
        //   items.splice(destination.index, 0, removed);

        //   setData([...items]);
        // reorderData(items);
        console.log(data, "data")

    };

    let firstRecord = pageIndex * pageSize + 1;
    let lastRecord = firstRecord + pageSize - 1;

    useEffect(() => {

        // console.log(globalFilter);
    }, [globalFilter]);

    const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
    const [showQuizinput, setQuizinput] = useState({
        quizName: ""
    });

    const [showQuizError, setQuizError] = useState({
        quizName: ""
    });

  
    // FOR UPDATE

    const validate = (values) => {
        if (!showQuizError.quizName) {
            showQuizError.quizName = "Enter Quiz name";
        }
        return showQuizError;
    };

    useEffect(() => {
        console.log(showQuizError);
        if (Object.keys(showQuizError).length === 0 && isSubmitQuiz) {
            console.log(showQuizError);
        }
    }, []);

    // FOR UPDATE


    

    const handlequiz = (e) => {
        const { name, value } = e.target
        setQuizinput({ ...showQuizinput, [name]: value })

        switch (name) {
            case 'quizName':
                showQuizError.quizName = value.length > 0 ? "" : "Enter Quiz name";
                break;
        }
        setQuizError(showQuizError)
    }

    // FOR UPDATE

    const handleAddQuizButton = (e) => {
        e.preventDefault();
        setQuizError(validate(showQuizinput));
        setIsSubmitQuiz(true);

        if (showQuizinput.quizName !== "") {
            var data = {
                quizName: showQuizinput.quizName,
            }

            console.log(data)
            authService.CreateQuiz("", data).then((response) => {
                console.log(response, "Create Quiz")
                if (response.data.status) {
                    console.log("Quiz created..")
                    window.location.reload()
                }
            }).catch((e) => {
                console.log(e)
            })
        }

    }
    


    return (
        <>

            <div className='maintable'>
                <div className='cstm-contentHeader'>
                    <div className='cstm-header'>
                        <h3>Quiz Listing</h3>
                    </div>
                    <div className='cstm-search-createbtn'>
                        <div className='serachbox searchbox-2'>
                            <i class="fa fa-search" aria-hidden="true"></i>
                            <input name="search-user" id="search-user" value={globalFilter || ""} onChange={e => setGlobalFilter(e.target.value)} type="text" class="cstm-input-seacrh" placeholder="Search User" />
                        </div>
                        <div class="create-quiz">
                            <button type="button" class="cstm-btn1" data-toggle="modal" data-target="#myModal1-AddQuiz">Create Quiz </button>

                        </div>
                    </div>

                </div>
                <div id="Dashboard" className="main-tab">
                    <div class="table-responsive bg-white rounded">


                        <table class="table mb-0 table-center cstm-table" {...getTableProps()}>
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
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="tbody">
                                    {(provided, snapshot) => (
                                        <tbody ref={provided.innerRef} {...provided.droppableProps} >
                                            {page.map((row, i) => {
                                                prepareRow(row);
                                                return (
                                                    <Draggable
                                                        draggableId={row.original._id}
                                                        key={row.original._id}
                                                        index={row.index}
                                                    >
                                                        {(provided, snapshot) => {
                                                            return (
                                                                <Tr className="cstm-Tabledesign cstm-usertable-design"
                                                                    {...row.getRowProps()}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    ref={provided.innerRef}
                                                                    isDragging={snapshot.isDragging}
                                                                >
                                                                    {row.cells.map(cell => (
                                                                        <td {...cell.getCellProps()}>
                                                                            {cell.render("Cell", {
                                                                                dragHandleProps: provided.dragHandleProps,
                                                                                isSomethingDragging: snapshot.isDraggingOver
                                                                            })}
                                                                        </td>
                                                                    ))}
                                                                </Tr>
                                                            );
                                                        }}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                        </tbody>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </table>
                        {page.length === 0 &&
                            <div className="NoRecord-cstm">No record found!</div>
                        }
                    </div>
                </div>
            </div>
            <div class="modal cstm-modal fade" id="myModal1-AddQuiz" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header cstm-modalheader">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title cstm-modal-title" id="myModalLabel1">Add New Quiz</h4>
                        </div>
                        <div class="modal-body modal-contentbody">
                            <form>
                                <div className='col-12 cstm-ModalField main-modalfield'>
                                    <label>Quiz Name</label><br />
                                    <input type="text" name='quizName' id='quizName' placeholder='Enter quiz name' onChange={handlequiz}></input>
                                    <span class="moduleError">{showQuizError.quizName}</span>
                                </div>
                                <div className='col-12 modal-addbtn'>
                                    <button type='button' className='cstm-btn1' onClick={handleAddQuizButton}>Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
}

const UpDownArrow = props => (
    <span
        {...props.dragHandleProps}
        className='testClass'
        aria-label="move"
        role="img"
    >
        <img src={drag} />    </span>
);

const StyledUpDownArrow = styled(UpDownArrow)`
    position: absolute;
    top: -15px;
    left: -50px;
    padding: 15px;
    display: none;
    tr:hover & {
      display: ${({ isSomethingDragging }) =>
        isSomethingDragging ? "none" : "inline"};
    }
  `;


const Quizs = () => {
    const { page } = useParams();


    const history = useNavigate();

    const [selectedId, setselectedId] = useState();

    const Description = styled.span`
    display: flex;
    align-items: center;
    position: relative;
  `;
    const columns = React.useMemo(() => {
        const DescriptionCell = props => {
            return (
                <Description>
                    <StyledUpDownArrow {...props} />
                </Description>
            );
        };

        return [
            {
                Header: 'Reorder',
                Cell: DescriptionCell

            },
            {
                Header: 'No',
                accessor: 'serial'
            },
            {
                Header: "Quiz Name",
                accessor: "quizName"
            },
            {
                Header: "Topic Name",
                accessor: "topicName"
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

                            {/* <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModalQuizView2" onClick={() => handleViewPopupQuiz(row.cell.row.original._id)}>
                                <i class="fa fa-eye cstm-eye" aria-hidden="true"></i>
                            </button> */}
                            <Link
                                to={"/quiz/view/?id=" + row.cell.row.original._id}
                                class="cstm-eye"
                                >
                                 <i class="fa fa-eye cstm-eye" aria-hidden="true"></i>
                            </Link>

                            <button type="button" class="cstm-icon-btn " data-toggle="modal" data-target="#myModalQuizEdit3" onClick={() => handleEditPopupQuiz(row.cell.row.original._id)}>
                                <i class="fa fa-pencil cstm-edit" aria-hidden="true" value={showDeleteQuizId}></i>
                            </button>

                            <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal4"
                                onClick={() => setselectedId(row.cell.row.original._id)}
                            >
                                <i class="fa fa-trash cstm-delete" aria-hidden="true"></i>
                            </button>

                        </div>
                    );
                },
            },

        ]
    }, []);

    function createData(_id, quizName, topicName, createdAt, action) {
        return {
            _id,
            quizName,
            topicName,
            createdAt,

        };
    }

    const [data, setdata] = useState([]);

    const updateMyData = (rowIndex, columnID, newValue) => {
        setdata(oldData =>
            // console.log(oldData,"olddata"),
            oldData.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...oldData[rowIndex],
                        [columnID]: newValue
                    };
                }
                return row;
            })
        );

        console.log(data, "datataaaa update")

    };



    const reorderData = (startIndex, endIndex) => {
        const newData = [...data];
        const [movedRow] = newData.splice(startIndex, 1);
        newData.splice(endIndex, 0, movedRow);
        setdata(newData);
    };

    data.forEach((data_id, index) => { data_id.serial = index + 1; });
    data.forEach((data_id, index) => { data_id.null = "-"; });

    var DataArray = [];
    useEffect((data, e) => {
        const loggedInUser = localStorage.getItem("token");
        !loggedInUser && history("/");

        getData();

    }, []);

    const getData = () => {


        authService.GetQuizListing("").then((response) => {
            console.log(response, "res");
            if (response.data.status = true) {
                var arr = response.data.data;
                if (response.data.data.length > 0) {
                    var newarr = [];
                    for (var i = 0; i < arr.length; i++) {
                        newarr[i] = createData(
                            arr[i]._id,
                            arr[i].quizName,
                            arr[i].topicName !== undefined && arr[i].topicName !== null ? arr[i].topicName : "-",
                            arr[i].createdAt !== undefined ? new Date(arr[i].createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "numeric", year: "numeric", }) : "",
                        )
                    }
                    
                    newarr.map((data1) => {
                        DataArray = [...DataArray, data1]
                    })

                    console.log(newarr, "newarr");

                    setdata(DataArray);

                }

                console.log(data, "users data");
            } else {
                console.log("error");
            }
        })
            .catch(function (err) {
                console.log(err, "erron api");
            });

    }
    const [showDeleteQuizId, setDeleteQuizId] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [userInfo2, setUserInfo2] = useState({});
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
    
    const [isSubmitQuizUpdated, setIsSubmitQuizUpdated] = useState(false);
    const [showQuizErrorUpdated, setQuizErrorUpdated] = useState({
        quizNameUpdated: ""
    });
    const [showQuizinputUpdated, setQuizinputUpdated] = useState({
        quizNameUpdated: ""
    });
    const [loader,setLoader] = useState(false);

    function handleViewPopupQuiz(userID) {
        console.log(userID)
        authService.GetQuizListingById(userID).then((response) => {
            console.log(response, "response");
            if (response.data.status) {
                console.log();
                setStatus(response.data.data.status);
                setUserInfo(response.data.data);
            }
        }).catch(function (err) {
            console.log(err, "erron api");
        });
    }
   
    useEffect(() => {
        console.log(showQuizErrorUpdated);
        if (Object.keys(showQuizErrorUpdated).length === 0 && isSubmitQuizUpdated) {
            console.log(showQuizErrorUpdated);
            console.lof(Object.keys(showQuizErrorUpdated).length === 0 && isSubmitQuizUpdated)
        }
    }, []);

    const validateupdated = (values) => {
        if (!showQuizErrorUpdated.quizNameUpdated) {
            showQuizErrorUpdated.quizNameUpdated = "Enter Quiz name";
        }
        return showQuizErrorUpdated;
    };

    useEffect(() => {
        var newGetEditedData = {
            quizNameUpdated: userInfo2.quizName,
        }
        setQuizinputUpdated(newGetEditedData)
    }, [userInfo2]);

 


    const handlequizUpdated = (e) => {
        const { name, value } = e.target
        setQuizinputUpdated({ ...showQuizinputUpdated, [name]: value })

        switch (name) {
            case 'quizNameUpdated':
                showQuizErrorUpdated.quizNameUpdated = value.length > 0 ? "" : "Enter Quiz name";
                break;
        }
        setQuizErrorUpdated(showQuizErrorUpdated)


    console.log(showQuizinputUpdated,"showQuizinputUpdated");
    }

    function handleUpdateQuizButton(e){
        e.preventDefault();        
        setQuizErrorUpdated(validateupdated(showQuizinputUpdated));
        // setIsSubmitQuizUpdated(true);

        if (showQuizinputUpdated.quizNameUpdated !== "") {
            var data = {
                quizName: showQuizinputUpdated.quizNameUpdated,
                quizId  :e.target.value
            }
            console.log(data)
            authService.updateQuizListingById(data).then((response) => {
                console.log(response,'response');
                if (response.data.status === 200) {
                    document.querySelector(".modal-content").remove();
                    document.querySelector(".modal-backdrop").remove();
                    document.querySelector("#myModalQuizEdit3").classList.remove("in");
                    getData();
                    swal("Success", response.data.message, "success");
                }else{
                    swal("Failed", response.data.message, "error");
                }
            }).catch((e) => {
                swal("Failed", e.response.data.message, "error");
                console.log(e,'eeee')
            })
        }
    }
    function handleEditPopupQuiz(userID) {
        setDeleteQuizId(userID)
        console.log(userID)
        authService.GetQuizListingById(userID).then((response) => {
            console.log(response, "response");
            if (response.data.status) {
                console.log();
                setStatus(response.data.data.status);
                setUserInfo2(response.data.data);
            }
        }).catch(function (err) {
            console.log(err, "erron api");
        });
       
    }

    const handleDelete = () => {
        setLoader(true);
        Services.deleteQuizById(selectedId)
            .then((response) => {
                // return false;
                if (response.status === 200) {

                    setLoader(false);
                    setdata(
                        data.filter((post) => {
                            return post._id !== selectedId;
                        })
                    );

                    swal("Success", response.data.message, "success");
                    document.querySelector(".modal-content").remove();
                    document.querySelector(".modal-backdrop").remove();
                    document.querySelector("#myModal4").classList.remove("in");

                } else {
                    swal("Failed", response.data.message, "error");
                }
            })
            .catch(function (err) {
                setLoader(false);
                swal("Failed", err.response.data.message, "error");
            });
    };

    const handleDiscard = () =>{
        document.querySelector(".modal-content").remove();
        document.querySelector(".modal-backdrop").remove();
        document.querySelector("#myModal4").classList.remove("in");
    }



    return (<>
        <div className='wrapper dashboard-main'>
            <Header />
            <div className='top-header-divider'></div>
            <div className='fullpage-layout'>
                <Sidebar />
                <div className='rightPanel'>
                    <div className='right-panel-content'>
                        {/* <NavLinkHeader main_title="Dashboard" title1="User List" /> */}
                        <Table
                            columns={columns}
                            data={data}
                            updateMyData={updateMyData}
                            reorderData={reorderData}
                        />
                    </div>
                </div>

            </div>
        </div>
        <div class="modal cstm-modal fade" id="myModalQuizView2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header cstm-modalheader">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title cstm-modal-title" id="myModalLabel3">View Quiz</h4>
                    </div>
                    <div class="modal-body modal-contentbody">
                        <form>
                            <div className='col-12 cstm-ModalField main-modalfield'>
                                <label>Quiz Name</label><br />
                                <input type="text" placeholder={userInfo.quizName !== undefined && userInfo.quizName !== null ? userInfo.quizName : "-"} value={userInfo.quizName !== undefined && userInfo.quizName !== null ? userInfo.quizName : "-"} readOnly></input>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
        {/* Edit Quiz Model Popup */}
        <div class="modal cstm-modal fade" id="myModalQuizEdit3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header cstm-modalheader">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title cstm-modal-title" id="myModalLabel3">Edit Quiz</h4>
                    </div>
                    <div class="modal-body modal-contentbody">
                        <form>
                            <div className='col-12 cstm-ModalField main-modalfield'>
                                <label>Quiz Name</label><br />
                                <input type="text" name="quizNameUpdated" id="quizNameUpdated" onChange={handlequizUpdated} value={showQuizinputUpdated.quizNameUpdated} >
                                </input>
                                <span className='moduleError'>{showQuizErrorUpdated.quizNameUpdated}</span>
                            </div>
                            <div className='col-12 modal-addbtn'>                            
                                <button type='button' className='cstm-btn1' value={showDeleteQuizId} onClick={handleUpdateQuizButton} >Update</button>
                            </div>
                        </form>
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
                                <h4>Are you sure to delete<br /> this Quiz?</h4>
                            </div>
                            <div className='delete-btn'>
                                <button className='cstm-deletebtn' onClick={handleDelete}>Delete</button>
                                {loader && ( <div id="login-loader" className='loader-main'> <img src={loaderImg}  /></div>) }
                                <button className='cstm-discardbtn' onClick={handleDiscard}>Discard</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           

    </>)
}


export default Quizs