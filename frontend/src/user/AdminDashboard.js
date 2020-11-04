import React, {useState, useEffect} from 'react'

import LayoutAdmin from '../core/LayoutAdmin'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'

import Detail from '../core/Detail'



const AdminDashboard = () => {

const {user: {_id, name, email, role, token}} = isAuthenticated()



const adminLinks = () => {
  return (
    <div className="card mb-5 card-heade ">
    <h4 className="card-header scl jcol  ">Let's go</h4>
    <ul className="list-group">
      <li className="list-group-item"><Link className="nav-link" to="/create/category">Create Category</Link></li>
      <li className="list-group-item"><Link className="nav-link" to="/create/service">Create Products</Link></li>
      <li className="list-group-item"><Link className="nav-link" to="/admin/orders">View orders</Link></li>
      <li className="list-group-item"><Link className="nav-link" to="/admin/services">Manage Products</Link></li>
      <li className="list-group-item"><Link className="nav-link" to="/admin/details">Details</Link></li>
      <li className="list-group-item"><Link className="nav-link" to="/admin/contacts">Messages</Link></li>




    </ul>
    </div>
  )
}



const adminInfo = () => {
  return (
    <div className="card mb-5  card-hea ">
      <h3 className="card-header card-heade scl jcol">Admin Information</h3>
      <ul className="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">{role === 1 ? 'Admin': 'Registerd User'}</li>
      </ul>
      </div>
  )
}





  return (
    <LayoutAdmin  className="container mt-5  mb-5">
      <br />
    <div className='row jumbotron jcol mb-5 mt-5'>
      <div className='col-lg-6 col-md-6 col-sm-12'>
      {adminLinks()}
      </div>
<br/>
      <div className='col-lg-6 col-md-6  col-sm-12'>
      {adminInfo()}
    
      </div>


        </div>


    </LayoutAdmin>
  )
}





export default AdminDashboard

