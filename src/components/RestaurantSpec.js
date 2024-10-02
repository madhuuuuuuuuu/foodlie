import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { fetchRestaurantSpec } from '../apis/api'
import { useDispatch } from 'react-redux'
import { addTocart } from '../Reducer'

function RestaurantSpec() {
 
let [restaurantMenu,setrestaurantMenu]= useState([])
let {restaurantId,restaurantName} = useParams()
    console.log(restaurantId,restaurantName)

    let dispatch= useDispatch();

    useEffect(()=>{
      fetchRestaurantSpec(restaurantId)
      .then((res)=>{
       setrestaurantMenu(res.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(1))
       console.log(res.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(1))
      })
    },[])
  return (
    <div className='container'>
   <h2 style={{marginTop:'80px'}}>{restaurantName}  Menu</h2>
   <div class="accordion" id="accordionExample">
    {restaurantMenu.map((item,i)=>{
       if(item.card.card.itemCards){
        //  return <p>{item.card.card.title}</p>  
        return <>
        {i=0?  <div class="accordion-item">
  <h2 class="accordion-header">
    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`}aria-expanded="true" aria-controls={`#collapse${i}`}>
    {item.card.card.title}
    </button>
  </h2>
  <div id={`collapse${i}`} class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
    <div class="accordion-body">
    <div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card">
      <img src="..." class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="..." class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="..." class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="..." class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">{item.card.info.name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
                    </div>:
                    <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`}aria-expanded="false" aria-controls={`#collapse${i}`}>
                       <b>{item.card.card.title}-{item?.card?.card?.itemCards?.length}</b> 
                        </button>
                    </h2>
                    <div id={`collapse${i}`}class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                        <div class="row row-cols-1 row-cols-md-4 g-4">
                           {item?.card?.card?.itemCards?.map((item,i)=>{
                              return <div class="col">
                              <div class="card">
                              <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`} class="card-img-top" alt="..."/>
                              <div class="card-body">
                                  <h5 class="card-title">{item.card.info.name}</h5>
               <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
               <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg> {item?.card?.info?.ratings?.aggregatedRating?.rating }<span style={{marginLeft:"10px"}}>{item?.card?.info?.ratings?.aggregatedRating?.ratingCount}</span></p>
                                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                  <p class="card-text">{item.card.info.price/100} rps</p>
                                  <button type="button" class="btn btn-success" onClick={()=>{
                        dispatch(addTocart({Name:item.card.info.name, Price:item.card.info.price, img:`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`}))
                      }}>Add to cart</button>
                              </div>
                              </div>
                          </div>
                           })}
                           
                    </div>
                        </div>
                    </div>
                    </div>
        }
     

        </>   
      } 
       }     
    )}


</div>
   
</div>

  )
}

export default RestaurantSpec