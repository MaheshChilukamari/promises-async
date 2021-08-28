
import setText, {appendText, showWaiting, hideWaiting} from "./results.mjs";

export function get() {
    console.log(' in get method');
    axios.get('http://localhost:3000/orders/1')
    .then( ({data}) => {
        setText(JSON.stringify(data));
    } );
}

export function getCatch() {
    console.log(' in getCatch method');
    axios.get('http://localhost:3000/orders/11')
    .then( ({data}) => {
        setText(JSON.stringify(data));
    })
    .catch( err => setText(err));
    
}

export function chain() {
    axios.get('http://localhost:3000/orders/1')
    .then( ({data}) => {
       return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    .then( ({data}) => {
        setText(`city: ${data.city}`);
    });    
}

export function chainCatch() {
    axios.get('http://localhost:3000/orders/1')
    .then( ({data}) => {
       return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    .catch( err => {
        setText(" first catch"+ err);        
    })
    .then( ({data}) => {
        setText(`city: ${data.my.city}`);
    })
    .catch(err => setText("second catch"+ err));

}

export function final() {
    showWaiting();
    axios.get('http://localhost:3000/orders/1')
    .then( ({data}) => {
       return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    .catch( err => {
        setText(" first catch"+ err);   
        //throw new Error("second error");     
    })
    .then( ({data}) => {
        setText(`city: ${data.city}`);
    })
    .catch(err => setText("second catch "+ err))
    .finally( () => {
        setTimeout( () => { 
        hideWaiting();
        }, 1500);
        appendText(" completely done!");
    }

    );



}