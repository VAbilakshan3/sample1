import React, { useState, useEffect } from 'react';
import LayoutAdmin from '../core/LayoutAdmin';
import { isAuthenticated } from '../auth/index';
// eslint-disable-next-line
import { Link, Redirect } from 'react-router-dom';
import { createService, getCategories } from './apiAdmin';




const AddService = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdService: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        // eslint-disable-next-line
        category,
        quantity,
        photo,
        loading,
        error,
        createdService,
        // eslint-disable-next-line
        redirectToProfile,
        formData
    } = values;

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
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

        createService(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    redirectToProfile: true,
                    createdService: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h2 className="text-center mb-3 scl">Create Products</h2>
            <hr/>
            <h4 className="scl">Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="scl">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="scl">Type Of Material</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>
            <div className="form-group">
                <label className="scl">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="scl">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label className="scl">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn Instock">Create Products</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: createdService ? '' : 'none' }}>
            <h2>{`${createdService}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );
        const redirectUser = () => {
            if (redirectToProfile) {
                if (!error) {
                    return <Redirect to="/" />;
                }
            }
        };
    

    return (
        <LayoutAdmin className="container mt-5 mb-5 col-lg-5 col-md-6 col-sm-12 ">
        <br/>
        <div className="row jumbotron pt-3 pr-2 pl-2 mt-5 jcol ">
            <div className="col-md-12 offset-md-0">                   
                    {newPostForm()}
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {redirectUser()}
                    
                </div>
            </div>
        </LayoutAdmin>
    );
};

export default AddService;

















