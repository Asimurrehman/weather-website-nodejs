const request = require('request')


const forecast = ( latitude , longitude ,  callback )=> {
    
   


 const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=3b52d0cfc3d6d794732f76ef138cf233'
// const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=25.1933895&lon=66.5949611&appid=3b52d0cfc3d6d794732f76ef138cf233'

request({ url , json : true} , (error , {body} ) => {


    if(error){
        callback('Unable to connect to location services', undefined )
    } else if(body.error){
        callback('Unable to find Location', undefined )

    } else {
        const temp = body.current.temp - 273.27
    
             const finaltemp= temp.toFixed(2)

          callback(undefined , ' The Current Temperature is ' + finaltemp + ' deg , and air pressure of  ' +  body.current.pressure + ' atm with wind speed of ' + body.current.wind_speed + ' mps . the Weather is ' + body.current.weather[0].description  )
    }
})

}

module.exports = forecast