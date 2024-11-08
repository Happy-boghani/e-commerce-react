import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;


export const signUp = async (payload) => {
    try {
        const data  = await axiosInstance.post('/users', payload);
        if(data && data.status === 200){
            toast.success("Sign Up successfully.")
            return  data.data;
        }
    } catch (error) {
        console.log(error, "error")
        toast.error(error.message)
        return error;

    }
}

export const signIn = async (payload) => {
    try {
        const data  = await axiosInstance.post('/auth/login', payload);
        if(data && data.status === 200){
            toast.success("LOG In successfully.")
            return  data.data;
        }
    } catch (error) {
        console.log(error, "error")
        toast.error(error.message)
        return error;

    }
}

export const getProducts = async (perPage) => {
    try {
        const data  = await axiosInstance.get(`/products?&limit=${perPage}`);
        if(data && data.status === 200){
            return  data.data;
        }
    } catch (error) {
        console.log(error, "error")
        toast.error(error.message)
        return error;

    }
}

export const getCategories = async () => {
    try {
        const data  = await axiosInstance.get(`/products/categories`);
        if(data && data.status === 200){
            return  data.data;
        }
    } catch (error) {
        console.log(error, "error")
        toast.error(error.message)
        return error;

    }
}

export const getSingleProducts = async (id) => {
    try {
        const data  = await axiosInstance.get(`/products/${id}`);
        if(data && data.status === 200){
            return  data.data;
        }
    } catch (error) {
        console.log(error, "error")
        toast.error(error.message)
        return error;

    }
}

export const addToCart = async (payload) => {
    try {
        const data  = await axiosInstance.post(`/carts`, payload);
        if(data && data.status === 200){
           toast.success("Product add into Cart.")
           return data.data
        }
    } catch (error) {
        console.log(error, "error")
        toast.error(error.message)
        return error;

    }
}
export const updateCart = async (payload) => {
    try {
        const data  = await axiosInstance.put(`/carts`, payload);
        if(data && data.status === 200){
        //    toast.success("Product add into Cart.")
        }
    } catch (error) {
        console.log(error, "error")
        toast.error(error.message)
        return error;

    }
}

export const getUsersCart = async () => {
    try {
        const data  = await axiosInstance.get(`/carts/user/1`);
        if(data && data.status === 200){
          return data.data
        }
    } catch (error) {
        console.log(error, "error")
        toast.error(error.message)
        return error;

    }
}