import React from "react";
import { API } from "../config";
import '../App.css'

const ShowImage = ({ item, url }) => (
    <div className="service-i">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="imgg1 mx-auto img-responsive"
            
        />
    </div>
);
// const ShowImaged = ({ items, url }) => (
//     <div className="service-img">
//         <img
//             src={`${API}/${url}/photo/${items._id}`}
//             alt={items.name}
//             className="mb-3"
//             // style={{ maxHeight: "100%", maxWidth: "100%" }}
//         />
//     </div>
// );

export default ShowImage;



// export default ShowImaged;