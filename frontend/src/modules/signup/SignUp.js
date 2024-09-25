import { useState } from "react";
import Button from "react-bootstrap/Button";
import "../../App.css";

const SignUp = () => {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.taget.value });
  };
  return (
    <>
      <div>
        <h2>Sign Up Form</h2>
      </div>
      <div>
        <form className="Form-body">
          <input
            type="text"
            placeholder="Enter Full Name"
            value="name"
            onChange={onChangeHandler}
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            value="email"
            onChange={onChangeHandler}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value="password"
            onChange={onChangeHandler}
            required="Required"
          />

          <Button variant="success">SignIn</Button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
