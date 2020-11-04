import React from "react";
import { API } from "../config";
import '../App.css'

const ShowImage2 = ({ item, url }) => (
    <div className="s">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="img-responsive"
            style={{ maxHeight: "50px", maxWidth: "50px" }}
        />
        {/* <br />
        <br />
        <br /> */}
    </div>
);
// const ShowImaged = ({ items, url }) => (
    // <div className="service-img">
    //     <img
    //         src={`${API}/${url}/photo/${items._id}`}
    //         alt={items.name}
    //         className="mb-3"
    //         // style={{ maxHeight: "100%", maxWidth: "100%" }}
    //     />
    // </div>
// );

export default ShowImage2;



// export default ShowImaged;