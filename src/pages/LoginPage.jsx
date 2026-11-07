import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { validateLogin } from "../utils/validation";
function LoginPage(){
const { login }= useAuth();
const navigate= useNavigate();
const [formData,setFormData]= useState({
  email: "",
  password: ""
});
const [errors,setErrors]= useState({});
const [serverError,setServerError]= useState("");

const handleChange= (event)=>{
  const {name,value}= event.target;
  setFormData((previous)=>({
    ...previous,
    [name]:value
  }));
  const validationErrors= validateLogin({
    ...formData,
    [name]:value
  });
  setErrors(validationErrors);
};
const handleSubmit = async (event) => {
  event.preventDefault();

const validationErrors = validateLogin(formData);
setErrors(validationErrors);

if(Object.keys(validationErrors).length>0){
   return;
  }
  try{
    await login(formData);
    navigate("/dashboard");
  } catch(error){
    setServerError(error.message);
  }
};

return (
  <div className="min-h-screen flex items-center justify-center">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-6"
    >
      <h1 className="text-2xl font-bold">
        Login
      </h1>

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      {errors.email && (
        <p>{errors.email}</p>
      )}

      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />

      {errors.password && (
        <p>{errors.password}</p>
      )}

      {serverError && (
        <p>{serverError}</p>
      )}

      <button type="submit">
        Login
      </button>

      <Link to="/register">
        Create an account
      </Link>
    </form>
  </div>
);
}

export default LoginPage;