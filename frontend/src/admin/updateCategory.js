import React, { useState, useEffect } from 'react';
import LayoutAdmin from '../core/LayoutAdmin';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getCategory, updateCategory } from './apiAdmin';
// {category: ["5cd0258f2793ec6e100bc191"], price: []}
// http://localhost:3000/admin/category/update/5cd0258f2793ec6e100bc191
const UpdateCategory = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        error: '',
        redirectToProfile: false,
        formData: ''
    });

    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const { name, error, redirectToProfile } = values;

    const init = categoryId => {
        getCategory(categoryId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name
                });
            }
        });
    };

    useEffect(() => {
        init(match.params.categoryId);
    }, []);

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const submitCategoryForm = e => {
        e.preventDefault();
        // update with ? you should send category name otherwise what to update?
        const category = {
            name: name
        };
        updateCategory(match.params.categoryId, user._id, token, category).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    error: false,
                    redirectToProfile: true
                });
            }
        });
    };

    const updateCategoryForm = () => (
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            <form className="mb-5" onSubmit={submitCategoryForm}>
                <span className="login100-form-title p-b-32 m-b-7">Update Category Form</span>
                <span className="txt1 p-b-11">Category Name</span>
                <br />
                <br />
                <div className="wrap-input100 validate-input m-b-36">
                    <input
                        onChange={handleChange('name')}
                        value={name}
                        className="input100"
                        type="text"
                        required
                        name="name"
                    />
                </div>
                <div className="w-size25">
                    <button type="submit" className="flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );

    const showError = () => (
        <div className={'alert alert-danger'} role="alert" style={{ display: error ? '' : 'none' }}>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            {error}
        </div>
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/categories" />;
            }
        }
    };

    const goBackBTN = () => {
        return (
            <div className="mt-5">
                <Link to="/admin/categories" className="text-info">
                    Back To Admin Home
                </Link>
            </div>
        );
    };

    return (
        <LayoutAdmin className="container mt-5 mb-5 col-lg-4 col-md-6 col-sm-12 ">
        <br/>
        <div className="row jumbotron pt-3 pr-2 pl-2 mt-5 jcol ">
            <div className="col-md-12 offset-md-0">
                    {showError()}
                    {updateCategoryForm()}
                    {goBackBTN()}
                    {redirectUser()}
                </div>
            </div>
        </LayoutAdmin>
    );
};

export default UpdateCategory;