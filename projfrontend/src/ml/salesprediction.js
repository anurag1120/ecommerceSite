const salesData  = require('./sales-data.json')
const ARIMAPromise = require('arima/async')
export const getResult = ()=>{
    return ARIMAPromise.then(ARIMA => {
    const ts = salesData.map((obj)=>obj.sales_diff);
    const arima = new ARIMA({ p: 1, d: 1, q: 12}).train(ts)
    const [pred, errors] = arima.predict(12)
    return pred;
    })
}







