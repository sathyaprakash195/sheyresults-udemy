import React, { useEffect } from "react";
import { Col, Form, Row, Space } from "antd";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Modal, Table } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";

import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

function ResultInfo() {
  const [obtainedCGPA, setObtainedCGPA] = React.useState(null);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [showStudentsModal, setShowStudentsModal] = React.useState(false);
  const [students, setStudents] = React.useState([]);
  const params = useParams();
  const [result, setResult] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employee } = useSelector((state) => state.employee);
  const onFinish = async (values) => {
    values.createdBy = employee._id;
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/results/add-result", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate(-1);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
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
        const tempObtainedCGPA = {};
        response.data.data.subjects.forEach((subject) => {
          tempObtainedCGPA[subject.name] = 0;
        });
        setObtainedCGPA(tempObtainedCGPA);
      }
      if (response.data.success) {
        setResult(response.data.data);
        const tempObtainedCGPA = {};
        response.data.data.subjects1.forEach((subject) => {
          tempObtainedCGPA[subject.name] = 0;
        });
        setObtainedCGPA(tempObtainedCGPA);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const getStudents = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/student/get-all-students",
        {
          class: result.semester,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setStudents(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const saveStudentResult = async (values) => {
    let verdict = "pass";
    Object.keys(obtainedCGPA).forEach((key) => {
      const subjectName = key;
      const CGPA = obtainedCGPA[key];
      const passCGPA = result.subjects.find(
        (subject) => subject.name === subjectName
      ).passCGPA;
      if (Number(CGPA) < Number(passCGPA)) {
        verdict = "fail";
      }
      return;
    });
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/results/save-student-result",
        {
          resultId: params.resultId,
          examination: result.examination,
          studentId: selectedStudent._id,
          obtainedCGPA: obtainedCGPA,
          verdict,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setObtainedCGPA(null);
        setSelectedStudent(null);
        getStudents();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  const saveStudentResult1 = async (values) => {
    let verdict = "pass";
    Object.keys(obtainedCGPA).forEach((key) => {
      const subjectName = key;
      const CGPA = obtainedCGPA[key];
      const passCGPA = result.subjects1.find(
        (subject) => subject.name === subjectName
      ).passCGPA;
      if (Number(CGPA) < Number(passCGPA)) {
        verdict = "fail";
      }
      return;
    });
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/results/save-student-result",
        {
          resultId: params.resultId,
          examination: result.examination,
          studentId: selectedStudent._id,
          obtainedCGPA: obtainedCGPA,
          verdict,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setObtainedCGPA(null);
        setSelectedStudent(null);
        getStudents();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  const columns = [
    {
      title: "Semester",
      dataIndex: "semester",
      key: "semester",
    },
    {
      title: "Roll No",
      dataIndex: "rollNo",
      key: "rollNo",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
  ];

  useEffect(() => {
    if (!result) {
      getResult();
    }
  }, []);

  useEffect(() => {
    if (result) {
      getStudents();
    }
  }, [result]);

  return (
    <div>
      <PageTitle title="Result Info" />
      {result && (
        <>
          <div className="mt-3">
            <h1 className="text-small">Name : {result.examination}</h1>
            <h1 className="text-small">Semester : {result.semester}</h1>
            <h1 className="text-small">Date : {result.date}</h1>
          </div>
          <hr />
          {!selectedStudent ? (
            <h1
              className="underline cursor-pointer text-medium"
              onClick={() => {
                setShowStudentsModal(true);
              }}
            >
              Add Student
            </h1>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center card flex-row p-2">
                <h1 className="text-small">
                  Student Name : {selectedStudent?.fullName}
                </h1>
                <i
                  className="ri-close-line"
                  onClick={() => {
                    const tempObtainedCGPA = {};
                    result.subjects.forEach((subject) => {
                      tempObtainedCGPA[subject.name] = 0;
                    });
                    result.subjects1.forEach((subject) => {
                      tempObtainedCGPA[subject.name] = 0;
                    });
                    setObtainedCGPA(tempObtainedCGPA);
                    setSelectedStudent(null);
                  }}
                ></i>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Total GPA</th>
                    <th>Obtained GPA</th>
                    <th>Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {result?.subjects?.map((subject, index) => (
                    <tr>
                      <td>{subject?.name}</td>
                      <td>{subject?.totalCGPA}</td>
                      <td>
                        <input
                          type="text"
                          className="w-110"
                          value={obtainedCGPA[subject?.name]}
                          onChange={(e) => {
                            const tempObtainedCGPA = { ...obtainedCGPA };
                            tempObtainedCGPA[subject.name] = e.target.value;
                            console.log(tempObtainedCGPA);
                            setObtainedCGPA(tempObtainedCGPA);
                          }}
                        />
                      </td>
                      <td>{subject?.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Form layout="vertical" onFinish={onFinish} initialValues={null}>
                <Row gutter={[10, 10]}>
                  <Col span={4}>
                    <label for="SGPA"><b>SGPA</b></label>
                    <input type="text" id="SGPA" name="SGPA"></input>
                  </Col>
                </Row>
              </Form>
              <hr/>
              <table className="table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Total GPA</th>
                    <th>Obtained GPA</th>
                    <th>Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {result?.subjects1?.map((subject, index) => (
                    <tr>
                      <td>{subject?.name}</td>
                      <td>{subject?.totalCGPA}</td>
                      <td>
                        <input
                          type="text"
                          className="w-110"
                          value={obtainedCGPA[subject?.name]}
                          onChange={(e) => {
                            const tempObtainedCGPA = { ...obtainedCGPA };
                            tempObtainedCGPA[subject.name] = e.target.value;
                            console.log(tempObtainedCGPA);
                            setObtainedCGPA(tempObtainedCGPA);
                          }}
                        />
                      </td>
                      <td>{subject?.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Form layout="vertical" onFinish={onFinish} initialValues={null}>
                <Row gutter={[10, 10]}>
                  <Col span={4}>
                    <label for="SGPA"><b>SGPA</b></label>
                    <input type="text" id="SGPA" name="SGPA"></input>
                  </Col>
                </Row>
              </Form>
              <hr/> 

              <button
                onClick={saveStudentResult1}
                className="primary px-5 text-white"
              >
                SAVE
              </button>
            </>
          )}
        </>
      )}

      <Modal
        title="Select Student"
        visible={showStudentsModal}
        onCancel={() => {
          setShowStudentsModal(false);
        }}
      >
        <Table
          columns={columns}
          dataSource={students}
          onRow={(record) => {
            return {
              onClick: () => {
                setSelectedStudent(record);
                const resultExists = record.results.find(
                  (result) => result.resultId === params.resultId
                );
                if (resultExists) {
                  setObtainedCGPA(resultExists.obtainedCGPA);
                }
                setShowStudentsModal(false);
              },
            };
          }}
        />
      </Modal>
    </div>
  );
}

export default ResultInfo;
