import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import { getCart } from './cartHelpers';
import Card1 from './Card1';
import Card2 from './Card2';
import Checkout from './Checkout';
// import Footer from './Footer'


const Cart = () => {
  const [items, setItems] = useState([]);
  const [cartSize, setCartSize] = useState([]);
  const [run, setRun] = useState(false);
 
  useEffect(() => {
    console.log('MAX DEPTH ...');
    setItems(getCart());
  }, [run]);
 
  const showItems = items => {
    return (
      <div>
        <h4 className="scl jcol pt-3 pb-3 pr-3 pl-3 head1 text-center mb-4"> Cart ( {`${items.length}`} )</h4>
        <hr />
        <div className="row">
        {items.map((service, i) => (
        <div key={i} className="col-lg-6 col-md-6 col-sm-12 ">
       <br></br>
          <Card2
            
            service={service}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveServiceButton={true}
            setRun={setRun}
            run={run}
            // changeCartSize={changeCartSize}
          />
        </div>

        ))}
        </div>
        {/* <br />
        <br />
        <br /> */}

      </div>
    );
  };
 
  const noItemsMessage = () => (
    <div>
    <h4 className="scl jcol pt-3 pb-3 pr-3 pl-3 head1 text-center">
      Your Cart is Empty</h4> <br />
      <Link className="linkk" to="/"><h5 className="scl jcol pt-3 pb-3 pr-3 pl-3  head1 text-center "> <div className="linkk">Time to shopping.</div></h5> </Link>
      </div>
  );
 
  return (
    <div>
    <Layout  className="container  mt-5 col-lg-10 col-md-10 col-sm-12">
      <br/>
      <div className="row jumbotron jcol mt-5">
        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">{items.length > 0 ? showItems(items) : noItemsMessage()} </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <h4 className="mb-3 scl jcol pt-3 pb-3 pr-3 pl-3 head1 text-center">Your Cart Summary</h4>
          <hr />

          <Checkout services={items} setRun={setRun} run={run} />
        </div>
       
      </div>
    </Layout>
     {/* <Footer/> */}
     </div>
  );
};
 
export default Cart;