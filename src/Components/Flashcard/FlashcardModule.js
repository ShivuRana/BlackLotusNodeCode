import { Navigate, NavLink, useParams } from 'react-router-dom';
import React, { useEffect, useState, useMemo } from 'react';
import Header from '../NavMenu/Header';
import Sidebar from '../NavMenu/Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../../Services/auth.service';
import Pagination from './Pagination';


let PageSize = 25;

const FlashcardModule = () => {







    const [currentPage, setCurrentPage] = useState(1);
    const [FlashcardListing, setFlashcardListing] = useState();
    const [showDeleteid, setDeleteid] = useState();
    const [query, setQuery] = useState("");

    const navigate = useNavigate();
    let location = useLocation();



    useEffect(() => {

        AuthService.GetFlashcardListing().then((response) => {
            if (response.data.status) {
                console.log(response.data.data, "Flashcard Listing..")
                setFlashcardListing(response.data.data)
            }
        }).catch((e) => {
            console.log(e)
        })
    }, []);


    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return FlashcardListing !== undefined && FlashcardListing.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    const handleCreateFlashcard = () => {
        navigate('/add-flashcard');
    }


    const HandleViewFalshaard = (e) => {
        console.log(e.target.id, "view")
        navigate('/view-flashcard', { state: e.target.id })


    }
    const HandleEditFalshaard = (e) => {
        console.log(e.target.id, "edit")
        navigate('/edit-flashcard', { state: e.target.id })
    }
    const HandleDeleteFalshaard = (e) => {
        console.log(e.target.id, "delete")
        setDeleteid(e.target.id)

    }

    const deleteFlashCard = () => {
        console.log(showDeleteid, "delete 2")
        AuthService.DeleteFlashcardByID(showDeleteid).then((response) => {
            if (response.data.status) {
                window.location.reload()
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    const [search, setSearch] = React.useState('');

    const handleSearch = (event) => {
        setSearch(event.target.value);

    };

    var data = FlashcardListing !== undefined && FlashcardListing.filter((item) =>
        item.question.includes(search)
    )

    console.log(data)
    // setFlashcardListing(data)


    return (
        <>

            <div className='wrapper dashboard-main'>
                <Header />
                <div className='top-header-divider'></div>
                <div className='fullpage-layout'>
                    <Sidebar />
                    <div className='rightPanel'>
                        <div className='right-panel-content'>
                            <div className='maintable'>
                                <div className='cstm-contentHeader'>
                                    <div className='cstm-header'>
                                        <h3>Flashcard Listing</h3>
                                    </div>
                                    <div className='cstm-search-createbtn'>
                                        <div className=''>
                                            <button type="button" class="cstm-btn1" data-toggle="modal" data-target="#myModal1" onClick={handleCreateFlashcard}>
                                                Create Flachcard
                                            </button>
                                        </div>
                                        <input id="search" type="text" onChange={handleSearch} />


                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive bg-white rounded">
                                <table class="table mb-0 table-center">
                                    <thead>
                                        <tr>

                                            <th className="border-bottom w-1">No.</th>
                                            <th className="border-bottom w-4">Question</th>
                                            <th className="border-bottom w-4">Topic Name </th>
                                            <th className="border-bottom w-4">Type </th>
                                            <th className="border-bottom w-4">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentTableData !== null && currentTableData !== undefined && currentTableData.length > 0 && currentTableData.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1} </td>
                                                    <td>{item.question !== "" && item.question !== undefined && item.question !== null ? item.question : "-"}</td>
                                                    <td>{item.topic_name !== "" && item.topic_name !== undefined && item.topic_name !== null ? item.topic_name : "-"}</td>
                                                    <td>{item.topic_type !== "" && item.topic_type !== undefined && item.topic_type !== null ? item.topic_type : "-"}</td>
                                                    <td>
                                                        <button type="button" class="cstm-delete  fa fa-eye" data-toggle="modal" data-target="#myModal2" id={item._id} onClick={HandleViewFalshaard}></button>
                                                        <button type="button" class="cstm-edit fa fa-pencil" data-toggle="modal" data-target="#myModal3" id={item._id} onClick={HandleEditFalshaard}></button>
                                                        {item.question_type === "question" && <button type="button" class="cstm-delete fa fa-trash" data-toggle="modal" data-target="#myModalDeleteFlashcard" id={item._id} onClick={HandleDeleteFalshaard} ></button>}

                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                {FlashcardListing !== undefined && FlashcardListing.length === 0 && <h4 className='center'>TOPICS NOT PRESENT !!</h4>}
                            </div>
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={FlashcardListing !== undefined && FlashcardListing.length}
                                pageSize={PageSize}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal cstm-modal fade" id="myModalDeleteFlashcard" tabindex="-1" role="dialog" aria-labelledby="myModalLabel4">
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
                                <button className='cstm-deletebtn' value={showDeleteid} onClick={deleteFlashCard}>Delete</button>
                                <button className='cstm-discardbtn' data-dismiss="modal" aria-label="Close">Discard</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>




        </>
    )
}
export default FlashcardModule;
