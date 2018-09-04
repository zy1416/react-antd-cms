export default function Fetch(url, data = {}, {method = 'POST'} = {}) {
    return fetch(url, {
        body: JSON.stringify(data),
        method
    }).then((response) =>{
        if(response.ok){
            return response.json();
        }else{
           return Promise.reject(response)
        }
    })
}