import { API } from '../config';
import queryString from 'query-string'

export const getServices = sortBy => {
    return fetch(`${API}/services?sortBy=${sortBy}&order=desc&limit=12`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const list = params => {
    const query = queryString.stringify(params)
    console.log('query', query)
    return fetch(`${API}/services/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const read = (serviceId) => {
    return fetch(`${API}/service/${serviceId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = (serviceId) => {
    return fetch(`${API}/services/related/${serviceId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// export const createOrder = (userId, token, createOrderData) => {
//     return fetch(`${API}/order/create/${userId}`, {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ order: createOrderData })
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };



export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// export const createOrder = (userId, token, createOrderData) => {

//     return fetch(`${API}/order/create/${userId}`, {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ order: createOrderData })
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };



export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order: createOrderData})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const updateDetailStatus = (userId, token, deatilId, status) => {
    return fetch(`${API}/detail/${deatilId}/status/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({status, deatilId})
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
export const getStatusValues = (userId, token) => {
    return fetch(`${API}/detail/status-values/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};



export const checkedItem = (item, next) => {
    let message = []
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('message')) {
            message = JSON.parse(localStorage.getItem('message'));
        }
        message.push({
            ...item, 
            count: 1
        });

        // remove duplicates 
        // build an Array from new Set and turn it back into array using Array. from
        // so that later we can re-map it
        // new set will only allow unique values in it 
        // so pass the ids of each object/service
        // if the loop tries to add the same value again, it'll get ignored
        // ...with the array of ids we got on when first map() was used
        // run map() on it again and return the actual service from the cart

        message = Array.from(new Set(message.map((d) => (d._id)))).map(id => {
            return message.find(d => d._id === id );
        });

        localStorage.setItem('message', JSON.stringify(message));
        next();
    }
};

export const getToChecked = () => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('message')) {
            return JSON.parse(localStorage.getItem('message'));
        }

    }
    return [];
};