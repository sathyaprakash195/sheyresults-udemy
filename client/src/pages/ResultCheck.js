import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alerts";
function ResultCheck() {
  const navigate = useNavigate()
  const [rollNo, setRollNo] = React.useState("");
  const [studentResult, setStudentResult] = React.useState(null);
  const params = useParams();
  const [result, setResult] = React.useState(null);
  const dispatch = useDispatch();
  const getResult = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/results/get-result/${params.resultId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setResult(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const getStudentResult = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/results/get-student-result`,
        {
          rollNo: rollNo,
          resultId: params.resultId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setStudentResult(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (!result) {
      getResult();
    }
  }, []);
  return (
    <div className="p-5">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="text-white">
          {" "}
          <b className="secondary-text">IT</b> RESULTS{" "}
        </h1>
        <div>
          <h1
            className="text-white text-small cursor-pointer underline"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </h1>
        </div>
      </div>

      {result && (
        <div className="mt-3 p-3 card">
          <h1 className="text-small">Examination : {result.examination}</h1>
          <h1 className="text-small">Semester : {result.semester}</h1>
        </div>
      )}
      <hr />      
      <div className="d-flex gap-3 p-3 card flex-row my-3">
        <input
          type="number"
          placeholder="Roll No"
          className="w-300"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />

        <button
          className="primary px-5 text-white"
          onClick={() => {
            getStudentResult();
          }}
        >
          Get Result
        </button>
      </div>

      {studentResult && (
        <div className="card p-3">
          <div>
            <h1 className="text-medium ">
              <b>
                Name : {studentResult.fullName}
              </b>
            </h1>
          </div>
          <hr />
          <table className="table table-striped w-50">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Credits</th>
                <th>Grade point</th>
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((subject, index) => (
                <tr>
                  <td>{subject.name}</td>
                  <td>{subject.credits}</td>
                  <td>{studentResult.obtainedCGPA[subject?.name] || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              backgroundColor: "#002B5B",
              width: "max-content",
            }}
            className="p-3 w-50"
          >
            <h1 className="text-white text-center text-medium">
              SGPA:{" "} {studentResult?.SGPA?.toUpperCase()}, Verdict :{" "}{studentResult?.verdict?.toUpperCase()}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultCheck;
