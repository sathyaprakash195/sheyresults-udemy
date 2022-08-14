import { Col, Form, Row, Space } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { ShowLoading, HideLoading } from "../redux/alerts";
import { useDispatch, useSelector } from "react-redux";


import React from "react";
import { useNavigate } from "react-router-dom";

function ResultForm() {
  const { employee } = useSelector((state) => state.employee);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  return (
    <div>
      <Form layout="vertical" onFinish={onFinish} initialValues={null}>
        <Row gutter={[10, 10]}>
          <Col span={16}>
            <Form.Item label="Examination" name="examination">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8} />
          <Col span={8}>
            <Form.Item label="Date" name="date">
              <input type="date" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Class" name="class">
              <input type="number" />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <Form.List name="subjects">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <input placeholder="Subject Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "totalMarks"]}
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <input placeholder="Total Marks" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "passMarks"]}
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <input placeholder="Pass Marks" />
                  </Form.Item>
                  <i
                    className="ri-delete-bin-line"
                    onClick={() => remove(name)}
                  ></i>
                </Space>
              ))}

              <h1
                onClick={() => add()}
                className="text-medium underline mt-3 cursor-pointer"
              >
                Add Subject
              </h1>
            </>
          )}
        </Form.List>
        <div className="d-flex justify-content-end mt-2">
          <button className="primary text-white px-5">Save</button>
        </div>
      </Form>
    </div>
  );
}

export default ResultForm;
