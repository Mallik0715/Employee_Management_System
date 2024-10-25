import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';

export default class ListEmployeeComponent extends Component {

    constructor()
    {
        super();

        this.state={
            employees:[]
        }
    }

    componentDidMount()
    {
        EmployeeService.getEmployees().then((res)=>
           {
            this.setState({employees:res.data})
           } )
    }

    deleteEmployee=(employeeId)=>
    {
      EmployeeService.deleteEmployee(employeeId).then(res=>
      {
          EmployeeService.getEmployees().then(res=>
          {
              this.setState({employees:res.data})
          }
          )
      })
      .catch(error =>
      {
        console.log(error)
      }
      )
    }




  render() {
    return (
      <div className='container mt-5'>
        
            <h4 className='text-center'>Employee List</h4>
            <div className='row'>
        <Link to="/add-employee" className='btn btn-primary my-4'> Add Employee</Link>


            <table className='table table-bordered table-striped w-100'>
                   <thead>
                        <tr>
                            <th> ID </th>
                            <th> First Name</th>
                            <th> Last Name</th>
                            <th> Email</th>
                            <th> Actions</th>
                        </tr>
                   </thead>
                   <tbody>
                    {
                        this.state.employees.map(employee=>
                               <tr key={employee.id}>
                                       <td>{employee.id}</td> 
                                       <td>{employee.firstName}</td> 
                                       <td>{employee.lastName}</td> 
                                       <td>{employee.email}</td> 
                                       <td>
   <Link to={`/update-employee/${employee.id}`} className='btn btn-info'> update </Link>                        
   <button style={{marginLeft:"10px"}} className='btn btn-danger'
   onClick={()=> this.deleteEmployee(employee.id)}> Delete </button>
                                       </td>
                                </tr>
                        )
                        
                    }
                   </tbody>
            </table>
            </div>
      </div>
    )
  }
}
