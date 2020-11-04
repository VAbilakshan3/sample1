import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddService from './admin/AddService';
import Service from './core/Service';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageServices from './admin/ManageServices';
import UpdateService from './admin/UpdateService';
import UpdateCategory from './admin/updateCategory';
import AddDetail from './user/AddDetail';
import AddContact from './user/AddContact';
import CreateDetails from './user/CreateDetails'
import CheckedDetails from './core/CheckedDetails'
import GetMessage from './user/GetMessage'
import thanksForthePayment from './core/thanksForthePayment'












const Routes = () => {
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact  component={Home}/>
            <Route path="/signin" exact  component={Signin}/>
            <Route path="/signup" exact  component={Signup}/>
            <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            <AdminRoute path="/create/category" exact component={AddCategory} />
            <AdminRoute path="/create/service" exact component={AddService} />
            <Route path="/service/:serviceId" exact  component={Service}/>
            <Route path="/cart" exact  component={Cart}/>
            <AdminRoute path="/admin/orders" exact component={Orders} />
            <PrivateRoute path="/profile/:userId" exact component={Profile} />
            <AdminRoute path="/admin/services" exact component={ManageServices} />
            <AdminRoute path="/admin/service/update/:serviceId" exact component={UpdateService} />
            <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
            <PrivateRoute path="/create/detail" exact component={AddDetail} />
            <PrivateRoute path="/create/contact" exact component={AddContact} />
            <AdminRoute path="/admin/details" exact component={CreateDetails} />
            <AdminRoute path="/admin/contacts" exact component={GetMessage} />
            <AdminRoute path="/admin/checkedDetails" exact component={CheckedDetails} />
            <PrivateRoute path="/thanksForthePayment" exact component={thanksForthePayment} />

        </Switch>
    </BrowserRouter>
    );
};
export default Routes;