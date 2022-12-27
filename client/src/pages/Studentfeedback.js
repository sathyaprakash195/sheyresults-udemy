import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Col, Row, Table } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alerts";

function Studentfeedback() {
  const dispatch = useDispatch();
  const [results, setResults] = React.useState([]);
  const navigate = useNavigate();
  const getResults = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/Studentfeedback",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setResults(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  return (
    <div className="p-5">
      <div className="header d-flex justify-content-between align-items-center py-3">
        <h1 className="text-white">
          {" "}
          <b className="secondary-text">IT </b> FEEDBACK{" "}
        </h1>
      </div>
      <table className="table table-bordered ">
        <tr>
          <th>Subjects</th>
          <th>Feedback</th>
        </tr>
        <tr>
          <td>math</td>
          <td><Col span={8}>
            <div
              className="text-medium align-items-center pt-3"
              onClick={() => {
                navigate("/Feedbackform");
              }}
            >
              <h1 className="text-small align-items-center text-black">
                <button type="button">Give Feedback</button>

              </h1>

            </div>
          </Col>
          </td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
        </tr>
        <tr>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
        </tr>
        <tr>
          <td>Magazzini Alimentari Riuniti</td>
          <td>Giovanni Rovelli</td>
        </tr>
      </table>



    </div>
  );
}

export default Studentfeedback;