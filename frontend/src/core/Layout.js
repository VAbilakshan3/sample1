import React from 'react';
import Menu from './Menu'
import '../App.css'

const Layout = ({ title = "", description = "", className, children }) => (
    <div>
        <Menu />
        <br />
        <br />
        <div className="">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);




export default Layout;