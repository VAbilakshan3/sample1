import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import '../App.css';
import { isAuthenticated } from '../auth/index';




const { user, token } = isAuthenticated()

const GetMessage = ({
  contact,

}) => {
  // const [contact, setContact] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(contact.count);





  return (
    <div className="">

      <table className="table table-flui text-center table-hover table-responsiv table-sm table-bordered">
        <tr>
          {/* <th className="scl">Message Id</th> */}
          <th className="scl"  >Name</th>
          <th className="scl">Email</th>
          <th className="scl">Description</th>
          <th className="scl">PhoneNo</th>
          <th className="scl">Received At</th>
        </tr>
        {contact.map((c, cIndex) => (
          
          <tr>
            <div key={cIndex}></div>
          {/* <td>{contact._id}</td> */}
          <td>{c.name}</td>
          <td>{c.text}</td>
          <td>{c.description.substring(0, 100)} </td>
          <td>{c.phone}</td>
          <td>{moment(c.createdAt).fromNow()}</td>
        </tr>
      
        ))}
        </table>
    </div>

  );
};

export default GetMessage;




























































