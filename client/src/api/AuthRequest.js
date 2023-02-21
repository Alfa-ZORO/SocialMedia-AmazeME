import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

export const logIn = (formData) => API.post("/login", formData);

export const googleUser = (formData) => API.post("/google", formData);

export const signUp = (formData) => API.post("/register", formData);

export const otpVerify = (userId,otp)=> API.post("/otpverify",{userId,otp})

export const resendOtp = (userId,userEmail) => API.post('/resendOtp',{userId,userEmail})


export const AdminLogIn = (formData) => API.post("/admin/adminlogin", formData);

export const AdminSignUp = (formData) => API.post("/admin/adminregister", formData);

export const changePassword =(userId,newPassword)=> API.post('/changePassword',{userId,newPassword})

