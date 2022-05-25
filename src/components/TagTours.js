import React, { useEffect } from "react";
import { MDBCard, MDBCardTitle, MDBCardBody, MDBCardText, MDBCardImage, MDBRow, MDBCol, MDBBtn, MDBCardGroup } from "mdb-react-ui-kit"
import {useNavigate, useParams} from "react-router";
import Spinner from "../components/Spinner";
import {useDispatch, useSelector} from "react-redux";
import {getToursByTag} from "../redux/features/tourSlice";
import {excerpt} from "../utility/index"

const TagTours = () => {

    const {tagTours, loading} = useSelector((state) => ({...state.tour}))

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {tag} = useParams()

    useEffect(() => {
        dispatch(getToursByTag(tag))
    }, [tag, dispatch])

    if(loading) {
        return <Spinner />
    }

    return (
        <div style={{
            margin: "auto",
            padding: "120px",
            maxWidth: "900px",
            alignContent: "center",
        }}>
            <h3 className="text-center">Tours with tag: #{tag}</h3>
            <hr style={{maxWidth: "570px"}} />
            {tagTours && tagTours.map((tour, index) => (
                <MDBCardGroup key={index}>
                    <MDBCard style={{maxWidth: "570px"}} className="mt-2">
                        <MDBRow className="g-0">
                            <MDBCol md='4'>
                                <MDBCardImage className="rounded" src={tour.imageFile} alt={tour.title} fluid />

                            </MDBCol>
                            <MDBCol md='8'>
                                <MDBCardBody>
                                    <MDBCardTitle className="text-start">
                                        {tour.title}
                                    </MDBCardTitle>
                                    <MDBCardText className="text-start">
                                        {excerpt(tour.description, 40)}
                                    </MDBCardText>
                                    <div style={{float: "left", marginTop: "-10px"}}>
                                        <MDBBtn size="sm" rounded color="info" onClick={() => navigate(`/tour/${tour._id}`)}>
                                            Read More..
                                        </MDBBtn>
                                    </div>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCardGroup>
            ))}
        </div>
    )
}

export default TagTours