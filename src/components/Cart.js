import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { removeFromCart } from "../Reducer";

function Cart() {
  let cartItems = useSelector((state)=>{
    return state.cartItems
  })
   console.log(cartItems)

   let totalprice= cartItems.reduce((acc,item,i)=>{
    return acc+item.Price
   },0)
 

  let dispatch = useDispatch();
  return (
    <div>
    <h2 style={{marginTop:'100px',textAlign:'center'}}>CartItems</h2>
    <h4 style={{textAlign:'end'}}>Price={totalprice/100}</h4>
    <div className="container">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      {cartItems.map((item,i)=>{
       return <div class="card mb-3">
       <div class="row g-0">
         <div class="col-md-4">
           <img src={item.img} class="img-fluid rounded-start" alt="..."/>
         </div>
         <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title">{item.Name}</h5>
             <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
             <p class="card-text"><b>{item.Price/100}</b>rps</p>
             <button type="button" class="btn btn-danger" onClick={()=>{
                dispatch(removeFromCart(i))
             }}>remove to cart</button>
           </div>
         </div>
       </div>
     </div>
      })}
        </div>

    </div>
      
    </div>
  );
}

export default Cart;
