import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import Layout from '../core/Layout'
import {signup} from '../auth/index'

const Signup = () => {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success: false
    });

    const {name, email, password, success, error} = values
    
    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };





const clickSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false });
    signup({name, email, password})
    .then(data => {
        if(data.error) {
            setValues({...values, error: data.error, success: false})
        }else {
            setValues({
                ...values,
                name:'',
                email:'',
                password:'',
                error:'',
                success: true
            })
        }
    })
};


    const signUpForm = () => (
        <form className="">
            <h2 className="scl text-center ">Sign Up</h2>
            <div className="form-group">
                <label className="scl">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} placeholder="Enter Your Username" required/>
            </div>
            <div className="form-group">
                <label className="scl">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} placeholder="Enter Your Email" required />
            </div>
            <div className="form-group">
                <label className="scl">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} placeholder="Enter Your Password" required />
            </div> 
            <button onClick={clickSubmit} className="btn btncl btn-block  text-center">
                Sign Up
            </button>
            <p className="text-muted mt-3 bla text-center"><small>Already have an account? <Link className="scl" to="/signin">Sign In</Link></small></p>
        </form>
        
    );


const showError = () => (
    
     <div className="alert alert-danger" style={{display: error ? '' : 'none'}} >
            {error}
        </div>
    
);
const showSuccess = () => (
    <div className="alert alert-success" style={{display: success ? '' : 'none'}} >
        New account is created. Please <Link to="/signin">Signin</Link>
    </div>
);





     return(
        <Layout className="container col-sm-6 col-md-6 col-lg-4  mt-5 mb-5">
            <br/>
            <div className="jumbotron mt-5 jcol pt-3 pb-3">
    {showSuccess()}
    {showError()}
    {signUpForm()}
    {/* {JSON.stringify(values)} */}
    </div>
    </Layout>
     );
};

export default Signup;