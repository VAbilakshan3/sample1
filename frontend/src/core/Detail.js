import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage2 from './ShowImage2';
import ShowImage from './ShowImage';
import moment from 'moment';
import {  removeItem } from '../admin/apiAdmin';
import '../App.css';
import { isAuthenticated } from '../auth/index';
import {getDetails, deleteDetail} from '../admin/apiAdmin'
import { checkedItem } from './apiCore';
// import destroy  from "../user/AdminDashboard";
 


const {user, token} = isAuthenticated()

const Detail = ({
  detail,
}) => {

  const [redirect, setRedirect] = useState(false);
  const [detailsByUsers, setDetailsByUsers] = useState([])
const [error, setError] = useState([])



const loadDetailsByUsers = () => {
  getDetails('createdAt').then(data => {
    if(data.error) {
      setError(data.error)
    }else {
      setDetailsByUsers(data)
      
    }
  })
}





useEffect(() => {
  loadDetailsByUsers()
}, [])
   const addToMessage = () => {
    checkedItem(detail, () => {
      setRedirect(true)
      // style={{display:"none"}}
    })  
  }
const shouldRedirect = redirect => {
  if(redirect) {
    return <Redirect to="/admin/checkedDetails"/>
  }
}
  return (
    <div>
      {shouldRedirect(redirect)}
   
    <table className="table table-flui text-center table-hover table-responsiv table-sm table-bordered">
      <tr>
        {/* <th className="scl"></th> */}
        <th className="scl">Name</th>
        <th className="scl">Photo</th>
        <th className="scl">Description</th>
        <th className="scl">PhoneNo</th>
        <th className="scl">Category</th>
        <th className="scl">Received At</th>
        
      </tr>
      {detailsByUsers.map((detail) => (
        <tr>
        {/* <td><div>
          <button onClick={addToMessage}   ><i class="fa fa-check" aria-hidden="true"></i></button>
         
        </div>
        </td> */}
        <td>{detail.name}</td>
        <td >
          <div className="td1 dropdown" >
          <ShowImage2 item={detail} url="detail" />
          <div className="dropdown-content dd1" >
             <ShowImage className=" dd1" item={detail} url="detail" />
          </div>
          </div>
        </td>
        <td>{detail.description.substring(0, 10)} </td>
        <td>{detail.phone}</td>
        <td>{detail.category && detail.category.name}</td>
        <td>{moment(detail.createdAt).fromNow()}</td>
      </tr>
      ))}
     
      
    </table>
    </div>
    
  );
};
 
export default Detail;




























































