import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../App.css";

function ViewRecordModal({ show, handleClose, data }) {
  function calculatePercentage(marksEnglish, marksScience, marksMaths) {
    const totalObtainedMarks = (marksEnglish + marksScience + marksMaths) / 300;
    const percentage = totalObtainedMarks * 100;
    return percentage;
  }

  const percentage = calculatePercentage(
    data?.marksEnglish,
    data?.marksScience,
    data?.marksMaths
  );

  const gradeCalculate = function (percentage) {
    const a = "A";
    const b = "B";
    const c = "C";
    if (percentage >= 90 && percentage <= 100) {
      return a;
    } else if (percentage >= 60 && percentage <= 90) {
      return b;
    } else {
      return c;
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {data?.firstName} {data?.lastName} Record
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Show-body">
            <label>First Name</label>
            <h4>{data?.firstName}</h4>
            <label>Last Name</label>
            <h4>{data?.lastName}</h4>
          </div>
          <div className="Data-Body">
            <label>Marks in English</label>
            <h3>{data?.marksEnglish}</h3>
            <label>Marks in Science</label>
            <h3>{data?.marksScience}</h3>
            <label>Marks in Maths</label>
            <h3>{data?.marksMaths}</h3>
          </div>

          <div className="App-header">
            <label>Percentage</label>
            <h3>{percentage}%</h3>
            <label>Grade</label>
            <h3>{gradeCalculate(percentage)}</h3>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewRecordModal;
