/**
 * Importing all required Pakages
 */
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";

function ReportForm() {
  // States for form inputs
  const [inputPara, setInputPara] = useState({
    firstName: "",
    lastName: "",
    email: "",
    marksEnglish: "",
    marksScience: "",
    marksMaths: "",
  });

  // Function to handle input changes
  const onChangeEventHandle = (e) => {
    setInputPara({ ...inputPara, [e.target.name]: e.target.value });
  };

  // Form submission to backend API and email sending
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    try {
      // Submit the form data to your API
      await axios.post(
        "http://localhost:4000/reportDetails/api/getReport",
        inputPara
      );

      // Now send the email after successful submission
      await axios.post(
        "http://localhost:4000/reportDetails/api/getReport/mail",
        {
          email: inputPara.email, // Recipient email
          subject: "User Registration Successful", // Email subject
          message: `Hello ${inputPara.firstName} ${inputPara.lastName}, Thank you for registering! Your report has been successfully submitted.`, // Email body
        }
      );

      // Reload the page after submission
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandle}>
        <label>First Name</label>
        <input
          className="w3-input w3-border"
          type="text"
          name="firstName"
          placeholder="Enter your First Name"
          onChange={onChangeEventHandle}
          required
        />

        <label>Last Name</label>
        <input
          className="w3-input w3-border"
          type="text"
          name="lastName"
          placeholder="Enter your Last Name"
          onChange={onChangeEventHandle}
          required
        />

        <label>Email</label>
        <input
          className="w3-input w3-border"
          type="email"
          name="email"
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          placeholder="Enter your Email"
          onChange={onChangeEventHandle}
          required
        />

        <label>Marks English</label>
        <input
          className="w3-input w3-border"
          type="number"
          name="marksEnglish"
          placeholder="Enter your Marks in English"
          onChange={onChangeEventHandle}
          required
        />

        <label>Marks Science</label>
        <input
          className="w3-input w3-border"
          type="number"
          name="marksScience"
          placeholder="Enter your Marks in Science"
          onChange={onChangeEventHandle}
          required
        />

        <label>Marks Maths</label>
        <input
          className="w3-input w3-border"
          type="number"
          name="marksMaths"
          placeholder="Enter your Marks in Maths"
          onChange={onChangeEventHandle}
          required
        />

        <label>About</label>
        <textarea
          className="w3-input w3-border"
          name="about"
          placeholder="About"
          onChange={onChangeEventHandle}
        />
        <Button type="submit" variant="success">
          SUBMIT
        </Button>
      </form>
    </div>
  );
}

export default ReportForm;
