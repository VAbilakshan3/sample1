import React, {useState, useEffect} from 'react'

import LayoutAdmin from '../core/LayoutAdmin'
import {isAuthenticated} from '../auth'
import  { Link, Redirect } from 'react-router-dom'
import {getDetails, deleteDetail} from '../admin/apiAdmin'
// import moment from "moment";
import Detail from '../core/Detail'
import ShowImage2 from '../core/ShowImage2';
import ShowImage from '../core/ShowImage';
import moment from 'moment';
// import {  removeItem } from '../admin/apiAdmin';
import '../App.css';
// import { isAuthenticated } from '../auth/index';
import { checkedItem } from '../core/apiCore';


const CreateDetails = (detail) => {
// // eslint-disable-next-line
const {user: {_id, name, email, role, token}} = isAuthenticated()


// const [redirect, setRedirect] = useState(false);
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


// const [redirect, setRedirect] = useState(false);
//    const addToMessage = () => {
//     checkedItem(detail, () => {
//       setRedirect(true)
//     })  
//   }
// const shouldRedirect = redirect => {
//   if(redirect) {
//     return <Redirect to="/admin/checkedDetails"/>
//   }
// }





  return (
    <LayoutAdmin  className="container mb-5" >
    {/* <div className='row mt-5'>
      <div className='col-3'>
     
      <div className="card mb-5 mt-5">
      <Link className="linkk"  to="/admin/checkedDetails"> <div className="scl jcol pt-3 pb-3 pr-3 pl-3  head1 text-center "> <div className="linkk">Checked details </div></div></Link>
      </div>
      
      </div>
      </div> */}
<div> 
      <div className='col-12 container'>
      {/* {adminInfo()} */}
      {/* {detailsHistory()} */}
      <div>
        <h3 align="center" className="textcenter mt-5 mb-5 scl">Details by Users</h3>
      {/* {JSON.stringify(detailsByUsers)} */}
      </div>
      <div className="">
                
                {/* {detailsByUsers.map((detail, i) => (
                    <div key={i} className="container"> */}






          <Detail      />

                    </div>
                {/* ))} */}
                {/* <hr/> */}
                {/* {loadMoreButton()} */}
            </div>
      </div>


        {/* </div> */}


    </LayoutAdmin>
  )
}



// export default destroy;

export default CreateDetails;

