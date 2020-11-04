import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../App.css';
import { isAuthenticated } from '../auth/index';
import { getToChecked } from './apiCore';
import LayoutAdmin from '../core/LayoutAdmin';
import Detail from './Detail';

const {user, token} = isAuthenticated()

const CheckedDetails = ({
  detail,
  
}) => {

  const [items, setItems] = useState([]);

useEffect(() => {
    setItems(getToChecked())
}, [])


const showItems = items => {
    return (
        <div>
    {items.map((detail,i) => (<Detail key={1} detail={detail} />))}

        </div>
    )

}
const noItemsMessage = () => (
    <div>
      <h3 className="scl">
        No more checked details.<br/> 
    </h3>
    <div className="jcol2 text-center scl"><Link className="scl" to="/admin/details">Go and check</Link></div>
    </div>
)
  return (
      <LayoutAdmin className="mt-5 mb-5">
    <div className="container mt-5  mb-5">
    <div className="mt-5 mb-5 bpadd">
      <h3 className="scl text-center">Checked Details</h3>
    {items.length > 0 ? showItems(items) : noItemsMessage() }
    </div>

    </div>
    </LayoutAdmin >
  );
};
 
export default CheckedDetails;



