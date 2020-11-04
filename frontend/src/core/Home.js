
import React, { useState, useEffect } from 'react';
import { getServices } from './apiCore';
import Card from './Card';
import Search from './Search';
import Menu from './Menu'
import '../App.css'
// import Footer from './Footer';


const Home = () => {

    const [servicesByArrival, setServicesByArrival] = useState([]);

    const [error, setError] = useState(false);



    const loadServicesByArrival = () => {
        getServices().then(data => {
            // console.log(data);

            {
                setServicesByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadServicesByArrival();
    }, []);

    return (
        <div>
            <Menu />

            <br />
            <br />
            <div className="jumbotron jj1 mt-4">
                <h1 className="cll1 text-center mt-5">CleanLife</h1>
                <h3 className="text-center ">A Stepping To Keep Environment Clean</h3>
            </div>
            <div className="container col-md-12 col-sm-12 col-lg-9 ">

                <Search />
                {/* <h2 className="container mb-4">New Arrivals</h2> */}
                <div className="row">

                    {servicesByArrival.map((service, i) => (
                        <div key={i} className="col-lg-4 col-md-4 col-sm-12 mb-3">
                            <Card service={service} />
                        </div>
                    ))}


                </div>

            </div>
            {/* <Footer/> */}
        </div>
    );
};

export default Home;