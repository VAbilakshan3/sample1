import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import { createContact } from './apiUser';
import { getContacts,getCategories } from '../admin/apiAdmin';
import { Redirect } from "react-router-dom";



const AddContact = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        text: '',
        phone: '',
        categories: [],
        category: '',
        loading: false,
        error: '',
        createdContact: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        text,
        phone,
        loading,
        categories,
        category,
        error,
        createdContact,
        // eslint-disable-next-line
        redirectToProfile,
        formData
    } = values;

    // load categories and set form data
    const init = () => {
        getContacts().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    contacts: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
        // eslint-disable-next-line
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createContact(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    text:'',
                    phone: '',
                    categories: '',
                    quantity: '',
                    loading: false,
                    createdContact: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="" onSubmit={clickSubmit}>
            {/* <h4>Post Photo</h4> */}
            {/* <div className="form-group">
                <label className="btn btn-secondary">
                    <input  onChange={handleChange('photo')}  type="file" name="photo" accept="image/*" />
                </label>
            </div> */}

            <div className="form-group">
            <h2 className="text-center mb-3 scl">Contact Us</h2>
            <hr/>
                <label className="scl">Name</label>
                <input onChange={handleChange('name')}  type="text" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="scl">Email</label>
                <input onChange={handleChange('text')} type="text" className="form-control" value={text} />
            </div>

            <div className="form-group">
                <label className="scl">Description</label>
                <textarea  onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="scl">Phone</label>
                <input onChange={handleChange('phone')} type="text" className="form-control" value={phone} />
            </div>

            {/* <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div> */}

            {/* <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div> */}

         

            <button className="btn btncl">Send</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: createdContact ? '' : 'none' }}>
            <h2> Message Send Successfully!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

        const redirectDashboard = () => {
            if (redirectToProfile) {
                if (showSuccess === true) {
                    return <Redirect to="/admin/dashboard" />;
                } else {
                    return <Redirect to="/user/dashboard"/>;
                }
            }
            // if (isAuthenticated()) {
            //     return <Redirect to="/" />;
            // }
          };

    return (
        <Layout className="container mt-5 mb-5 col-lg-4 col-md-6 col-sm-12">
            <br/>
            <div className="row jumbotron pt-3 pr-2 pl-2 mt-5 jcol ">
                <div className="col-md-12 offset-md-0">
                    
                    {newPostForm()}
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {/* {redirectDashboard()} */}
                </div>
            </div>
        </Layout>
    );
};

export default AddContact;







