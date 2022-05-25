import React, {useState, useEffect} from 'react';
import { MDBCard, MDBCardBody, MDBValidation, MDBValidationItem, MDBInput, MDBTextArea, MDBBtn } from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import {toast} from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import {createTour, updateTour} from "../redux/features/tourSlice"

const initialState = {
    title: "",
    description: "",
    tags: []
}

const AddEditTour = () => {
    const [tourData, setTourData] = useState(initialState);
    const [tagErrMsg, setTagErrMsg] = useState(null)
    const {userTours, error, loading} = useSelector((state) => ({...state.tour}))
    const { user } = useSelector((state) => ({...state.auth}))
    const {title, description, tags} = tourData;
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(() => {
        if(id) {
            const singleTour = userTours.find((tour) => tour._id === id)
            console.log(singleTour);
            setTourData({...singleTour})
        }
    }, [id, userTours])

    useEffect(() => {
        error && toast.error(error)
    }, [error])


    const onInputChange = (e) => {
        let { name, value } = e.target;
        setTourData({ ...tourData, [name]: value })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!tags.length) {
            setTagErrMsg("Please add some tags for your tour")
        }
        if( title && description && tags) {
            const updatedTourData = {...tourData, name: user?.result?.name, }

            if(!id) {
                dispatch(createTour({ updatedTourData, navigate, toast}))
                handleClear();
            } else {
                dispatch(updateTour({ id, updatedTourData, navigate, toast }))
            }
        }
    }
    
    const handleAddTag = (tagToAdd) => {
        setTagErrMsg(null)
        setTourData({ ...tourData, tags: [...tourData.tags, tagToAdd]})
    }
    
    const handleDeleteTag = (deleteTag) => {
        setTourData({ ...tourData, tags: tourData.tags.filter((tag) => tag !== deleteTag)})
    }
    
    const handleClear = () => {
        setTourData({
            title: "",
            description: "",
            tags: []
        })
    }

    return (
        <div  style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }} className="container">
            <MDBCard alignment='center'>
                <h5>{id ? "Update Tour" : "Add Tour"}</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                        <div className='col-md-12' style={{margin: "8px 0px"}}>
                            <MDBValidationItem feedback='Please enter title' invalid>
                                <MDBInput label="Enter Title" type="text" value={title} name="title" onChange={onInputChange} required />
                            </MDBValidationItem>
                        </div>
                        <div className='col-md-12' style={{margin: "8px 0px"}}>
                            <MDBValidationItem feedback='Please enter description' invalid>
                                <MDBTextArea label="Enter Description" type="text" rows={4} value={description} name="description" onChange={onInputChange} required />
                            </MDBValidationItem>
                        </div>
                        <div className='col-md-12' style={{margin: "8px 0px"}}>
                            <ChipInput name="tags" variant='outlined' placeholder='Enter tags' fullWidth value={tags} onAdd={(tag) => handleAddTag(tag)} onDelete={(tag) => handleDeleteTag(tag)} />
                        </div>
                        {tagErrMsg && (
                            <div className='tagErrMsg'>{tagErrMsg}</div>
                        )}
                        <div className='d-flex justify-content-start' style={{margin: "8px 0px"}}>
                            <FileBase type="file" multiple={false} onDone={(({base64}) => setTourData({...tourData, imageFile: base64}))} />
                        </div>
                        <div className='col-12'>
                            <MDBBtn style={{width: "100%"}} disabled={loading}>{id ? "Update" : "Submit"}</MDBBtn>
                            <MDBBtn style={{width: "100%"}} className="mt-2" color="danger" onClick={handleClear}>Clear</MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}

export default AddEditTour