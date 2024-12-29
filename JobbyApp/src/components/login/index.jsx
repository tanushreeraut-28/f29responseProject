
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import './index.css';



const Login = ()=>{

   const [allvalues,setValues] =  useState({
        username : "",
        password : "",
        errorMsg :""
   });

   const token = Cookies.get("jwtToken");

   console.log(token);

   
  const navigate = useNavigate();
   

  const onSubmitUserData = async (e)=>{

    e.preventDefault();

    const api = "https://apis.ccbp.in/login";

    const userDetails = {
          username: allvalues.username,
          password: allvalues.password
    }

    const options = {
         method : "Post",
         body : JSON.stringify(userDetails)
    }

    try{
        const response = await fetch(api,options);
        const data = await response.json();
        
        if(response.ok === true){
          setValues({...allvalues,errorMsg : ""});

          Cookies.set("jwtToken",data.jwt_token);

          navigate("/");
        }
        else{
          setValues({...allvalues,errorMsg : data.error_msg});
        }


    }catch(error){
        console.log(error);
    }



  }


  useEffect(()=>{
    if( token !== undefined){
        navigate("/");
    }
},[]);

   





    return(
       <div className='login-cont'>

  <form onSubmit={onSubmitUserData} className='border border-primary p-3 rounded' style={{width : "28%"}} >
  <div className="form-group">
    <label htmlFor="exampleInputEmail1"> Username </label>
    <input type="text" onChange={(e)=>{setValues({...allvalues,username : e.target.value})}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" onChange={(e)=>{setValues({...allvalues,password : e.target.value})}}  className="form-control" id="exampleInputPassword1"/>
  </div>

  <button type="submit" className="btn btn-primary btn-block"> Login </button>

  <br/>
  <p className='text-danger'>{allvalues.errorMsg}</p>
  </form>

       </div>

    )


}

export default Login;