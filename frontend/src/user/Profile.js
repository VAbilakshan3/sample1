
import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
// import { read } from '../core/apiCore';
import { read, update, updateUser } from './apiUser';


const Profile = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });
    
    const {token} = isAuthenticated()

    const { name, email, password, error, success} = values


    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };
    // const init = userId => {
    //     console.log(userId)
        // read(userId, token).then(data => {
        //     if(data.error) {
        //         setValues({...values, error: true})
        //     }else {
        //         setValues({...values, name: data.name, email: data.email})
        //     }
        // })

    // }

    useEffect(() => {
        init(match.params.userId)
    }, [])



    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        success: true
                    });
                });
            }
        });
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/user/dashboard" />;
        }
    };


    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="scl">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name} placeholder="Change Your Username" />
            </div>
            <div className="form-group">
                <label className="scl">Email</label>
                <input type="email" onChange={handleChange('email')} className="form-control" value={email} placeholder="Change Your Email"/>
            </div>
            <div className="form-group">
                <label className="scl">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control" value={password} placeholder="Change Your Password" />
            </div>

            <button onClick={clickSubmit} className="btn btncl">
                Change
            </button>
        </form>
    );

    return (
        
            <Layout className="container mt-5 col-sm-6 col-md-6 col-lg-4 ">
                <br/>
                
                   <div className="jumbotron bxs mt-5 pt-3 pb-3">
                   
                   <h2 className="text-center mb-5 scl">Update Your Profile</h2>
                   {profileUpdate(name, email, password)}
                   {redirectUser(success)}
                   </div>
                   
            </Layout>
       
       );
    
};


export default Profile;