import React,{useState,useEffect} from 'react'
import { fetchSearchRestaurants } from '../apis/api'
import Shimmer from '../Shimmer'
import { useNavigate } from 'react-router-dom'

function SearchRestaurant() {
    const [restaurantName,setRestaurantName]= useState("")
    const[restaurants, setRestaurants]= useState([])

    let navigate = useNavigate();

    useEffect(()=>{
       setRestaurants([])
        if(restaurantName?.length>2){
            fetchSearchRestaurants(17.37240, 78.43780, restaurantName)
            .then((res)=>{
                setRestaurants(res.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT)
            })
            console.log(restaurants)
        }    
    },[restaurantName])
  return (
    <div className='container'>
         <div style={{marginTop:'90px', textAlign:'center',marginBottom:'40px'}} >
       <h3>SearchRestaurant</h3> 
       <input
       placeholder='search for restaurant'
       value={restaurantName}
       onChange={(e)=>{
          setRestaurantName(e.target.value)
       }}
       />
       <div class="row row-cols-1 row-cols-md-4 g-4">
        {restaurants?.cards?.map((item,i)=>{
         if(item?.card?.card?.info){
            return <div class="col" onClick={()=>{
              navigate(`/restaurant/${item?.card?.card?.info.id}/${item?.card?.card?.info.name}`)
            }} >
            <div class="card">
              <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item?.card?.card?.info?.cloudinaryImageId}`} class="card-img-top image" alt="..."/>
              <div class="card-body">
                <h5 class="card-title">{item?.card?.card?.info.name}</h5>
                
                <p class="card-text"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg><span style={{marginLeft:'7px',marginRight:'15px'}}>{item?.card?.card?.info.avgRating?item?.card?.card?.info.avgRating:item?.card?.card?.info.avgRatingString}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hourglass-split" viewBox="0 0 16 16">
          <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
        </svg><span style={{marginLeft:'5px'}}>{item?.card?.card?.info.sla.slaString}</span>
                </p>
                <p class="card-text">{item?.card?.card?.info.cuisines.join(",")}</p>
                <p class="card-text">{item?.card?.card?.info.areaName}</p>
              </div>
            </div>
          </div>
         }
})}
       </div>
        </div>
    {restaurantName?.length>1 || restaurants?.length ==0 ? <Shimmer/> :""}
    </div>
   
       
  )
}

export default SearchRestaurant