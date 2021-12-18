import React,{useState,useEffect} from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import { getMyOrders } from './helper/userapicalls'
import { Accordion } from 'react-bootstrap'
import OrderTable from "./OrderTable"
export default function UserDashBoard(){
    const [orders,setOrders] = useState([])
    const [error, setError] = useState("");
    const token  = isAuthenticated()&& isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const loadOrders = () => {
        getMyOrders(userId,token)
          .then((data) => {
            console.log(data);
            if (data && data.error) {
              setError(data.error);
            }
            else {
              setOrders(data);
            }
          }
      )
      }
      useEffect( () => {
          loadOrders();
      },[])

    return (
        <Base title="My Orders" description="click the order to expand">
        <Accordion flush>
        {
            orders&&orders.map((order,index)=>{
                return(
                    <Accordion.Item eventKey={index}>
                    <Accordion.Header><b>Order #{index+1}</b></Accordion.Header>
                    <Accordion.Body className="bg-success bg-opacity-15">
                        <OrderTable order={order}/>
                    </Accordion.Body>
                    </Accordion.Item>
                )

        })}
        </Accordion>
        </Base>
    )
}


