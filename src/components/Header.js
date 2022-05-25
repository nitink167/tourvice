import React, {useState} from 'react';
import {MDBNavbar, MDBContainer, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBNavbarToggler, MDBCollapse, MDBNavbarBrand} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from 'react-redux';
import {setLogout} from "../redux/features/authSlice"
import { searchTour } from '../redux/features/tourSlice';
import { useNavigate } from 'react-router-dom';
import { capitalize } from '../utility';
import decode from "jwt-decode"

const Header = () => {
    const [show, setShow] = useState(false);
    const {user} = useSelector((state) => ({...state.auth}));
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = user?.token;

    if(token) {
        const decodedToken = decode(token);
        if(decodedToken.exp * 1000 < new Date().getTime()) {
            dispatch(setLogout())
        }
    }

    const handleLogout = () => {
        dispatch(setLogout())
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(search) {
            dispatch(searchTour(search))
            navigate(`/tours/search?searchQuery=${search}`)
            setSearch("")
            console.log("Navigating to ", search);
        } else {
            navigate("/")
        }
    }

    return (
        <MDBNavbar fixed='top' expand="lg" style={{backgroundColor: "#f0e6ea"}}>
            <MDBContainer>
                <MDBNavbarBrand href="/" style={{color: "#606000", fontWeight: "600", fontSize: "22px"}}>
                    TOURVICE *
                </MDBNavbarBrand>
                <MDBNavbarToggler type="button" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setShow(!show)} style={{color: "#606080"}}>
                    <MDBIcon icon="bars" />
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                        { user?.result?._id && (
                            <h5 style={{ marginRight:"30px", marginTop: "27px"}}>
                                Logged in as: {capitalize(user.result.name)}
                            </h5>
                        )}
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/">
                                <p className='header-text'>Home</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        { user?.result?._id && (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/addTour">
                                        <p className='header-text'>Add Tour</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/dashboard">
                                        <p className='header-text'>Dashboard</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        )}
                        {user?.result?._id ? (
                             <MDBNavbarItem>
                                <MDBNavbarLink href="/login">
                                    <p className='header-text' onClick={handleLogout}>Log out</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        ) : (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/login">
                                        <p className='header-text'>Login</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/register">
                                        <p className='header-text'>Register</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        )}
                       
                        
                    </MDBNavbarNav>
                    <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
                        <div style={{marginTop: "5px", marginLeft:"5px", marginRight:"5px"}}>
                            <MDBIcon fas icon="search" /> 
                        </div> 
                        <input type="text" className='form-control' placeholder="Search Tour" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </form>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    )
}

export default Header