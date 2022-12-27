import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Col, Row, Table } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alerts";

function Feedbackmain() {
    const dispatch = useDispatch();
    const [results, setResults] = React.useState([]);
    const navigate = useNavigate();
    const getResults = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post(
                "/api/Feedbackmain",
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


            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <h1 className="text-medium my-3">
                        Select Your details From Below..{" "}
                    </h1>
                    <hr />
                </Col>

                <Col span={24}>
                    <h1 className="text-medium align-items-center">
                        <label for="sem"><b>Branch: IT</b></label>
                    </h1>
                </Col>
                <Col span={24}>
                    <h1 className="text-medium align-items-center">
                        <label for="sem"><b>Select your semester: </b></label>


                        <div class="dropdown">
                            <button className="margin"> semester</button>
                            <div class="dropdown-content">
                                <a href="#">1 sem</a>
                                <a href="#">2 sem</a>
                                <a href="#">3 sem</a>
                                <a href="#">4 sem</a>
                                <a href="#">5 sem</a>
                                <a href="#">6 sem</a>
                                <a href="#">7 sem</a>
                                <a href="Studentfeedback.js">8 sem</a>
                            </div>
                        </div>

                    </h1>
                </Col>

                <Col span={8}>
                    <div
                        className="text-medium align-items-center pt-3"
                        onClick={() => {
                            navigate("/Studentfeedback");
                        }}
                    >
                        <h1 className="text-medium align-items-center text-black">
                            <button type="button">Submit</button>

                        </h1>


                        <hr />

                    </div>
                </Col>


            </Row>


        </div>
    );
}

export default Feedbackmain;