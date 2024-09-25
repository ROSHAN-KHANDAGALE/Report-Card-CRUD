import ViewRecordModal from "./ViewRecordModal";
import { Table, Button, Pagination } from "react-bootstrap"; // Import Pagination component
import { useEffect, useState } from "react";
import axios from "axios";
import UpdateRecordModal from "./UpdateRecordModal";

function TableView() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(0); // Track total pages
  const [limit, setLimit] = useState(5); // You can adjust the default limit as per your needs
  const [show, setShow] = useState(false);
  const [item, setItem] = useState({});
  const [updateShow, setUpdateShow] = useState(false);

  /**
   * Function to fetch Records from backend with pagination
   */
  const getRecordHandle = async (page, limit) => {
    try {
      const result = await axios.get(
        `http://localhost:4000/reportDetails/api/getReport`,
        {
          params: { page, limit },
        }
      );
      console.log(result.data);
      if (result.data && result?.data.report) {
        setData(result.data.report);
        setTotalPages(result.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecordHandle(page, limit); // Fetch data whenever page or limit changes
  }, [page, limit]);

  const deleteHandle = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/reportDetails/api/getReport/${id}`
      );
      getRecordHandle(page, limit); // Refetch data after deletion
    } catch (error) {
      console.error(error);
    }
  };

  const handeshow = (ele) => {
    setShow(true);
    setItem(ele);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleUpdateShow = (ele) => {
    setUpdateShow(true);
    setItem(ele);
  };

  const handleUpdateClose = () => {
    setUpdateShow(false);
  };

  const onUpdate = () => {
    getRecordHandle(page, limit);
  };

  // Pagination Control Handlers
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1); // Move to next page if not on the last page
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1); // Move to previous page if not on the first page
  };

  return (
    <>
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
