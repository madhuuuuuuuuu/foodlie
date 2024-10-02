import React,{useState,useEffect} from 'react'
import '../App.css'
import Location from './Location'
import InitialRestaurant from './InitialRestaurant'

function Home() {

   
  let [location,setlocation]=useState({
          lat : "17.37240",
          lng : "78.43780"
  })

  
  return (
    <div className='container-fluid' style={{marginTop:"70px"}}>
      <div className='row'> 
   <Location setlocation= {setlocation}/>

   <InitialRestaurant 
   location={location}
   setlocation={setlocation}/>

      </div>
    </div>
  )
}

export default Home