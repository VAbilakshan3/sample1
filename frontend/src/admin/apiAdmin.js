import { API } from '../config';


export const createCategory = (userId, token, category) => {
    // console.log(name, email, password);
   return  fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    });
};
  




export const createService = (userId, token, service) => {
    // console.log(name, email, password);
   return  fetch(`${API}/service/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: service
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    });
};
  






export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
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


export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({status, orderId})
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


/**
 * to perform crud on service
 * get all services
 * get a single service
 * update single service
 * delete single service
 */

export const getServices = () => {
    return fetch(`${API}/services?limit=undefined`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteService = (serviceId, userId, token) => {
    return fetch(`${API}/service/${serviceId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getService = serviceId => {
    return fetch(`${API}/service/${serviceId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateService = (serviceId, userId, token, service) => {
    return fetch(`${API}/service/${serviceId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: service
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            // content type?
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};




export const getCategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



// export const getDetails = () => {
//     return fetch(`${API}/admin/details`, {
//         method: 'GET'
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };



export const getDetails = (sortBy ) => {
    return fetch(`${API}/details?sortBy=${sortBy}&order=desc&limit=100`, {
        method: "GET",
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};





export const removeItem = detailId => {
    let dashboard = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('dashboard')) {
            dashboard = JSON.parse(localStorage.getItem('dashboard'));
        }

        dashboard.map((detail, i) => {
            if (detail._id === detailId) {
                detail.splice(i, 1);
            }
        });

        localStorage.setItem('dashboard', JSON.stringify(dashboard));
    }
    return dashboard;
};


export const deleteDetail = (detailId, userId, token) => {
    return fetch(`${API}/detail/${detailId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const getContacts = (sortBy ) => {
    return fetch(`${API}/contacts?sortBy=${sortBy}&order=desc&limit=100`, {
        method: "GET",
        // headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`
        // }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
