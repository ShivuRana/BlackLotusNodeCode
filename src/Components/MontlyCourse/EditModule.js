import { React, useState, useEffect, useCallback, useMemo } from 'react';
import drag from "../../Images/drag.png";
import Star from "../../Images/Groupstart.png";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import TableRow from "./TableRow";
import styled from "styled-components";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "./arrayMove";
import { useLocation, useNavigate } from 'react-router-dom';
import authService from '../../Services/auth.service';
import Header from '../NavMenu/Header';
import Sidebar from '../NavMenu/Sidebar';
import { Checkmark } from 'react-checkmark'

const MyTableWrapper = styled.div`
  padding: 10px;

  .fixed_header {
    width: 800px;
    table-layout: fixed;
    border-collapse: collapse;

    & > tbody {
      display: block;
      width: 807px;
      overflow: auto;
      height: 400px;
      cursor: grabbing;
      background: grey;
    }

    & > thead {
      background: yellow;
      color: black;

      & > tr {
        display: block;
        //width: 793px;
      }
    }

    & > thead th,
    & > tbody td {
      padding: 5px;
      text-align: left;
      width: 200px;
      border: 1px solid #000;
    }
  }
`;

const SortableCont2 = SortableContainer(({ children }) => {
    return <tbody>{children}</tbody>;
});

const SortableItem = SortableElement(props => <TableRow {...props} />);

