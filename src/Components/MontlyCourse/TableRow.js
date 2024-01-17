import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { SortableHandle } from "react-sortable-hoc";
import styled from "styled-components";
import drag from "../../Images/drag.png";
import authService from "../../Services/auth.service";
import { Link } from 'react-router-dom';




const TrWrapper = styled.tr`
  cursor: default;

  .firstElement {
    display: flex;
    flex-direction: row;
  }

  &.helperContainerClass {
    width: auto;
    border: 1px solid #efefef;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 3px;

    &:active {
      cursor: grabbing;
    }

    & > td {
      padding: 5px;
      text-align: left;
      width: 200px;
    }
  }
 `;

const Handle = styled.div`
  margin-right: 10px;
  padding: 0 5px;
  cursor: grab;
`;

const RowHandler = SortableHandle(() => <Handle className="handle">
  <img src={drag} />
</Handle>);

const TableRow = ({ rowid, first, second, third, fourth, fifth, className }) => {
  const navigate = useNavigate();
  
  // const [isSubmitUpdateForm, setIsSubmitUpdateForm] = useState(false);
  // const [moduleUpdatedinput, setModuleUpdatedinput] = useState({
  //   moduleNameUpdate: "",
  //   moduleDescriptionUpdate: "",
  // });

  // const [showerrorUpdate, setErrorUpdate] = useState({
  //   moduleNameUpdate: "",
  //   moduleDescriptionUpdate: "",
  // });

  const [showFlag, setFlag] = useState(false);
  const [showDeleteid, setDeleteid] = useState();
  const [showEditid, setEditid] = useState();
  const [showViewid, setViewid] = useState();
  const [showModuleDataGetById, setModuleDataGetById] = useState([]);




  // const handleUpdateModuleInput = (e) => {
  //   const { name, value } = e.target
  //   setModuleUpdatedinput({ ...moduleUpdatedinput, [name]: value })
  //   switch (name) {
  //     case 'moduleNameUpdate':
  //       showerrorUpdate.moduleNameUpdate = value.length > 0 ? "" : "Enter module name";
  //       break;

  //     case 'moduleDescriptionUpdate':
  //       showerrorUpdate.moduleDescriptionUpdate = value.length > 0 ? "" : "Enter module description";
  //       break;
  //   }
  //   setErrorUpdate(showerrorUpdate)
  // }

  const viewRecordHandle = (e) => {
    console.log(e.target.id, "View")
    setViewid(e.target.id)
    authService.ViewModule(e.target.id).then((response) => {
      if (response.data.status) {
        setModuleDataGetById(response.data.data)
        navigate('/view-module', { state: response.data.data });
      }
    }).catch((e) => {
      console.log(e)
    })

  }

  function editRecordHandle(e) {
    setEditid(e.target.id)
    authService.ViewModule(e.target.id).then((response) => {
      if (response.data.status) {
        setModuleDataGetById(response.data.data)
        navigate('/edit-module', { state: response.data.data });
      }
    }).catch((e) => {
      console.log(e)
    })
  }


  const deleteRecordHandle = (e) => {
    e.preventDefault();
    setDeleteid(e.target.value)
    setFlag(true)
    console.log(e.target.value,"delete 1")      
  }


  const handlePopupDeleteButton = () => {
    console.log(showDeleteid,"delete 2")
      authService.Deletemodule(showDeleteid).then((response) => {
      console.log(response, "Deletemodule")
      if (response.data.status) {
        console.log("module Deleted..")
        window.location.reload()
      }
      else if (response.data.status === false) {
        window.location.reload()
      }
    }).catch((e) => {
      console.log(e)
    })                    
  }

  // const validate = (values) => {
  //   if (!moduleUpdatedinput.moduleNameUpdate) {
  //     showerrorUpdate.moduleNameUpdate = "Enter module name";
  //   }
  //   if (!moduleUpdatedinput.moduleDescriptionUpdate) {
  //     showerrorUpdate.moduleDescriptionUpdate = "Enter module description";
  //   }
  //   return showerrorUpdate;
  // };

  // useEffect(() => {
  //   if (Object.keys(showerrorUpdate).length === 0 && isSubmitUpdateForm) {
  //     console.log(moduleUpdatedinput);
  //   }
  // }, []);



  // const handleUpdateModuleButton = (e) => {
  //   e.preventDefault();
  //   setErrorUpdate(validate(moduleUpdatedinput));
  //   setIsSubmitUpdateForm(true);

  //   if (moduleUpdatedinput.moduleNameUpdate !== "" && moduleUpdatedinput.moduleDescriptionUpdate !== "") {
  //     var data = {
  //       name: moduleUpdatedinput.moduleNameUpdate,
  //       description: moduleUpdatedinput.moduleDescriptionUpdate,
  //     }
  //     console.log(data)
  //     console.log(showEditid, "For Api Used")
  //     authService.EditModule(showEditid, data).then((response) => {
  //       if (response.data.status) {
  //         console.log("module Updates..")
  //         window.location.reload()
  //       }
  //     }).catch((e) => {
  //       console.log(e)
  //     })
  //   }

  // }

  return (<>
    <TrWrapper>
      <td><div className="firstElement"><RowHandler />{first}</div></td>
      <td>{second}</td>
      <td>{third}</td>
      <td>{fourth}</td>
      <td>{fifth}</td>
      <td key={rowid}>
        {/* <button type="button" class="cstm-delete  fa fa-eye" data-toggle="modal" data-target="#myModal2" id={rowid} onClick={viewRecordHandle}></button> */}
        <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal2" onClick={viewRecordHandle}>
                            <Link to={"/view-topic/?id=" + rowid} class="cstm-eye"><i class="fa fa-eye" aria-hidden="true"></i></Link>
                        </button>
        <button type="button" class="cstm-edit fa fa-pencil" data-toggle="modal" data-target="#myModal3" id={rowid} onClick={editRecordHandle}></button>
        <button type="button" class="cstm-delete fa fa-trash" data-toggle="modal" data-target="#myModal4" id={rowid} value={rowid} onClick={deleteRecordHandle}></button>
      </td>
    </TrWrapper>

    {/* Delete Popup */}
    {showFlag && <>
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
              <button className='cstm-deletebtn' value={showDeleteid} onClick={handlePopupDeleteButton}>Delete</button>
              <button className='cstm-discardbtn' data-dismiss="modal">Discard</button>

            </div>
          </div>

        </div>
      </div>
    </div></>}

    {/* update module */}
    {/* <div class="modal cstm-modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header cstm-modalheader">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title cstm-modal-title" id="myModalLabel3">Edit Module</h4>
          </div>
          <div class="modal-body modal-contentbody">
            <form>
              <div className='col-12 cstm-ModalField main-modalfield'>
                <label>Module Name</label><br />
                <input type="text" name="moduleNameUpdate" id="moduleNameUpdate" placeholder='Enter module name' onChange={handleUpdateModuleInput} value={moduleUpdatedinput.moduleNameUpdate} />
                <span className='moduleError'>{showerrorUpdate.moduleNameUpdate}</span>
              </div>
              <div className='col-12 cstm-ModalField'>
                <label>Module Description</label><br />
                <textarea type="text" name="moduleDescriptionUpdate" id="moduleDescriptionUpdate" placeholder='Write description' onChange={handleUpdateModuleInput} value={moduleUpdatedinput.moduleDescriptionUpdate}></textarea>
                <span className='moduleError'>{showerrorUpdate.moduleDescriptionUpdate}</span>
              </div>
              <div className='col-12 modal-addbtn'>
                <button className='cstm-btn1' onClick={handleUpdateModuleButton}>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div> */}
    {/* view Module */}

    {/* <div class="modal cstm-modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header cstm-modalheader">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title cstm-modal-title" id="myModalLabel2">View Module</h4>
          </div>
          <div class="modal-body modal-contentbody">
            <h4>Module Name</h4>
            <h6>{showModuleDataGetById !== null && showModuleDataGetById !== undefined && showModuleDataGetById.name}</h6>            
            <h5 className='modal-desc'>Module Description</h5>
            <p>
              {showModuleDataGetById !== null && showModuleDataGetById !== undefined && showModuleDataGetById.description}
            </p>
          </div>

        </div>
      </div>
    </div> */}

  </>

  );
};

export default TableRow;
