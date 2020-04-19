const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')

const app = express();
const port = process.env.PORT() || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')
   
// setup handlbars engine and views location
app.set('view engine', 'hbs' )
app.set('views' , viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('' , (req , res ) =>{
res.render('index' , {
title :'Weather App ' ,
name :'Syed Asim Ur Rehman',
Contact :'syedasimurrehman@gmail.com'
})
})

app.get('/about' , (req , res ) =>{
    res.render('about' , {
        title :'About Me ' ,
        name :'Syed Asim Ur Rehman',
        Contact :'syedasimurrehman@gmail.com'
        })
    })

    app.get('/help' , (req , res ) =>{
        res.render('help' , {
            helpText :'If need any help regarding this App so must Contact Us Thanks .' ,
            title: 'Help',
            name : 'Syed Asim Ur Rehman',
        Contact :'syedasimurrehman@gmail.com'
            
            })
        })






 app.get('/weather', (req , res ) => {
    if(!req.query.address){
                return res.send({
                    error : 'you must provide an address'
    })
        
    }
        
        // console.log(req.query.search)

    geocode(req.query.address  , (error , {latitude ,longitude , location} = {} ) => {

            if(error){
              return  res.send({error})
            }

    forcast(latitude ,longitude , (error , forcastData) => {
            if(error){
              return res.send({error})

              }

            res.send({ 
                forcast:forcastData,   
                 location ,
                 address: req.query.address
                  })      
            })   

          })
        
          
          } )


app.get('/products', (req , res ) => {
    if(!req.query.search){
        return res.send({
            error : 'you must provide a search term'
        })

    }

// console.log(req.query.search)

    res.send({
        products : []
    })
} )

app.get('/help/*' , (req , res) => {
    res.render('404' , {
        title: '404' ,
        name : 'Syed Asim Ur Rehman' ,
        
        Contact :'syedasimurrehman@gmail.com',
        errorMessage: 'This  Article Not Found'
    })
   })

app.get('*' , (req , res) => {
 res.render('404' , {
     title: '404' ,
     name : 'Syed Asim Ur Rehman' ,
     
        
        Contact :'syedasimurrehman@gmail.com',
     errorMessage: 'Page Not Found'
 })
})

app.listen(port , ()=>{
    console.log('server is up on port' + port)
})