import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EmployeeDetails = () => {
  //get the parameters from the url
  const { empid } = useParams();

  const [empData, setEmpData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3006/employee/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setEmpData(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="card">
      <div className="card-title">
        <h2>Employee Details</h2>
      </div>
      <div className="card-body"></div>

      {empData && (
        <div>
          <h3>ID:{empData.id}</h3>
          <h3>Name:{empData.name}</h3>
          <h3>Email:{empData.email}</h3>
          <h3>Phone:{empData.phone}</h3>
          <Link className ="btn btn-danger" to="/">Go Back</Link>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
