export const isValidEmail= (email) =>{
  const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export const validateRegister= (formData) =>{
  const errors= {};

  if (!formData.username.trim()){
    errors.username= "Username is required";
  }else if(
    formData.username.length<3|| formData.username.length>20
  ){
    errors.username= "Username must be 3-20 characters";
  }


  if(!formData.email.trim()){
    errors.email= "Email is required";
  }else if(!isValidEmail(formData.email)){
    errors.email = "Enter a valid email";
  }


  if(!formData.password){
    errors.password= "Password is required";
  } else if (formData.password.length<6) {
    errors.password ="Password must be at least 6 characters";
  }


  if(!formData.fullName.trim()){
    errors.fullName= "Full name is required";
  }else if(formData.fullName.trim().length<2){
    errors.fullName= "Full name must be at least 2 characters";
  }
  return errors;
};

export const validateLogin= (formData) =>{
  const errors = {};


  if(!formData.email.trim()){
    errors.email= "Email is required";
  }else if(!isValidEmail(formData.email)){
    errors.email= "Enter a valid email";
  }
  
  if(!formData.password){
    errors.password= "Password is required";
  }
  return errors;
};