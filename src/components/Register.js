import React from "react";
import { useHistory } from "react-router-dom";
import Logo from "./MunilogicLogo.png";
import useSignup from "./useSignup";
import Header from "./Header";

const initialFieldValues = {
  userName: "",
  password: "",
};

const SignIn = () => {
  const history = useHistory();

  const handleClick = () => {
    if (
      document.getElementById("cp").value === document.getElementById("p").value
    ) {
      history.push("/");
      resetSignup();
    } else {
      alert("Password and Confirm Password does not match");
    }
  };

  const { values, setValues, handleChange, resetSignup } =
    useSignup(initialFieldValues);

  return (
    <div>
      <Header />
      <br></br>

      <div>
          <center>
        <div
          style={{
            border: "2px solid rgb(28, 108, 173)",
            borderRadius: "2%",
            marginLeft: "400px",
            marginRight: "400px",
            width: "500px",
           
          }}
        >
          <br></br>
          <center>
            <h4 className="font">Sign Up</h4>
          </center>

          <br></br>
          <div>
            <center>
              <input
                type="email"
                name="userName"
                value={values.userName}
                onChange={handleChange}
                placeholder="User Name*"
                required
                className={"form-control required"}
                style={{ width: "300px" }}
              />{" "}
              <br></br>
              <input
                id="p"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className={"form-control required"}
                style={{ width: "300px" }}
              />{" "}
              <br></br>
              <input
                id="cp"
                type="password"
                name="cpassword"
                value={values.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Passsword"
                required
                className={"form-control required"}
                style={{ width: "300px" }}
              />{" "}
              <br></br>
            </center>
          </div>
          <center>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Sign Up
            </button>
          </center>
          <br></br>
        </div>
        </center>
      </div>
    </div>
  );
};

export default SignIn;
