import React from 'react';
import { useHistory } from 'react-router-dom';
import Logo from './MunilogicLogo.png'
import useSignin from "./useSignin";
import Header from './Header';


const initialFieldValues ={
    userName:'',
    password:''
}

const SignIn = () =>{

    const history = useHistory()

    const handleClick =()=>{
        if(values.userName === "admin@gmail.com" && values.password === "admin@123"){
            localStorage.setItem('userName',values.userName);
            localStorage.setItem('password',values.password);
            history.push('AdminHome');            
        }
        else{
            alert("Invalid Credentials:This signin is for admin only");

        }
        
        resetSignin();
    }

    const {
        values,
        setValues,
        handleChange,
        resetSignin
    } = useSignin(initialFieldValues);

    return(

        <div>            
            <Header />
            <br></br>
            <div>
                <center>
                  <div style={{border:"2px solid rgb(28, 108, 173)",borderRadius:"2%",marginLeft:"400px", marginRight:"400px",width:"500px"}}>
                      <div><br></br>
                        <center><h4 className="font">Admin Sign In</h4></center>
                      </div><br></br>
                    
                        <center>
                            <input type="text" name="userName" value={values.userName} onChange={handleChange} placeholder="User Name*" required className={"form-control required"} style={{width:"300px"}} /> <br></br>
                            <input type="password" name="password" value={values.password} onChange={handleChange} placeholder="Password" required className={"form-control required"} style={{width:"300px"}} /> <br></br>
                        </center>
                        
                    <center>
                        <button type="button" className="btn btn-primary" onClick={handleClick}>Sign In</button>
                    </center><br></br>
                    </div>
                    </center>
                    </div>
            
       </div>
    )
}

export default SignIn;