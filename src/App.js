import React from "react";
import EmployeeListing from "./components/EmployeeListing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import EmployeeAdd from "./components/EmployeeAdd";
import EmployeeEdit from "./components/EmployeeEdit";
import EmployeeDetails from "./components/EmployeeDetails";

const App = () => {
  return (
    <div className="center">
      <h1>Fetch API CRUD App</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeListing />}></Route>
          <Route path="/employee/add" element={<EmployeeAdd />}></Route>
          <Route path="/employee/detail/:empid" element={<EmployeeDetails/>}></Route>
          <Route path="/employee/edit/:empid" element={<EmployeeEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
