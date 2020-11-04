import React, {useState, useEffect} from 'react'

import LayoutAdmin from '../core/LayoutAdmin'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {getContacts} from '../admin/apiAdmin'
// import moment from "moment";
import moment from 'moment';
import Contact from '../core/Contact'
import axios from 'axios'



const GetMessage = () => {
// // eslint-disable-next-line
const {user: {_id, name, email, role, token}} = isAuthenticated()


const [contactsByUsers, setContactsByUsers] = useState([])
const [error, setError] = useState([])



const loadContactsByUsers = () => {
  getContacts('createdAt').then(data => {
    if(data.error) {
      setError(data.error)
    }else {
      setContactsByUsers(data)
    }
  })
}


useEffect(() => {
  loadContactsByUsers()
}, [])



 
// constructor() {

//   super() 
//   this.state = {
//       data:[]
//   }
// }

// componentDidMount() {
//   axios.get('http://localhost:8000/form').then(res => {
//       this.setState({
//           data:res.data
//       })
//   })
// }
// return()
// )}


  return (
    <LayoutAdmin  className="container mb-5" >
    <div className='row'>
      <div className='container '>
      <div className="textcenter mt-5 ">
        <h3 align="center" className="textcenter mb-5 scl">Messages from users</h3>
      </div>
      <div className="">
                
               
          {/* <Contact
            key={i}
            contact={contact}
          /> */}
           <div className="">

<table  className="table table-hover table-responsiv table-sm table-bordered">
  <thead className="text-center">
   <tr>
   <th className="scl"  >Name</th>
    <th className="scl">Email</th>
    <th className="scl">Description</th>
    <th className="scl">PhoneNo</th>
    <th className="scl">Received At</th>
   </tr>
  </thead>    
    <tbody>
    
  {contactsByUsers.map((contact) => (
    <tr>
      <td>{contact.name}</td>
    <td>{contact.text}</td>
    <td>{contact.description.substring(0, 100)} </td>
    <td>{contact.phone}</td>
    <td>{moment(contact.createdAt).fromNow()}</td>
    </tr>
  ))}
  </tbody>

  {/* ))} */}
  </table>
</div>


                   
            </div>
      </div>


        </div>


    </LayoutAdmin>
  )
}

export default GetMessage;

