import React from 'react'

const OrderTable =  (props) => {
    const {status,amount,products} = props.order
    return(
    <table className="table table-light">
        <thead>
            <tr colSpan="3">
                <th>Status</th>
                <th>{status}</th>
            </tr>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
        </thead>
        <tbody>
            {products && products.map((pro,idx)=>{
                return(
                    <tr>
                        <td key={idx}>{pro.name}</td>
                        <td key={idx+1}>{pro.price}</td>
                        <td key={idx+2}>{pro.count}</td>
                    </tr>
                )
            })}
        </tbody>
        <tfoot>
            <tr>
                <th colSpan="2">Total</th>
                <td>{amount}</td>
            </tr>
        </tfoot>
    </table>
    )
}

export default OrderTable