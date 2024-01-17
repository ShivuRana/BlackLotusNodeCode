import { React, useState, useEffect, useCallback, useMemo } from 'react';
import Star from "../../Images/Groupstart.png";
import moment from 'moment';
import authService from '../../Services/auth.service';
import Header from '../NavMenu/Header';
import Sidebar from '../NavMenu/Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';




const ViewModule = () => {
    const [showEditable, setEditable] = useState(false);
    const columns = [
        {
            name: 'ID',
            selector: '_id',
            sortable: true,
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Description',
            selector: 'description',
            sortable: true,
        },
        {
            name: 'Rating',
            selector: 'rating',
            sortable: true,
        },

        {
            name: 'Date',
            selector: 'createdAt',
        },
        {
            name: "Action",
            button: true,
            cell: () => (
                <>

                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal2">
                        <a href="#" class="cstm-eye">
                            <i class="fa fa-eye" aria-hidden="true"></i>
                        </a>
                    </button>
                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal3">
                        <a href="#" class="cstm-edit"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                    </button>
                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal4">

                        <a href="#" class="cstm-delete"><i class="fa fa-trash" aria-hidden="true"></i></a>
                    </button>
                </>
            )
        }
    ];

    const [showTopicListingData, setTopicListingData] = useState();
    const [showviewData, setviewData] = useState();
    const navigate = useNavigate();
    let location = useLocation();


    useEffect(() => {
        var displayApiInformation = location.state;
        
        setviewData(displayApiInformation)
        authService.GetAllTopicsById(displayApiInformation._id).then((response) => {
            if (response.data.status) {
                console.log(response.data.data, "view")
                setTopicListingData(response.data.data)
            }
        }).catch((e) => {
            console.log(e)
        })
    }, []);


    const backToMOdulePage = () => {
        navigate('/modules');
    }

    const deletePopupForTopicListing = (e) => {
        console.log(e.target.id)
    }

    const editPopupForTopicListing = (e) => {
        console.log(e.target.id)
        setEditable(true)
        console.log(showEditable)
    }



    return (
        <>
            <div className='wrapper dashboard-main'>
                <Header />
                <Sidebar />
                <div className='top-header-divider'></div>
                <div className='fullpage-layout'>

                    <div className='rightPanel'>
                        <div className='maintable'>

                            <button onClick={backToMOdulePage}>Back</button>
                            <div className='cstm-contentHeader cstm-headerBorder'>
                                <div className='cstm-header'>
                                    <h3>View Module</h3>
                                </div>
                            </div>

                            <div className='main-ViewTopicLayout'>
                                <div className='viewtopic-para'>
                                    <h5>Module Name</h5>
                                    <h6>{showviewData !== undefined && showviewData !== null ? showviewData.name : "-"}</h6>
                                </div>

                                <div className='viewtopic-para'>
                                    <h5>Description</h5>
                                    <h6>{showviewData !== undefined && showviewData !== null ? showviewData.description : "-"}</h6>
                                </div>

                            </div>




                            <div id="Dashboard" className="tab-pane active main-tab">
                                <div className='viewtopic-para'>
                                    <h5>Topic Listing</h5>
                                </div>
                                <div class="table-responsive bg-white rounded">
                                    <table class="table mb-0 table-center">
                                        <thead>
                                            <tr>

                                                <th className="border-bottom w-4">No.</th>
                                                <th className="border-bottom w-4">Topic Name</th>
                                                <th className="border-bottom w-4">Description</th>
                                                <th className="border-bottom w-4">Rating</th>
                                                <th className="border-bottom w-4">Date</th>
                                                <th className="border-bottom w-4">Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {showTopicListingData !== null && showTopicListingData !== undefined && showTopicListingData.length > 0 && showTopicListingData.map(item => {
                                                return (<tr>

                                                    <td>{item._id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td><img src={Star} alt="" />({item.rating} Ratings)</td>
                                                    <td>{moment(item.createdAt).format("DD MMMM, YYYY")}</td>

                                                    <td>
                                                        <button type="button" class="cstm-delete  fa fa-eye" data-toggle="modal" data-target="#myModal2" id={item._id} ></button>
                                                        <button type="button" class="cstm-edit fa fa-pencil" data-toggle="modal" data-target="#myModal3" id={item._id} onClick={editPopupForTopicListing}></button>
                                                        <button type="button" class="cstm-delete fa fa-trash" data-toggle="modal" data-target="#myModal4" id={item._id} onClick={deletePopupForTopicListing}></button>
                                                    </td>
                                                </tr>)
                                            })}
                                        </tbody>
                                    </table>
                                    {showTopicListingData !== undefined && showTopicListingData.length === 0 && <h4 className='center'>TOPICS NOT PRESENT !!</h4>}
                                    {/* <DataTable
                  // title="Employees"
                  columns={columns}
                  data={showTopicListingData}
                  pagination
                  highlightOnHover
                /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delet Popup Topic */}


                <div class="modal cstm-modal fade" id="myModal4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel4">
                    <div class="modal-dialog modal-dialog-centered cstm-delete-modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header cstm-modalheader">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title cstm-modal-title" id="myModalLabel4"></h4>
                            </div>
                            <div class="modal-body modal-contentbody">
                                <div className='delte-header'>
                                    <h4>Are you sure to delete<br /> this module?</h4>
                                </div>
                                <div className='delete-btn'>
                                    <button className='cstm-deletebtn'>Delete</button>
                                    <button className='cstm-discardbtn'>Discard</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



        </>

    )
}
export default ViewModule;
