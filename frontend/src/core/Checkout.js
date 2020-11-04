import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getServices, getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import {emptyCart} from './cartHelpers'
// import Card from './Card';
// import Search from './Search';
import {isAuthenticated} from '../auth/index'
import {Link, Redirect} from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react';



const Checkout = ({services, setRun = f => f, run = undefined}) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: "",
        redirectTothanksForthePayment: false
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error){
                setData({...data, error: data.error})
            }else {
                setData({ clientToken: data.clientToken })
            }
        })
    }


    useEffect(() => {
        getToken(userId, token)
    }, [])

    const handleAddress = event => {
        setData({...data, address: event.target.value});
    }


    const getTotal = () => {
        return services.reduce((currentValue, nextValue) => {
                return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
        <div>{showDropIn()}</div>
        ) : (
            <div className="text-center">
                <Link to="/signin" >
                <button className="btn bgg bla1 brr">Sign in to checkot</button>

            </Link>
            </div>
            
);
    };
    let deliveryAddress = data.address;

    const buy = () => {
        setData({ loading: true })

        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            // console.log(data)
            nonce = data.nonce
            // once you have nonce (card type, card number ) send nonce as 'paymentMethodNonce'
            // and also total to be chaged
            // console.log('send nonce and total to process: ', nonce, getTotal(services))
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(services)
            }
            processPayment(userId, token, paymentData)
            .then(response => {
                console.log(response);

                
                // empty cart
                // create order

                const createOrderData = {
                    services: services,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    address: deliveryAddress
                }

                createOrder(userId, token, createOrderData)
                .then(response => {
                    emptyCart(() => {
                        setRun(!run); // run useEffect in parent Cart
                        console.log("payment success and empty cart");
                        setData({ loading: false});
                    });
                setData({ loading: false, success: true , redirectTothanksForthePayment: true });

                })


            })
            .catch(error => {
                console.log(error);
                setData({ loading: false });
            });
    })
    .catch(error => {
        // console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
    });
};

   

    const showDropIn = () => (
        <div onBlur={() => setData({...data, error: ""})}>
            {data.clientToken !== null && services.length > 0 ? (
                <div>
                    <div>
                        <div className="gorm-group mb-3">
                            <label className="text-muted scl">Delivery address</label>
                            <textarea  onChange={handleAddress}  className="form-control" value={data.address} placeholder="Type your delivery address here..."/>
                        </div>
                    </div>
                    <DropIn options={{
                        authorization: data.clientToken,
                        paypal: {
                            flow: "vault"
                        }
                    }} onInstance={instance => (data.instance = instance )}/>
                    <button onClick={buy} className="btn bgg btn-block">
                        {/* Pay  */}
                        <strong>
                         <i className="fab fa-amazon-pay"></i></strong></button>
                </div>
            ) : null }
        </div>
    );

    const showError = error => (
        
            <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                {error}
            </div>
        
    );

    const showSuccess = success => (
        
        <h2 className="alert scl" style={{display: success ? '' : 'none'}}>
            Payment successful!
            {/* <Redirect to='/cart/thanksForthePayment'/> */}
        </h2>
    
);
const redirectthanksForthePayment = () => {
    if(data.success) {
         {
            return <Redirect to="/thanksForthePayment" />;
        }
    }
};

    const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;


return (
    <div>
        <h5 className="scl jcol pt-3 pb-3 pr-3 pl-3 head1 text-center " style={{align:'right'}}> Total: Rs: {getTotal()}</h5>
        {showLoading(data.loading)}
        {showError(data.error)}
        {showCheckout()}
        {showSuccess(data.success)}

        {redirectthanksForthePayment(data.redirectTothanksForthePayment)}
    </div>
);
};



export default Checkout;



























































