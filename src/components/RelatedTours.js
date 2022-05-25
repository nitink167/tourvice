import React from "react";
import {MDBRow, MDBCol, MDBCard, MDBCardTitle, MDBCardBody, MDBCardImage, MDBCardText} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import {excerpt, capitalize} from "../utility/index";

const RelatedTours = ({relatedTours, tourId}) => {
    return (
        <>
            {relatedTours && relatedTours.length > 0 && (
                <>
                    {relatedTours.length > 1 && <h2>Related Tours</h2>}
                    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                        {relatedTours.filter((item) => item._id !== tourId).splice(0, 3).map(tour => (
                            <MDBCol>
                                <MDBCard>
                                    <Link to={`/tour/${tour._id}`}>
                                        <MDBCardImage src={tour.imageFile} alt={tour.title} position="top" />
                                    </Link>
                                    <span className="text-start tag-card">
                                        {item.tags.map((tag) => (
                                            <Link to={`/tours/tag/${tag}`}>
                                                #{tag}
                                            </Link>
                                        ))}
                                    </span>
                                    <MDBCardBody>
                                        <MDBCardTitle className="text-start">
                                            {item.title}
                                        </MDBCardTitle>
                                        <MDBCardTitle className="text-start">
                                            {excerpt(item.description)}
                                        </MDBCardTitle>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        ))}
                    </MDBRow>
                    
                </>
            )}
        </>
    )
}

export default RelatedTours