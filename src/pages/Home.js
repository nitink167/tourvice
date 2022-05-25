import React, { useEffect } from "react";
import {MDBCol, MDBRow, MDBTypography} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import { getTours, setCurrentPage } from "../redux/features/tourSlice";
import CardTour from "../components/CardTour";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination"

const Home = () => {
    const {tours, loading, currentPage, numberOfPages} = useSelector((state) => ({...state.tour}));
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getTours(currentPage))
    }, [currentPage, dispatch])

    if(loading) {
        return (
            <div style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "1000px",
                alignContent: "center"
            }}>
                <Spinner />
            </div>
        )
    }
    return (
        <div style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "1000px",
            alignContent: "center"
        }}>
            <MDBRow className="mt-5">
                {tours.length === 0 && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                        No Tours found
                    </MDBTypography>
                )}
                {tours && tours.map((tour, index) => (
                    <MDBCol md="4">
                        <div className="rows-cols-1 rows-cols-md-3 g-2">
                                <CardTour key={index} {...tour}/>
                        </div>
                    </MDBCol>     
                ))}
            </MDBRow>
            {tours.length > 0 && (
                <Pagination 
                    setCurrentPage={setCurrentPage}
                    numberOfPages={numberOfPages}
                    currentPage={currentPage}
                    dispatch={dispatch}
                />
            )}
        </div>
    )
}

export default Home