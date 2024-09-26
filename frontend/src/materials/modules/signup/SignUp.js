import "../../../App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [inputPara, setInputPara] = useState({
    name: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChangeHandle = (e) => {
    setInputPara({ ...inputPara, [e.target.name]: e.target.value });
  };

  const createUserHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/user/api",
        inputPara
      );
      console.log(inputPara);
      localStorage.setItem("token", response.data.token);
      navigate("/table");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h2 className="App-header">SignUp Form</h2>
      </div>
      <div>
        <form className="Show-body" onSubmit={createUserHandle}>
          <input
            className="w3-input w3-border"
            type="text"
            placeholder="Enter fullname"
            name="name"
            onChange={onChangeHandle}
            required
          />
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
          <Link to="/login">Already an User?</Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
