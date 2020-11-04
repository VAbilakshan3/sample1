import React, { useState, useEffect } from "react";
import LayoutAdmin from "../core/LayoutAdmin";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getServices, deleteService } from "./apiAdmin";

const ManageServices = () => {
    const [services, setServices] = useState([]);

    const { user, token } = isAuthenticated();

    const loadServices = () => {
        getServices().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setServices(data);
            }
        });
    };

    const destroy = serviceId => {
        deleteService(serviceId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadServices();
            }
        });
    };

    useEffect(() => {
        loadServices();
    }, []);

    return (
        <LayoutAdmin className="container mt-5 mb-5 col-lg-8 col-md-8 col-sm-12 ">
        <br/>
        <div className="row jumbotron pt-2 pr-0 pl-0 mt-5 jcol ">
            <div className=" col-lg-12 col-md-12">
                    <h4 className="text-center scl">
                         Products
                    </h4>
                    <hr />
                    <ul className="list-group">
                        {services.map((s, i) => (
                            <div 
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong className="col-lg-4 col-md-4 col-sm-4 scl">{s.name}</strong>
                                <Link to={`/admin/service/update/${s._id}`}>
                                    {/* <div className="text-center"> */}
                                    <span className=" clickmy col-lg-4 col-md-4 col-sm-4">
                                        Update
                                    </span>
                                    {/* </div> */}
                                </Link>
                                <Link>
                                <span
                                    onClick={() => destroy(s._id)}
                                    className=" col-lg-4 clickmy col-md-4 col-sm-4  pr-1 pl-1 "
                                >
                                    Delete
                                </span>
                                </Link>
                            </div>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </LayoutAdmin>
    );
};

export default ManageServices;