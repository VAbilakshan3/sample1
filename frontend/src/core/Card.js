import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
// import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
import '../App.css';
 
const Card = ({
  service,
  showViewServiceButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveServiceButton = false,
  // showRemoveDetailButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(service.count);
 
  const showViewButton = showViewServiceButton => {
    return (
      showViewServiceButton && (
        <Link to={`/service/${service._id}`} className="mr-2">
          <span className="mx-auto  float-left ">
          
         <strong> <i className="fas fa-eye Icon1 "> </i></strong>   
            </span>
        </Link>
      )
    );
  };
  
const addToCart = () => {
    // console.log('added');
    addItem(service, setRedirect(true));
  };
 
  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
 
  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <span onClick={addToCart} className="mx-auto float-left  " >
          {/* Add to cart */}
         <Link> <i className='fas fa-shopping-cart Icon1' ></i> </Link>
        </span>
      )
    );
  };
 
  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="mx-auto Instock">In Stock </span>
    ) : (
      <span className="mx-auto Instock">Out of Stock </span>
    );
  };
 
  const handleChange = serviceId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(serviceId, event.target.value);
    }
  };
 
  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(service._id)} />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveServiceButton => {
    return (
      showRemoveServiceButton && (
        <button
          onClick={() => {
            removeItem(service._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          {/* Remove */}<i className='fas fa-trash-alt'></i>
        </button>
      )
    );
  };
  return (
    <div className="card box1  " id="hoverbo">
      <div className="card-header card-header-1 ">{service.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <div className="imgEffect">
          <div className="pr-4 pl-4 mb-3">
        <ShowImage className="effect1 mb-3" item={service} url="service" />
        </div>
        <div className="middleEffect">
        
          <div className="btnMiddle "><span className="mr-auto">{showViewButton(showViewServiceButton)  }             {showAddToCartBtn(showAddToCartButton)} </span></div>
        </div> 
        </div>
        <div className="text-center mb-3">
                 {/* <p className="card-p card-item black text-center mt-2 pt-2 pb-2 cardimg1">Rs {service.price}</p>  */}
       <span onClick={addToCart} className="card-p card-item text-center mt-2 pt-2 pb-2 cardimg1  mt-3 mb-3 pr-3 pl-3 "> <Link className="scl"  to="/cart">Buy Now</Link></span>

        </div>
        <div className="mb-4 mt-4">
        <p className="text-cente mb-3 "><strong className="scl">Type of Material:</strong> {service.description.substring(0, 90)} </p>
        </div>
        {/* <p className="blac card-item">Category: {service.category && service.category.name}</p> */}
        {/* <p className="black-8 card-item">Added on {moment(service.createdAt).fromNow()}</p> */}
        <div className="row r1 text-center">
          <div className=" col-md-6 col-sm-3 col-lg-6  ">
        {showStock(service.quantity)}
        </div>
        <div className="col-md-6 col-sm-3 col-lg-6 ">
        <span  className="card-p card-item text-center mb-4 cardimg2 pt-1  pb-1 ">Rs {service.price}</span>
        </div>
        {/* <div className="col-md-4 col-sm-4 col-lg-4">
        {showAddToCartBtn(showAddToCartButton)}
        </div> */}
        </div>
        <br /> 
        <div>{showRemoveButton(showRemoveServiceButton)}
 
 {showCartUpdateOptions(cartUpdate)}</div>
      </div>
    </div>
  );
};
 
export default Card;



















