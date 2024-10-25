import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';

function CreateEmployeeComponent() 
{
    let navigate=useNavigate();

    const [employee,setEmployee]=useState({
        firstName:"",
        lastName:"",
        email:""
    })

    const handleClick=(e)=>
    {
        const name=e.target.name;
        const value=e.target.value;
        setEmployee({... employee,[name]:value});
    }

    const cancelHandler=()=>
    {
        navigate("/employees");
    }

    const saveHandler=(e)=>
    {
        e.preventDefault();
        console.log("Employee : => "+JSON.stringify(employee));

        EmployeeService.createEmployee(employee).then(res=>
        {
            navigate("/employees");
        }
        )
    }


    return (
    <div className='container mt-5'>
        <div className='row w-50 '>
            <div className='card offset-md-6'>
                <h3 className='text-center mt-3'> Add Employee </h3>
                <div className='card-body'>

                    <form>
                            <label htmlFor='firstName' className='my-3'> First Name: </label>
                            <input type="text" name="firstName" id="firstName"
                            autoComplete='off' className='form-control'
                            value={employee.firstName}
                            onChange={handleClick}/>

                            <label htmlFor='lastName' className='my-3'> Last Name: </label>
                            <input type="text" name="lastName" id="lastName"
                            autoComplete='off' className='form-control'
                            value={employee.lastName}
                            onChange={handleClick}/>

                            <label htmlFor='email' className='my-3'> Email: </label>
                            <input type="email" name="email" id="email"
                            autoComplete='off' className='form-control'
                            value={employee.email}
                            onChange={handleClick}/>

                            <button className='btn btn-success my-4'
                            onClick={saveHandler}> save </button>

                             <button className='btn btn-danger my-4' style={{marginLeft:"10px"}}
                             onClick={cancelHandler}> cancel </button>
                    </form>

                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateEmployeeComponent
