import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";




const Dashboard = () => {
  const [history, setHistory] = useState([]);


const {
  user: { _id, name, email, role }
} = isAuthenticated();
const token = isAuthenticated().token;

const init = (userId, token) => {
  getPurchaseHistory(userId, token).then(data => {
      if (data.error) {
          console.log(data.error);
      } else {
          setHistory(data);
      }
  });
};

useEffect(() => {
  init(_id, token);
}, []);

const userLinks = () => {
  return (
    <div className="card scl jco card-he mb-5">
    <h4 className="card-header scl jcol">Let's go</h4>
    <ul className="list-group letscl">
      <li className="list-group-item"><Link className="nav-link" to="/cart">My Cart</Link></li>
      <li className="list-group-item"><Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link></li>
      <li className="list-group-item"><Link className="nav-link" to={`/create/detail`}>Send your details</Link></li>
      {/* <li className="list-group-item"><Link className="nav-link" to={`/create/contact`}>contact us</Link></li> */}


    </ul>
    </div>
  )
}


const userInfo = () => {
  return (
    <div className="card mb-5 jco card-he ">
      <h3 className="card-header scl jcol card-header-1">User Details</h3>
      <ul className="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">{role === 1 ? 'Admin': 'Registerd User'}</li>
      </ul>
      </div>
  )
}


const purchaseHistory = history => {
  return (
    <div>
      <div className="card mb-5 card-hea  jco">
          <h3 className="card-header scl jcol card-header-1">Purchase history</h3>
          <ul className="list-group">
              <li className="list-group-item">
                  {history.map((h, i) => {
                      return (
                          <div>
                              <hr />
                              {h.services.map((s, i) => {
                                  return (
                                      <div key={i}>
                                          <h6>Product name: {s.name}</h6>
                                          <h6>
                                              Product price: ${s.price}
                                          </h6>
                                          {/* <h6>
                                              Add to Cart time:{" "}
                                              {moment(
                                                  s.createdAt
                                              ).fromNow()}
                                          </h6> */}
                                      </div>
                                  );
                              })}
                          </div>
                      );
                  })}
              </li>
          </ul>
      </div>
      </div>
  );
};


const noPurchaseHistory = () => (
  <div>
  {/* <h2 className="cll1">
    You didn't done any Purchase. <br />
  </h2> */}
   <Link className="linkk" to="/"> <h4 className="jcol scl pt-3 pb-3 pr-3 pl-3  head1 text-center"><div className="linkk"> Continue shopping.</div> </h4> </Link> 
   </div>
);

// {items.length > 0 ? showItems(items) : noItemsMessage()}
  return (
    <Layout  className="container mt-5 col-lg-10 col-md-10 col-sm-12 mb-5 ">
      <br />
    <div className='row jumbotron jcol mt-5'>
      <div className='col-lg-3 col-md-3 col-sm-12'>
      {userLinks()}
      {/* {userInfo()} */}
      </div>
<br/>
      <div className='col-lg-6 col-md-6 col-sm-12'>
      
      {history.length > 0 ? purchaseHistory(history) : noPurchaseHistory()}
      </div>
      <div className='col-lg-3 col-md-3 col-sm-12'>
      {/* {userLinks()} */}
      {userInfo()}
      </div>

        </div>


    </Layout>
  )
}

export default Dashboard