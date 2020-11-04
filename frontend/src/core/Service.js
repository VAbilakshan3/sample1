import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
// import Card2 from './Card2';
import Card from './Card';
import Card1 from './Card1';
// import Card from './Card';
// import Footer from './Footer'


const Service = props => {
    const [service, setService] = useState({});
    const [relatedService, setRelatedService] = useState([]);
    // eslint-disable-next-line
    const [error, setError] = useState(false);

    const loadSingleService = serviceId => {
        read(serviceId).then(data => {
            // eslint-disable-next-line
            if (data.error) {
                setError(data.error);
            } else {
                setService(data);
                // fetch related services
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedService(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const serviceId = props.match.params.serviceId;
        loadSingleService(serviceId);
    }, [props]);

    return (
        <div>
            <Layout  className="container mt-5 col-lg-8 col-md-8 col-sm-12"   >
      <br/>
      

            <div className="row jumbotron jcol mt-5">
                <div className="col-lg-5 col-md-5  col-sm-12 mt-5">
                    <br/>
                    {service && service.description && <Card1 service={service} showViewServiceButton={false} />}
                </div>
                <div className="col-lg-2 col-md-2 col-sm-0"></div>
                <div className="col-lg-5 col-md-5 col-sm-12 ">
                    <h4 className="scl jcol pt-3 pb-3 pr-3 pl-3 head1 text-center mb-2">Related services</h4>
                    {relatedService.map((s, i) => (
                        <div className="mb-3" key={i}>
                            <Card service={s} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
        {/* <Footer/> */}
        </div>
    );
};

export default Service;



















