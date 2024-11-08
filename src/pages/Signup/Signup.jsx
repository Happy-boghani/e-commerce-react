import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  signIn, signUp } from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/usertokenSlice";

const Signup = () => {


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");


  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  useEffect(() => {
      if(localStorage.getItem('token')){
        navigate('/product-list')
      }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
      const res =  await signUp(formData)
      dispatch(login(res));
      if (res){
        setFormData({})
        navigate('/login')
      }
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-blue-50 ">
      <div className="w-auto md:min-w-[500px] p-7 rounded-2xl bg-white shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-5">Sign Up</h1>
        <div className="text-base text-blue-600 font-medium text-center mb-5"> Already Have an Account? <Link to={"/login"} className="underline font-semibold"> Login </Link></div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
     
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="p-2 border-2 border-gray-300 rounded-lg mb-3 "
            required
          />
         
           <label htmlFor="name">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="p-2 border-2 border-gray-300 rounded-lg mb-3"
            required
          />
           <label htmlFor="name">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="p-2 border-2 border-gray-300 rounded-lg mb-3"
            required
          />
           <><label htmlFor="name">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            className="p-2 border-2 border-gray-300 rounded-lg mb-3"
            required
          /> {error && <p className="text-red-500">{error}</p>}</>

          <button className="bg-blue-600 py-2 font-semibold text-white rounded-lg">Sign Up</button>
        </form>

      </div>
    </div>
  );
};

export default Signup;
