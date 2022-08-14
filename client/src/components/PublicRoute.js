import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alerts.js";
import { SetEmployee } from "../redux/employees.js";
import DefaultLayout from "../components/DefaultLayout.js";
import { useNavigate } from "react-router-dom";

function PublicRoute(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/employee");
    }
  }, []);

  return <>{props.children}</>;
}

export default PublicRoute;
