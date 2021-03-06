import React from "react";
import {MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import {excerpt, capitalize} from "../utility/index";
// import {useSelector, useDispatch} from "react-redux";

const CardTour = ({imageFile, description, title, tags, _id, name, likes}) => {

    // const {user} = useSelector((state) => ({...state.auth}))
    // const userId = user?.result?._id
    // const dispatch = useDispatch()

    // const Likes = () => {
    //     if (likes.length > 0) {
    //       return likes.find((like) => like === userId) ? (
    //         <>
    //           <MDBIcon fas icon="thumbs-up" />
    //           &nbsp;
    //           {likes.length > 2 ? (
    //             <MDBTooltip
    //               tag="a"
    //               title={`You and ${likes.length - 1} other people likes`}
    //             >
    //               {likes.length} Likes
    //             </MDBTooltip>
    //           ) : (
    //             `${likes.length} Like${likes.length > 1 ? "s" : ""}`
    //           )}
    //         </>
    //       ) : (
    //         <>
    //           <MDBIcon far icon="thumbs-up" />
    //           &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
    //         </>
    //       );
    //     }
    //     return (
    //       <>
    //         <MDBIcon far icon="thumbs-up" />
    //         &nbsp;Like
    //       </>
    //     );
    //   };

    // const handleLike = () => {
    //     dispatch(likeTour({_id}))
    // }

    return (
            <MDBCard className="h-100 mt-2 d-sm-flex" style={{maxWidth: "20rem"}}>
                <MDBCardImage src={imageFile} alt={title} position="top" style={{maxWidth: "100%", height: "180px"}} />
                <div className="top-left text-start">
                    {capitalize(name)}
                </div>
                <span className="text-start tag-card">
                    {tags.map((tag, i) => (
                        <Link to={`/tours/tag/${tag}`}> #{tag} </Link>
                    ))}
                    {/* <MDBBtn style={{float: "right"}} tag="a" color="none" onClick={handleLike}>
                        <Likes />
                    </MDBBtn> */}
                </span>
                <MDBCardBody>
                    <MDBCardTitle className="text-start">
                        {title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                        {excerpt(description, 40)}
                    </MDBCardText>
                    <Link to={`/tour/${_id}`}  className="text-start">
                        Read More
                    </Link>
                </MDBCardBody>
            </MDBCard>
    )
}

export default CardTour