import React, { useEffect, useState } from "react";
import { login } from "../../store/slices/usertokenSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../utils/axiosInstance";

const Login = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/product-list')
    }
}, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn(JSON.stringify(formData));
    console.log(res, "res")
    if (res && res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", 1);
        dispatch(login(res.token));
        setFormData({});
        navigate("/product-list")
    }
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-blue-50 ">
      <div className="w-auto md:min-w-[500px] p-7 rounded-2xl bg-white shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-5"> Log In</h1>
        <div className="text-base text-blue-600 font-medium text-center mb-5"> Don't Have an Account? <Link to={"/"} className="underline font-semibold"> Sign Up </Link></div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
          <label htmlFor="name">Email</label>
          <input
            type="text"
            placeholder="User Name"
            name="username"
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
          <button className="bg-blue-600 py-2 font-semibold text-white rounded-lg">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
