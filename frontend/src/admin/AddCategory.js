import React, {useState} from 'react';
import LayoutAdmin from '../core/LayoutAdmin';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import {createCategory} from './apiAdmin'



const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)


    // destructure user and token from localstorage
    const {user, token} = isAuthenticated();

    const handleChange = (e) => {
        setError('')
        setName(e.target.value);
        

    };

    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        // make request to api to create category
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error){
                setError(data.error)
            }else {
                setError('');
                setSuccess(true);
            }
        });
    };



    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <h2 className="text-center mb-3 scl">Create Category</h2>
            <hr/>
            <div className="form-group">
                <label className="scl">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required />
                
            </div>
            <button className="btn Instock">Create Category</button>
        </form>
    );

        const showSuccess = () => {
            if(success) {
            return <h3 className="text-success">{name} is created</h3>
            }
        };

        const showError = () => {
            if(error) {
            return <h3 className="text-danger">Category should be unique</h3>
            }
        };
        const goBack = () => (
            <div className="mt-5">
                <Link to="/admin/dashboard" className="text-success">Back to Dashboard</Link>
            </div>
        );




    return (
        <LayoutAdmin className="container mt-5 mb-5 col-lg-5 col-md-6 col-sm-12 ">
        <br/>
        <div className="row jumbotron pt-3 pr-2 pl-2 mt-5 jcol ">
            <div className="col-md-12 offset-md-0">
                {showSuccess()}
                {showError()}
                {newCategoryForm()}
                {goBack()}
                 </div>
            </div>

        </LayoutAdmin>
    );

};


export default AddCategory;








