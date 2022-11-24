import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeListing =()=>{
 const [empdata,setempdata]= useState(null); 
 const navigate = useNavigate();

 //load detail
 const LoadDetail =(id)=>{
    navigate("/employee/detail/"+id);
 }
 
 const LoadEdit =(id)=>{
    navigate("/employee/edit/"+id);
}

const DeleteDetail =(id)=>{
// confirmation msg
if(window.confirm("Are you sure you want to delete this entry?")){
    fetch("http://localhost:3006/employee/"+id, {
        method: "DELETE"
      })
        .then((res) => {
          alert("Delete Successful");
          window.location.reload();
        })
        .catch((err) => {
          console.error(err.message);
        });
}
}


//get the data from the db
useEffect(()=>{
    fetch("http://localhost:3006/employee").then((res)=>{
        return res.json();
    }).then((resp)=>{
        setempdata(resp);
    }).catch((err)=>{
        console.log(err.message);
    })
},[])

    return(
        <div className='card'>
            <div className="card-title">
                <h2>Employee Listing</h2>
            </div>
            <div className="card-body">

                <Link to="employee/add" className='btn btn-success'>Add new (+)</Link>
                <table className="table table-bordered">
                    <thead className='bg-dark text-white'>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Phone</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        { empdata &&
                            empdata.map(item =>(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <a onClick={()=>{LoadEdit(item.id)}} className='btn btn-success'>Edit</a>
                                        <a onClick={()=>{DeleteDetail(item.id)}} href="#" className='btn btn-danger'>Remove</a>
                                        <a onClick={()=>{LoadDetail(item.id)}} href="#" className='btn btn-primary'>Details</a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployeeListing;