import React from "react";
import  { useState ,useEffect} from "react";
import Base from "../core/Base";
import {getResult} from "../ml/salesprediction"

export default function SalesPredict() {
    const [sales,setSales] = useState([])
    const preload = () => {
        getResult()
        .then(data=>setSales(data))
        .catch(err=>console.log(err))
        }
    useEffect(() => {
        preload();
      }, []);

    return (
        <Base title="Welcome admin" description="Sales Forecasting">
            <h1>Predicted Sales for next {sales.length} months is </h1>
            <ol className="list-group">
            {sales.map((val,idx)=>{
                return <li className="list-group-item" key={idx}>${parseFloat(val).toFixed(2)}</li>
            })}
            </ol>
            
        </Base>
    )
}