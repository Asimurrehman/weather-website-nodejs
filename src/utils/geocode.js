const request = require('request');


const geocode = (address , callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1Ijoic3llZC1hc2ltLTI5IiwiYSI6ImNrOHZzdW9rNzA3cDYzbmxwdzFpdW90eGEifQ.El5yJZkx-4-3i4Dfg1McjQ&limit=1';
    
    request({ url , json: true } , (error , { body })=>{
        if(error){
         callback('Unable to connect to location services', undefined )

        }else if(body.features.length === 0){
         callback('Unable to find Location  Try Another', undefined )
            
        }
        else{
            callback(undefined , {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
                
            })
        }
    })
}

module.exports = geocode