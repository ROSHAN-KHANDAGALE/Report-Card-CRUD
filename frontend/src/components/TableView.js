/**
 * Importing all necessary packages
 */
import ViewRecordModal from "./ViewRecordModal";
import { Table, Button, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import UpdateRecordModal from "./UpdateRecordModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

function TableView() {
  /**
   * Initialization of useStates
   */
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(5);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState({});
  const [updateShow, setUpdateShow] = useState(false);

  /**
   * Function to fetch Records from backend with pagination
   */
  const getRecordHandle = async (page, limit) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        "http://localhost:4000/reportDetails/api/getReport",
        {
          params: { page, limit },
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in Authorization header
          },
        }
      );
      // to check if data is passed properly or not
      console.log(result.data);

      // To validate the data is properly passed in setData or not
      if (result.data && result?.data.report) {
        setData(result.data.report);
        setTotalPages(result.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect is used to Fetch data
  useEffect(() => {
    getRecordHandle(page, limit);
  }, [page, limit]);

  /**
   * Delete Handler to delete records from the Table
   */
  const deleteHandle = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:4000/reportDetails/api/getReport/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getRecordHandle(page, limit);
      toast.warn("Record Deleted....");
    } catch (error) {
      console.error(error);
    }
  };

  // For Modal View Handler
  const handeshow = (ele) => {
    setShow(true);
    setItem(ele);
  };

  const handleClose = () => {
    setShow(false);
  };

  // For Update Modal View Handler
  const handleUpdateShow = (ele) => {
    setUpdateShow(true);
    setItem(ele);
  };

  const handleUpdateClose = () => {
    setUpdateShow(false);
  };

  const onUpdate = () => {
    getRecordHandle(page, limit);
    toast.success("Record Updation Successfull!!");
  };

  // Pagination Handlers for Next Record
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  // Pagination Handlers for Previous Record
  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
      <ToastContainer />
      <ViewRecordModal show={show} data={item} handleClose={handleClose} />
      <UpdateRecordModal
        handleUpdateShow={updateShow}
        handleUpdateClose={handleUpdateClose}
        data={item}
        onUpdate={onUpdate}
      />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((ele) => {
              return (
                <tr key={ele._id}>
                  <td>{ele.firstName}</td>
                  <td>{ele.lastName}</td>
                  <td>{ele.email}</td>
                  <td>
                    <Button onClick={() => handeshow(ele)} variant="info">
                      VIEW
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteHandle(ele._id)}
                    >
                      DELETE
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => handleUpdateShow(ele)}
                    >
                      UPDATE
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <Pagination>
        <Pagination.Prev onClick={handlePrevious} disabled={page === 1} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next onClick={handleNext} disabled={page === totalPages} />
      </Pagination>
    </>
  );
}

export default TableView;
