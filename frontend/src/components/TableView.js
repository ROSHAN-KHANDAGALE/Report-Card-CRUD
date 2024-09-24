import ViewRecordModal from "./ViewRecordModal";
import { Table, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

function TableView() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState({});

  const getRecordHandle = async () => {
    try {
      const result = await axios.get(
        "http://localhost:4000/reportDetails/api/getReport"
      );
      if (result.data && result.data?.report) {
        setData(result.data?.report);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecordHandle();
  }, []);

  const deleteHandle = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/reportDetails/api/getReport/${id}`
      );
      // Update tables state to filter out the deleted item
      setData((pData) => pData.filter((item) => item._id !== id));
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

  console.log(data);

  return (
    <>
      <ViewRecordModal show={show} data={item} handleClose={handleClose} />
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
            data?.map((ele) => {
              return (
                <tr key={ele._id}>
                  <td>{ele.firstName}</td>
                  <td>{ele.lastName}</td>
                  <td>{ele.email}</td>
                  <td>
                    <Button
                      onClick={() => {
                        handeshow(ele);
                      }}
                      variant="info"
                    >
                      VIEW
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteHandle(ele._id)}
                    >
                      DELETE
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}

export default TableView;
