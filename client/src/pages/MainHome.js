import React from "react";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

function EmployeeHome() {
  const navigate = useNavigate();
  return (
    <div className="p-5">
     <div className="header d-flex justify-content-between align-items-center py-3">
     <h1 className="text-white">
      {" "}
      <b className="secondary-text"> IT </b> HOME{" "}
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

     <div className="layout2">
       <div className="h-100 d-flex justify-content-center align-items-center">
       <Row gutter={[20, 20]}>
       <Col span={12}>
          <div
            className="p-5 primary-border card w-300 cursor-pointer d-flex align-items-center justify-content-center gap-3"
            onClick={() => {
              navigate("/home");
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/1162/1162251.png"
              alt=""
              height={50}
              width={50}
            />
            <h1>Results</h1>
          </div>
        </Col>
        <Col span={12}>
          <div
            className="p-5 primary-border card w-300 cursor-pointer align-items-center justify-content-center gap-3"
            onClick={() => {
              navigate("/Feedbackmain");
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1312/1312304.png"
              alt=""
              height={50}
              width={50}
            />
            <h1>Feedback</h1>
          </div>
        </Col>

       </Row>
      </div>
    </div>
  </div>
  );
}

export default EmployeeHome;
