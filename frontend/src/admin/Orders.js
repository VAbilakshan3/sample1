import React, { useState, useEffect } from 'react';
import LayoutAdmin from '../core/LayoutAdmin';
import { isAuthenticated } from '../auth/index';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment'


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);



    const {user, token} = isAuthenticated()

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if(data.error) {
                console.log(data.error); 
            }else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if(data.error) {
                console.log(data.error); 
            }else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders()
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if(orders.length > 0) {
        return (
        <h3 className="scl">Total orders: {orders.length}</h3>
        )
        } else {
            return <h3 className="scl">No orders</h3>
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
                <input type="text" value={value} className="form-control" readOnly />
        </div>
    );
    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
            if(data.error) {
                console.log('Status update failed')
            } else {
                loadOrders();
            }
        });
    };

    const showStatus = o => (
        <div className="form-group">
            <h4 className="mark mb-4 scl">Status: {o.status}</h4>
            <select className="form-control" onChange={e => (handleStatusChange(e, o._id))}>
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                <option key={index} value={status}>
                    {status}
                </option>
                ))}
            </select>
        </div>
    )

    
    return (
        <LayoutAdmin className="container mt-5 mb-5 col-lg-6 col-md-6 col-sm-12 ">
        <br/>
        <div className="row jumbotron pt-3 pr-2 pl-2 mt-5 jcol ">
            <div className="col-md-12 offset-md-0">
                {showOrdersLength()}
               
                {orders.map((o, oIndex) => {
                    return (
                        <div className="mt-5" key={oIndex} style={{borderBottom: "5px solid black"}}>
                            <h4 className="mb-5">
                    {/* <span className="scl">Order Id: {o._id}</span> */}
                            </h4>

                            <ul className="list-group mb-2">
                                <li className="list-group-item">
                                    {showStatus(o)}
                                </li>
                                <li className="list-group-item">
                                    Transaction ID: {o.transaction_id}
                                </li>
                                <li className="list-group-item">
                                    Amount: ${o.amount}
                                </li>
                                <li className="list-group-item">
                                    Oredered by: {o.user.name}
                                </li>
                                <li className="list-group-item">
                                    Ordered on: {moment(o.createdAt).fromNow()}
                                </li>
                                <li className="list-group-item">
                                    Delivery address: {o.address}
                                </li>
                            </ul>
                            <h4 className="mt-4 mb-4 scl">
                                Total products in the order: {o.services.length} 
                            </h4>

                            {o.services.map((s, sIndex) =>(
                                <div className="mb-4" key={sIndex} style={{padding: '20px', border: '1px solid black'}}>
                                    {showInput('Products name', s.name)}
                                    {showInput('Products price', s.price)}
                                    {showInput('Products total', s.count)}
                                    {showInput('Products Id', s._id)}
                                </div>
                            ))}
                        </div>
                    )
                })}
                 </div>
            </div>

        </LayoutAdmin>
    );
};

export default Orders;