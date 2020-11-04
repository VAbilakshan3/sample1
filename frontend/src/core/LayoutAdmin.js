import React from 'react';
import MenuAdmin from './MenuAdmin'
import '../App.css'

const LayoutAdmin = ({ title = "", description = "", className, children }) => (
    <div>
        <MenuAdmin />
        <br />
        <br />
        <div className="">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);




export default LayoutAdmin;