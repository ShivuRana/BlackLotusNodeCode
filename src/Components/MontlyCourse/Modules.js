import { React, useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import TableRow from "./TableRow";
import styled from "styled-components";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from './arrayMove';
import authService from '../../Services/auth.service';
import Sidebar from '../NavMenu/Sidebar';
import Header from '../NavMenu/Header';
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

const SortableCont = SortableContainer(({ children }) => {
    return <tbody>{children}</tbody>;
});

const SortableItem = SortableElement(props => <TableRow {...props} />);

const Modules = () => {
    const [search, setSearch] = useState('');

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const [showpopup, setpopup] = useState(false);

    const [isSubmit, setIsSubmit] = useState(false);
    const [moduleinput, setModuleinput] = useState({
        moduleName: "",
        moduleDescription: "",
        moduleMonthType: "",
        date: date,
    });
    const [showerror, setError] = useState({
        moduleName: "",
        moduleDescription: "",
        moduleMonthType: "",
    });

    const [ShowtableData, setTableData] = useState();
    useEffect(() => {
        var data = { "month_type": true }
        authService.GetModuleListing(data).then((response) => {
            console.log(response, "GetModuleListing")
            if (response.data.status) {
                const numAscending = response.data.data.sort((a, b) => a.order - b.order);
                setTableData(numAscending)
                return false
            }
        }).catch((e) => {
            console.log(e)
        })

    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };
    // const data = {
    //     nodes: ShowtableData !== undefined && ShowtableData.filter((item) =>
    //       item.name.includes(search)
    //     ),
    //   };

    const handlesavebutton = () => {
        setpopup(true)
        var arr = [];
        const filtered = ShowtableData !== undefined && ShowtableData.filter((employee) => {
            return arr.push({ id: employee._id })
        });
        var arr2 = { modules: arr, month_type: true };
        authService.ReorderModules("", arr2).then((response) => {
            if (response.data.status) {
                setTableData(response.data.data)
                console.log("ReorderModules listing..")
            }

        }).catch((e) => {
            console.log(e)
        })
    }

    const handleCreateModuleInput = (e) => {
        const { name, value } = e.target
        setModuleinput({ ...moduleinput, [name]: value })
        switch (name) {
            case 'moduleName':
                showerror.moduleName = value.length > 0 ? "" : "Enter module name";
                break;

            case 'moduleDescription':
                showerror.moduleDescription = value.length > 0 ? "" : "Enter module description";
                break;
        }
        setError(showerror)
    }

    const validate = (values) => {
        if (!moduleinput.moduleName) {
            showerror.moduleName = "Enter module name";
        }
        if (!moduleinput.moduleDescription) {
            showerror.moduleDescription = "Enter module description";
        }
        return showerror;
    };

    useEffect(() => {
        console.log(showerror);
        if (Object.keys(showerror).length === 0 && isSubmit) {
            console.log(moduleinput);
        }
    }, []);

    const handleAddModule = (e) => {
        e.preventDefault();
        setError(validate(moduleinput));
        setIsSubmit(true);

        if (moduleinput.moduleName !== "" && moduleinput.moduleDescription !== "") {
            var data = {
                name: moduleinput.moduleName,
                description: moduleinput.moduleDescription,
                month_type: true,

            }
            console.log(data)
            authService.Createmodule(data).then((response) => {
                console.log(response, "Createmodule")
                if (response.data.status) {
                    console.log("module created..")
                    window.location.reload()
                }
            }).catch((e) => {
                console.log(e)
            })
        }

    }

    const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
        setTableData(oldItems => arrayMove(oldItems, oldIndex, newIndex));
    }, []);


    return (
        <>
            <div className='wrapper dashboard-main'>
                <Header />
                <Sidebar />
                <div className='top-header-divider'></div>
                <div className='fullpage-layout'>
                    <div className='rightPanel'>
                        <div className='right-panel-content'>

                            <div className='maintable'>
                                <div className='cstm-contentHeader'>
                                    <div className='cstm-header'>
                                        <h3>Modules Listing</h3>
                                    </div>
                                    <div className='cstm-search-createbtn'>
                                        <div className='serachbox'>
                                            <i class="fa fa-search" aria-hidden="true"></i>
                                            <input type="text" placeholder='Search' id="search" name='search' onChange={handleSearch}></input>
                                        </div>                                        
                                        {ShowtableData !== undefined && ShowtableData !== null &&
                                            <>
                                                <div className='serachbox'>
                                                    <button type="button" class="cstm-btn1" onClick={handlesavebutton} data-toggle="modal" data-target="#myModalsave">Save</button>
                                                </div>
                                                {showpopup &&
                                                    <>
                                                        <div class="modal cstm-modal fade" id="myModalsave" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel1">
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
                                                }
                                            </>
                                        }

                                        <div className=''>
                                            <button type="button" class="cstm-btn1" data-toggle="modal" data-target="#myModal1">
                                                Create Module
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div id="Dashboard" className="tab-pane active main-tab">
                                    <div class="table-responsive bg-white rounded">
                                        {/* <MyTableWrapper>
                                            <table class="table mb-0 table-center" >
                                                <tr>
                                                    <th className="border-bottom w-2"> &nbsp;</th>
                                                    <th className="border-bottom w-4">No.</th>
                                                    <th className="border-bottom w-15">Module Name</th>
                                                    <th className="border-bottom w-27">Description </th>
                                                    <th className="border-bottom w-15">Date </th>
                                                    <th class="border-bottom w-10">Action </th>
                                                </tr>
                                                {ShowtableData !== undefined && ShowtableData.map((iteam, index) => {
                                                    return (<>
                                                        <SortableCont
                                                            onSortEnd={onSortEnd}
                                                            axis="y"
                                                            lockAxis="y"
                                                            lockToContainerEdges={true}
                                                            lockOffset={["30%", "50%"]}
                                                            useDragHandle={true}>
                                                            <SortableItem
                                                                key={`iteam-${index}`}
                                                                index={index}>
                                                                <tr key={iteam._id}>
                                                                    <td><img src={drag} for={"pl" + index} id={iteam._id} /></td>
                                                                    <td>{iteam.sr_no !== undefined && iteam.sr_no}</td>
                                                                    <td>{iteam.name !== undefined && iteam.name}</td>
                                                                    <td>{iteam.description !== undefined && iteam.description}</td>
                                                                    <td>{iteam.createdAt !== undefined && moment(iteam.createdAt).format("DD/MM/YYYY")}</td>
                                                                    <td>
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
                                                                    </td>
                                                                </tr>
                                                            </SortableItem>
                                                        </SortableCont>
                                                    </>)
                                                })}
                                            </table>
                                        </MyTableWrapper> */}

                                        <MyTableWrapper>
                                            <table class="table mb-0 table-center">
                                                <thead>
                                                    <tr>
                                                        <th className="border-bottom w-1">No.</th>
                                                        <th className="border-bottom w-15">Module Name</th>
                                                        <th className="border-bottom w-20">Description </th>
                                                        <th className="border-bottom w-5">Date </th>
                                                        <th class="border-bottom w-20hi">Action </th>
                                                    </tr>
                                                </thead>
                                                <SortableCont
                                                    onSortEnd={onSortEnd}
                                                    axis="y"
                                                    lockAxis="y"
                                                    lockToContainerEdges={true}
                                                    lockOffset={["30%", "50%"]}
                                                    useDragHandle={true}
                                                >
                                                    {ShowtableData !== undefined && ShowtableData !== null && ShowtableData.map((iteam, index) => (
                                                        <>
                                                            <SortableItem
                                                                rowid={iteam._id}
                                                                key={`iteam-${index}`}
                                                                index={index}
                                                                // first={iteam.sr_no}
                                                                second={iteam.name !== undefined && iteam.name !== null ? iteam.name : "-"}
                                                                third={iteam.description !== undefined && iteam.description !== null ? iteam.description : "-"}
                                                                fourth={iteam.createdAt !== undefined && iteam.createdAt !== null ? moment(iteam.createdAt).format("DD/MM/YYYY") : "-"}
                                                            />
                                                        </>
                                                    ))}
                                                </SortableCont>
                                            </table>
                                        </MyTableWrapper>
                                        {ShowtableData !== undefined && ShowtableData.length === 0 &&
                                            <h4 className='center'>RECORDS NOT PRESENT !!</h4>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* MODAL-BODY */}

            <div class="modal cstm-modal fade" id="myModal1" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel1">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header cstm-modalheader">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title cstm-modal-title" id="myModalLabel1">Add New Module</h4>
                        </div>
                        <div class="modal-body modal-contentbody">
                            <form>
                                <div className='col-12 cstm-ModalField main-modalfield'>
                                    <label>Module Name</label><br />
                                    <input type="text" name='moduleName' id='moduleName' placeholder='Enter module name' onChange={handleCreateModuleInput}></input>
                                    <span className='moduleError'>{showerror.moduleName}</span>
                                </div>
                                <div className='col-12 cstm-ModalField'>
                                    <label>Module Description</label><br />
                                    <textarea type="text" name='moduleDescription' id='moduleDescription' placeholder='Write description' onChange={handleCreateModuleInput}></textarea>
                                    <span className='moduleError'>{showerror.moduleDescription}</span>
                                </div>

                                <div className='col-12 modal-addbtn'>
                                    <button className='cstm-btn1' onClick={handleAddModule}>Add</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>



        </>
    )
}
export default Modules;
