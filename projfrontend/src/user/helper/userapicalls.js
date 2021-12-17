import { API } from "../../backend";

export const getMyOrders = (userId,token) => {
    return fetch(`${API}/order/my/${userId}`, {
        method: "GET" ,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        }
    }).then((resp) => { return resp.json();})
        .catch(err => {
            console.log(err);
    })
}

export const updateOrderStatus = (userId,token,orderId,status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({status:status})
    }
    ).then((resp) => {
        return resp.json();
    })
        .catch((err) => {
            console.log(err);
    })
}
