import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage1 from './ShowImage1';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
import '../App.css';
 
const Card1 = ({
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
          <span className=" ">
          
             <i className="fas fa-eye Icon1 "> </i>
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
        <span onClick={addToCart} className=" ">
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
          <div className="input-group">
            <div className="input-group-prepend">
              {/* <span className="input-group-text"></span> */}
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
        <span
          onClick={() => {
            removeItem(service._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          // className="Icon1"
        >
       <Link>  {/* Remove */}<i className='fas fa-trash-alt Icon1'></i></Link>
        </span>
      )
    );
  };
  return (
<div className="card box1 ">
      <div className="card-header card-header-1 ">{service.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <div className="imgEffect">
          <div >
        <ShowImage1 className="effect1" item={service} url="service" />
        </div >
        <div className="middleEffect">
        
          <div className="btnMiddle "><span className="mr-auto ">{showViewButton(showViewServiceButton)  }                 {showRemoveButton(showRemoveServiceButton)} </span></div>
        </div> 
        </div>
        <div className="text-center mt-3 mb-3">
        <span className="card-p card-item black text-center mt-5 pt- pb-2 Instock  pt-2 pb-2  mb- pr-3 pl-3">Rs {service.price}</span>
        </div>
        <div className="mb-5">
        <p className="text-cente mb-3"><strong className="scl">Type of Material:</strong> {service.description.substring(0, 90)} </p>
        </div>
       {/* <p className="blac card-item">Category: {service.category && service.category.name}</p> */}
        {/* <p className="black-8 card-item">Added on {moment(service.createdAt).fromNow()}</p> */}
        <div className="row r1 text-center">
          <div className="col-md-6 col-sm-6 col-lg-6 mb">
        {showStock(service.quantity)}
        </div>
        {/* <div className="col-md-3 col-sm-3 col-lg-3 ">
        {showViewButton(showViewServiceButton)}
        </div> */}
        {/* <div className="col-md-3 col-sm-3 col-lg-3">
        {showRemoveButton(showRemoveServiceButton)}

        {showAddToCartBtn(showAddToCartButton)}
        </div> */}
        <div className="col-md-6 col-sm-6 col-lg-6 mb ">
        {showCartUpdateOptions(cartUpdate)}

        </div>
        </div>
        <br />
        <br />
        <br />
 
        
 
        
        {/* <div className="row r1">
        <div className="col-lg-6">
        </div>
 
        </div> */}
        
      </div><br />
        <br />
        
    </div>






    // <div className="card box2 ">
    //   <div className="card-header card-header-1 ">{service.name}</div>
    //   <div className="card-body">
    //     {shouldRedirect(redirect)}
    //     {/* <div className="imgEffect"> */}
    //       {/* <div > */}
    //     <ShowImage1 className="effect1" item={service} url="service" />
    //     {/* </div> */}
    //     {/* <div className="middleEffect">
        
    //       <div className="btnMiddle1 "><span className="mr-auto">{showViewButton(showViewServiceButton)  }                 {showRemoveButton(showRemoveServiceButton)} </span></div>
    //     </div> 
    //     </div> */}
    //     <div className="text-center">
    //     <p className="card-p card-item black text-center mt-2 pt-2 pb-2 cardimg1">Rs {service.price}</p>
    //     </div>
    //     <p className="text-center ">{service.description.substring(0, 200)} </p>

    //    {/* <p className="blac card-item">Category: {service.category && service.category.name}</p> */}
    //     {/* <p className="black-8 card-item">Added on {moment(service.createdAt).fromNow()}</p> */}
    //     <div className="row r1">
    //       <div className="col-md-6 col-sm-6 col-lg-6 text-center ">
    //     {showStock(service.quantity)}
    //     </div>
    //     {/* <div className="col-md-3 col-sm-3 col-lg-3 ">
    //     {showViewButton(showViewServiceButton)}
    //     </div> */}
    //     <div className="col-md-6 col-sm-6 col-lg-6 text-center ">
       

    //     {showAddToCartBtn(showAddToCartButton)}
    //     </div>
    //     {/* <div className="col-md-4 col-sm-4 col-lg-4 ">
    //     {showCartUpdateOptions(cartUpdate)}

    //     </div> */}
    //     </div>
    //     <br />
    //     <br />
    //     <br />
 
        
 
        
    //     <div className="row r1">
    //     <div className="col-lg-6">
    //     </div>
 
    //     </div>
        
    //   </div><br />
    //     <br />
        
    // </div>
  );
};
 
export default Card1;














