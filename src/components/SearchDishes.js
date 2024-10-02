import React, { useState, useEffect } from "react";
import { fetchDishes } from "../apis/api";
import { useNavigate } from "react-router-dom";
import { addTocart } from "../Reducer";
import {useDispatch} from 'react-redux'

function SearchDishes() {
  const [dishName, setDishName] = useState([]);
  const [dishes, setDishes] = useState([]);
  let navigate = useNavigate();

  {
    console.log(dishName);
  }
  
  let dispatch =  useDispatch();

  useEffect(() => {
    if (dishName.length > 2) {
      fetchDishes(17.3724, 78.4378, dishName).then((res) => {
        const restaurantData =
          res.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards;
        if (restaurantData) {
          setDishes(restaurantData.slice(1));
        }
      });
    }
  }, [dishName]);

  console.log(dishes);
  return (
    <>
      <div className="container">
        <div style={{ marginTop: "90px", textAlign: "center" }}>
          <input
            type="text"
            onChange={(e) => {
              setDishName(e.target.value);
            }}
            placeholder="enter the dish name"
          />
        </div>
        <div class="row row-cols-1 row-cols-md-3 g-2 ">
          {dishes.map((item, i) => {
            return (
              <div class="col">
                <div class="card h-100 p-4">
                  <h5 class="card-title">
                    {item.card?.card?.restaurant?.info?.name}
                  </h5>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-star-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    {item.card?.card?.restaurant?.info?.avgRating}
                    <span style={{ marginLeft: "10px" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-hourglass-split"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                      </svg>
                      {item.card?.card?.restaurant?.info?.sla?.slaString}
                    </span>{" "}
                    <button
                      onClick={() => {
                        navigate(
                          `/restaurant/${item.card?.card?.restaurant?.info?.id}/${item.card?.card?.restaurant?.info?.name}`
                        );
                      }}
                    >
                      view restaurant
                    </button>
                  </p>
                  <div className="row">
                    <div className="col-4">
                      {" "}
                      <img
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card?.card?.info?.imageId}`}
                        class="card-img-top h-90"
                        alt="..."
                      />{" "}
                    </div>

                    <div class="card-body col-8 ">
                      <h5 class="card-title">{item.card?.card?.info?.name}</h5>
                      <p class="card-text">
                        {item?.card?.card?.info?.description}
                      </p>
                      <button type="button" class="btn btn-success" onClick={()=>{
                        dispatch(addTocart({Name:item.card?.card?.info?.name, Price:item.card?.card?.info?.price, img:`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card?.card?.info?.imageId}`}))
                      }}>Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SearchDishes;
