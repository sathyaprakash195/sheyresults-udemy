import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Col, Row, Table } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alerts";

function Feedbackform() {
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
    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdVMlWydSuB-bOTDXryhg21MuTrOkMD4MsbqCfD7tfqu4HHHg/viewform?embedded=true" width="640" height="1785" frameborder="0" marginheight="0" marginwidth="0" className="h-screen w-screen form" >Loading…</iframe>
    );
}

export default Feedbackform;