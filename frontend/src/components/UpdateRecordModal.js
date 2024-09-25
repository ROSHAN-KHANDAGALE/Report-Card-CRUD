import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

function UpdateRecordModal({
  handleUpdateShow,
  handleUpdateClose,  
  data,
  onUpdate,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    marksEnglish: "",
    marksScience: "",
    marksMaths: "",
  });

  console.log(data);

  useEffect(() => {
    if (data) {
      // Pre-fill the form with current data when modal is opened
      setFormData({
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        marksEnglish: data?.marksEnglish,
        marksScience: data?.marksScience,
        marksMaths: data?.marksMaths,
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send updated data to the backend
      await axios.put(
        `http://localhost:4000/reportDetails/api/getReport/${data?._id}`,
        formData
      );
      // Call onUpdate to refresh the table data after successful update
      onUpdate();
      handleUpdateClose();
    } catch (error) {
      console.error("Error updating the record:", error);
    }
  };

  return (
    <>
      <Modal
        show={handleUpdateShow}
        onHide={handleUpdateClose}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                value={formData?.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                value={formData?.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData?.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMarksEnglish">
              <Form.Label>Marks in English</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Marks in English"
                name="marksEnglish"
                value={formData?.marksEnglish}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMarksScience">
              <Form.Label>Marks in Science</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Marks in Science"
                name="marksScience"
                value={formData?.marksScience}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMarksMaths">
              <Form.Label>Marks in Maths</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Marks in Maths"
                name="marksMaths"
                value={formData?.marksMaths}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="warning" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateRecordModal;
