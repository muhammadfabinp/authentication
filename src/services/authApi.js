import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000"
});

export const getUserByEmail= async (email)=>{
    const response= await api.get(`/users?email=${email}`)
    return response.data 
}

export const getUserById= async (id)=>{
    const response= await api.get(`/users/${id}`)
    return response.data
}

export const createUser= async (userData)=>{
  const response= await api.post("/users",userData);
  return response.data;
};

export const getUserByUsername= async (username)=>{
  const response= await api.get(`/users?username=${username}`);
  return response.data;
};
