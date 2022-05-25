import React, {useEffect} from "react";
import {MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import moment from "moment";
import {getTour} from "../redux/features/tourSlice";
import {capitalize} from "../utility/index"

const SingleTour = () => {
    const dispatch = useDispatch();
    const {tour} = useSelector((state) => ({...state.tour}));
    const {id} = useParams()

    const tags = tour?.tags;
    useEffect(() => {
        // tags && dispatch(getRelatedTours({tags}))
    }, [tags])

    useEffect(() => {
        if(id) {
            dispatch(getTour(id))
        }
    }, [id, dispatch])

    return (
        <MDBContainer>
            <MDBCard className="mb-3 mt-2">
                <MDBCardImage position="top" style={{width:"100%", maxHeight: "600px"}} src={tour?.imageFile} alt={tour?.title} />
                <MDBCardBody>
                    <h3>{tour?.title}</h3>
                    <span>
                        <p className="text-start tourName">
                            Created By: {tour.name && capitalize(tour.name)}
                        </p>
                    </span>
                    <div style={{float: "left"}}>
                        <span className="text-start">
                            {tour && tour.tags && tour?.tags.map((tag, index) => `#${tag} `)}
                        </span>
                    </div>
                    <br />
                    <MDBCardText className="text-start mt-2">
                        <MDBIcon style={{float: "left", margin: "5px"}} fas icon="calendar" size="lg" />
                        <small className="text-muted">
                            {moment(tour?.createdAt).fromNow()}
                        </small>    
                    </MDBCardText>
                    <MDBCardText className="lead mb-0 text-start"> 
                        {tour?.description}
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    )
}

export default SingleTour