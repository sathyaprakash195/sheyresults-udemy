import React, { useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";

import { useParams } from "react-router-dom";
import StudentForm from "../../components/StudentForm";

function EditStudent() {
  const [student, setStudent] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getStudent = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/student/get-student/${params.rollNo}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setStudent(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);
  const params = useParams();
  return (
    <div>
      <PageTitle title="Edit Student" />
      <img
        src="https://cdn-icons-png.flaticon.com/512/2444/2444472.png"
        alt=""
        height={100}
        width={100}
        className="my-2"
      />
      {student && <StudentForm student={student} type="edit" />}
    </div>
  );
}

export default EditStudent;