const EditModule = () => {

    const [showpopup, setpopup] = useState(false);
    const [showSuccessMessage, setSuccessMessage] = useState();
    const [showTopicListingData, setTopicListingData] = useState();
    const [showviewData, setviewData] = useState();

    const navigate = useNavigate();
    let location = useLocation();


    const [isSubmitUpdateForm, setIsSubmitUpdateForm] = useState(false);

    const [moduleUpdatedinput, setModuleUpdatedinput] = useState({
        moduleNameUpdate: "",
        moduleDescriptionUpdate: "",
    });

    const [showerrorUpdate, setErrorUpdate] = useState({
        moduleNameUpdate: "",
        moduleDescriptionUpdate: "",
    });


    const [showEditable, setEditable] = useState(false);


    useEffect(() => {
        var displayApiInformation = location.state;
        // console.log(displayApiInformation)

        var newGetEditedData = {
            moduleNameUpdate: displayApiInformation.name,
            moduleDescriptionUpdate: displayApiInformation.description, // dispplay the Api Data in editable field
        }
        setModuleUpdatedinput(newGetEditedData)

        setviewData(displayApiInformation)

        authService.GetAllTopicsById(displayApiInformation._id).then((response) => {
            if (response.data.status) {
                // console.log(response.data.data, "GetAllTopics for Edit")
                if (response.data.data !== null) {
                    const numAscending = response.data.data.sort((a, b) => a.order - b.order);

                    // console.log(response.data.data, "GetAllTopics for Edit")
                    setTopicListingData(numAscending)

                } else {
                }
            }
        }).catch((e) => {
            console.log(e)
        })

    }, []);



    useEffect(() => {
        console.log(showerrorUpdate);
        if (Object.keys(showerrorUpdate).length === 0 && isSubmitUpdateForm) {
            console.log(moduleUpdatedinput);
        }
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

    const handleCreateModuleInput = (e) => {
        const { name, value } = e.target
        setModuleUpdatedinput({ ...moduleUpdatedinput, [name]: value })
        switch (name) {
            case 'moduleNameUpdate':
                showerrorUpdate.moduleNameUpdate = value.length > 0 ? "" : "Enter module name";
                break;

            case 'moduleDescriptionUpdate':
                showerrorUpdate.moduleDescriptionUpdate = value.length > 0 ? "" : "Enter module description";
                break;
        }
        setErrorUpdate(showerrorUpdate)


    }

    const validate = (values) => {
        if (!moduleUpdatedinput.moduleNameUpdate) {
            showerrorUpdate.moduleNameUpdate = "Enter module name";
        }
        if (!moduleUpdatedinput.moduleDescriptionUpdate) {
            showerrorUpdate.moduleDescriptionUpdate = "Enter module description";
        }
        return showerrorUpdate;
    };



    const handleUpdateModule = (e) => {
        e.preventDefault();
        setErrorUpdate(validate(moduleUpdatedinput));
        setIsSubmitUpdateForm(true);

        if (moduleUpdatedinput.moduleNameUpdate !== "" && moduleUpdatedinput.moduleDescriptionUpdate !== "") {
            var data = {
                name: moduleUpdatedinput.moduleNameUpdate,
                description: moduleUpdatedinput.moduleDescriptionUpdate,
            }
            console.log(data)
            console.log(showviewData._id, "ID")
            authService.EditModule(showviewData._id, data).then((response) => {
                if (response.data.status) {
                    console.log("module Updates..")
                    setSuccessMessage(response.data.message)
                    // window.location.reload()
                }

            }).catch((e) => {
                console.log(e)
            })
        }

    }

    const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
        setTopicListingData(oldItems => arrayMove(oldItems, oldIndex, newIndex));
    }, []);

    // console.log(showTopicListingData !== undefined && showTopicListingData,"Table Data")

    const handlesavebuttonEditForm = () => {
        setpopup(true)
        console.log(showpopup, "showpopup")
        var displayApiInformation = location.state;
        var arr = [];
        const filtered = showTopicListingData !== undefined && showTopicListingData.filter((employee) => {
            return arr.push({ id: employee._id })
        });
        var arr2 = { topics: arr, moduleId: displayApiInformation._id };
        authService.TopicReorders("", arr2).then((response) => {
            if (response.data.status) {
                const numAscending = response.data.data.sort((a, b) => a.order - b.order);
                setTopicListingData(numAscending)
            }
        }).catch((e) => {
            console.log(e)
        })
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
                                    <h3>Edit Module</h3>
                                </div>
                            </div>

                            <div className='col-12 cstm-ModalField main-modalfield'>
                                <label>Module Name</label><br />
                                <input type="text" name='moduleNameUpdate' id='moduleNameUpdate'
                                    onChange={handleCreateModuleInput}
                                    value={moduleUpdatedinput.moduleNameUpdate}></input>
                                <span className='moduleError'>{showerrorUpdate.moduleNameUpdate}</span>
                            </div>
                            <div className='col-12 cstm-ModalField'>
                                <label>Module Description</label><br />
                                <textarea type="text" name='moduleDescriptionUpdate' id='moduleDescriptionUpdate' onChange={handleCreateModuleInput} value={moduleUpdatedinput.moduleDescriptionUpdate}></textarea>
                                <span className='moduleError'>{showerrorUpdate.moduleDescriptionUpdate}</span>
                            </div>

                            <button type="button" class="cstm-btn1" onClick={handleUpdateModule}>Update Module</button>
                            <hr />
                            <br />
                            <span className='moduleError sucesss-message'>{showSuccessMessage}</span>


                            <div id="Dashboard" className="tab-pane active main-tab">
                                <div className='viewtopic-para'>
                                    <h5>Topic Listing</h5>
                                </div>
                                {showTopicListingData !== undefined && showTopicListingData !== null && showTopicListingData.length > 0 && <>
                                    <button type="button" class="cstm-btn1" onClick={handlesavebuttonEditForm} data-toggle="modal" data-target="#myModaledit" >Save</button>
                                    {showpopup && <>
                                        <div class="modal cstm-modal fade" id="myModaledit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header cstm-modalheader">
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                        <Checkmark size='75px' color='#223344' />
                                                        <h4 class="modal-title-center cstm-modal-title">Chanages Saved...</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    }</>}

                                <div class="table-responsive bg-white rounded">
                                    {/* <table class="table mb-0 table-center">
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
                                        
                                        <tr>
                                            <td>{showTopicListingData !== undefined && showTopicListingData._id}</td>
                                            <td>{showTopicListingData !== undefined && showTopicListingData.name}</td>
                                            <td>{showTopicListingData !== undefined && showTopicListingData.description}</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>
                                                <button type="button" class="cstm-delete  fa fa-eye" data-toggle="modal" data-target="#myModal2" ></button>
                                                <button type="button" class="cstm-edit fa fa-pencil" data-toggle="modal" data-target="#myModal3" onClick={editPopupForTopicListing}></button>
                                                <button type="button" class="cstm-delete fa fa-trash" data-toggle="modal" data-target="#myModal4" onClick={deletePopupForTopicListing}></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> */}

                                    <MyTableWrapper>
                                        <table class="table mb-0 table-center">
                                            <thead>
                                                <tr>
                                                    <th className="border-bottom w-4">No.</th>
                                                    <th className="border-bottom w-15">Topic Name</th>
                                                    <th className="border-bottom w-27">Description </th>
                                                    <th className="border-bottom w-15">Rating </th>
                                                    <th className="border-bottom w-15">Date </th>
                                                    <th class="border-bottom w-10">Action </th>
                                                </tr>
                                            </thead>
                                            <SortableCont2
                                                onSortEnd={onSortEnd}
                                                axis="y"
                                                lockAxis="y"
                                                lockToContainerEdges={true}
                                                lockOffset={["30%", "50%"]}
                                                useDragHandle={true}
                                            >
                                                {showTopicListingData !== undefined && showTopicListingData !== null && showTopicListingData.map((iteam, index) => (
                                                    <>
                                                        <SortableItem
                                                            rowid={iteam._id}
                                                            key={`iteam-${index}`}
                                                            index={index}
                                                            second={iteam.name}
                                                            first={iteam.topic_type}
                                                            third={iteam.description}
                                                            
                                                            fourth={iteam.rating}
                                                            fifth={moment(iteam.createAt).format('DD MMM, YYYY')}
                                                             // February 13th 2021, 1:49:03 am

                                                        />
                                                    </>
                                                ))}

                                            </SortableCont2>
                                        </table>
                                    </MyTableWrapper>
                                </div>
                                {showTopicListingData !== undefined && showTopicListingData.length === 0 &&
                                    <h4 className='center'>TOPICS NOT PRESENT !!</h4>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}
export default EditModule;
