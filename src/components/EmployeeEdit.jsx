import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EmployeeEdit=() =>{
//get the parameters from the url
const { empid } = useParams();

//const [empData, setEmpData] = useState([]);

useEffect(() => {
  fetch("http://localhost:3006/employee/" + empid)
    .then((res) => {
      return res.json();
    })
    .then((resp) => {
      //bind values to appear on the form
      setId(resp.id);
      setName(resp.name);
      setEmail(resp.email);
      setPhone(resp.phone);
      setActive(resp.active)
    })
    .catch((err) => {
      console.log(err.message);
    });
}, []);

const [id, setId] = useState("");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [active, setActive] = useState(true);
const [validation, setValidation] = useState(false);
//navigate hook to go back
const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  const employeeData = {
    id,
    name,
    email,
    phone,
    active,
  };

  //console.log({id,name,email,phone,active})
  fetch("http://localhost:3006/employee/"+empid, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(employeeData),
  })
    .then((res) => {
      alert("Save Successful");
      navigate("/");
    })
    .catch((err) => {
      console.error(err.message);
    });
};

  return (
    <div>
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card left">
              <div className="card-title">
                <h2>Edit Employee</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        className="form-control"
                        value={id}
                        disabled="disabled"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onMouseDown={(e) => setValidation(true)}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                      ></input>
                      {name.length == 0 && validation &&<span className="text-danger"></span>}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                        type="checkbox"
                        className="form-check-input"
                      ></input>
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button type="submit" className="btn btn-success">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default EmployeeEdit;