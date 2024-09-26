import axios from "axios";
import "../../../App.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [inputPara, setInputPara] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChangeHandle = (e) => {
    setInputPara({ ...inputPara, [e.target.name]: e.target.value });
  };

  const loginHandle = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:4000/user/api/login",
        inputPara
      );
      localStorage.setItem("token", result.data.token);
      console.log(result.data.token);
      navigate("/table");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h2 className="App-header">SignIn Form</h2>
      </div>
      <div>
        <form className="Show-body" onSubmit={loginHandle}>
          <input
            className="w3-input w3-border"
            type="text"
            placeholder="Enter Username"
            name="username"
            onChange={onChangeHandle}
            required
          />
          <input
            className="w3-input w3-border"
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={onChangeHandle}
            required
          />
          <button type="submit">Submit</button>
          <Link to="/signup">New User?</Link>
        </form>
      </div>
    </>
  );
};

export default SignIn;
