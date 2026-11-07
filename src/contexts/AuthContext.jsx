
import {  createContext,useContext,useEffect,useState } from "react";
import { getUserByEmail,getUserById,getUserByUsername,createUser } from "../services/authApi";


const AuthContext= createContext()
const AuthProvider= ({children})=>{
const [user,setUser]= useState(null);
const [isLoading,setIsLoading]= useState(true)
const fetchCurrentUser= async ()=>{
  const userId = localStorage.getItem("userId");
  if(!userId){
    setUser(null);
    setIsLoading(false);
    return;
  }
  try {
    const currentUser= await getUserById(userId);
    setUser(currentUser);
  }catch(error){
    localStorage.removeItem("userId");
    setUser(null);
  }finally{
    setIsLoading(false);
  }
};

const login= async (credentials)=>{
  const users= await getUserByEmail(credentials.email);
  if(users.length===0){
    throw new Error("Invalid email or password");
  }
  const foundUser= users[0];
  if(foundUser.password!==credentials.password){
    throw new Error("Invalid email or password");
  }
  localStorage.setItem("userId",foundUser.id);
  setUser(foundUser);
  return foundUser;
}

const logout= ()=>{
  localStorage.removeItem("userId");
  setUser(null);
}

const isAuthenticated= ()=>{
  return !!user;
}

const checkUsername=async (username)=>{
  const users= await getUserByUsername(username);
  return users.length === 0;
};

const register= async (userData)=>{
 const existingUsers = await getUserByUsername(userData.username);
  if(existingUsers.length>0) {
    throw new Error("Username already exists");
  }
  const newUser= await createUser({
    ...userData,
    createdAt: new Date().toISOString()
  });

  localStorage.setItem("userId", newUser.id);

  setUser(newUser);

  return newUser;
};

useEffect(() =>{
  fetchCurrentUser();
},[]);

return (

    <AuthContext.Provider value={{user,isLoading,login,register,logout,isAuthenticated,fetchCurrentUser,checkUsername}}>
        {children}
    </AuthContext.Provider>
)

}

export const useAuth=() => {
  return useContext(AuthContext);
};

export default AuthProvider;
