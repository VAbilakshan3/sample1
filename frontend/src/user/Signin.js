import React, { useState } from "react";
import { Redirect ,Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        email: "Abii@gmail.com",
        password: "abi12344",
        err: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, err, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, err: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.err) {
                setValues({ ...values, err: data.err, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (
        <form>
            <h2 className="scl text-center">Sign In</h2>
            <div className="form-group">
                <label className="scl" >Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email} 
                    placeholder="Enter Your Email"
                    required
                />
            </div>

            <div className="form-group">
                <label className="scl"  >Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control "
                    value={password}
                    placeholder="Enter Your Password"
                    required
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-block btncl  mt-5">
                Sign in
            </button>
            <p className="text-muted mt-3 bla text-center "><small>Don't have an account yet?  <Link className=" scl" to="/signup">Sign up</Link></small></p>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: err ? "" : "none" }}
        >
            {err}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/"/>;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout className="container col-sm-6 col-md-6 col-lg-4 mt-5"  >
            <br />
          <div className="jumbotron jcol  pt-3 pb-3 mt-5 ">
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
          </div>
        </Layout>
    );
};

export default Signin;




































































