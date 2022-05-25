import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production"

const {REACT_APP_DEV_API, REACT_APP_PROD_API} = process.env

const API = axios.create({
    baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
  });

console.log(devEnv);
console.log(REACT_APP_DEV_API);
console.log(REACT_APP_PROD_API);
console.log(API);

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`
    }
    return req
})

export const signIn = (formData) => API.post("/user/signin", formData)
export const signUp = (formData) => API.post("/user/signup", formData)

export const createTour = (tourData) => API.post("/tour/createTour", tourData)
export const getTours = (page) => API.get(`tour/getTours?page=${page}`)
export const getTour = (id) => API.get(`/tour/${id}`) //id => Tour ID
export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`) //id => User ID
export const deleteTour = (id) => API.delete(`/tour/${id}`) //id => Tour ID
export const updateTour = (updatedTourData, id) => API.patch(`/tour/${id}`, updatedTourData) //id => Tour ID

export const getToursBySearch = (searchQuery) => API.get(`/tour/search/query?searchQuery=${searchQuery}`)
export const getToursByTag = (tag) => API.get(`/tour/tag/${tag}`)
export const getRelatedTours = (tags) => API.post(`/tour/relatedTours/tags`, tags)
export const likeTour = (id) => API.patch(`/tour/like/${id}`)
