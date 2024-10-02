import React, { useState, useEffect } from "react";
import "../App.css";
import Shimmer from "../Shimmer";
import { useNavigate } from "react-router-dom";
import { fetchRestaurants } from "../apis/api";

function InitialRestaurant({ location, setlocation }) {
  let [restaurant, setrestaurant] = useState([]);
  let [userSearch, setuserSearch] = useState("");
  let [filteredRestaurant, setfilteredRestaurant] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    setrestaurant([]);
    setfilteredRestaurant([]);
    fetchRestaurants(location.lat, location.lng)
      .then((res) => {
        const allRestaurants =
          res.data.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants ?? [];
        setrestaurant(allRestaurants);
      })
      .catch((error) => {
        console.error("Error fetching restaurant data:", error);
      });
  }, [location]);

  useEffect(() => {
    let results = restaurant.filter((item) => {
      if (
        item.info.name.toLowerCase().includes(userSearch.toLowerCase()) === true
      ) {
        return true;
      }
    });
    setfilteredRestaurant(results);
    console.log(results);
  }, [userSearch]);

  const sortByCategory = (category) => {
    if (category === "delivery") {
      if (filteredRestaurant?.length > 0) {
        let restaurantDataCopy = [...filteredRestaurant];
        restaurantDataCopy.sort((a, b) => {
          return a.info.sla.deliveryTime - b.info.sla.deliveryTime;
        });
        setfilteredRestaurant(restaurantDataCopy);
      } else {
        let restaurantDataCopy = [...restaurant];
        restaurantDataCopy.sort((a, b) => {
          return a.info.sla.deliveryTime - b.info.sla.deliveryTime;
        });
        setrestaurant(restaurantDataCopy);
      }
    } else if (category === "Rating") {
      if (filteredRestaurant?.length > 0) {
        let restaurantDataCopy = [...filteredRestaurant];
        restaurantDataCopy.sort((a, b) => {
          return b.info.avgRating - a.info.avgRating;
        });
        setfilteredRestaurant(restaurantDataCopy);
      } else {
        let restaurantDataCopy = [...restaurant];
        restaurantDataCopy.sort((a, b) => {
          return b.info.avgRating - a.info.avgRating;
        });
        setrestaurant(restaurantDataCopy);
      }
    }
  };
  return (
    <div className="col-10">
      <div
        style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}
      >
        <input
          style={{ width: "200px" }}
          value={userSearch}
          onChange={(e) => {
            setuserSearch(e.target.value);
          }}
          placeholder="search restaurant by name"
        />

        <br />
        <br />

        <button
          className="flt-button"
          onClick={() => {
            sortByCategory("delivery");
          }}
        >
          fast delivery
        </button>

        <button
          className="flt-button"
          onClick={() => {
            sortByCategory("Rating");
          }}
        >
          Rating high to low
        </button>
      </div>

      <div class="row row-cols-1 row-cols-md-4 g-4">
        {filteredRestaurant?.length > 0
          ? filteredRestaurant?.map((item, i) => {
              return (
                <div class="col">
                  <div class="card">
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.info.cloudinaryImageId}`}
                      class="card-img-top image"
                      alt="..."
                    />
                    <div class="card-body">
                      <h5 class="card-title">{item.info.name}</h5>

                      <p class="card-text">
                        {" "}
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
                        <span
                          style={{ marginLeft: "7px", marginRight: "15px" }}
                        >
                          {item.info.avgRating
                            ? item.info.avgRating
                            : item.info.avgRatingString}
                        </span>
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
                        <span style={{ marginLeft: "5px" }}>
                          {item.info.sla.slaString}
                        </span>
                      </p>
                      <p class="card-text">{item.info.cuisines.join(",")}</p>
                      <p class="card-text">{item.info.areaName}</p>
                    </div>
                  </div>
                </div>
              );
            })
          : restaurant?.map((item, i) => {
              return (
                <div
                  class="col"
                  onClick={() => {
                    navigate(`/restaurant/${item.info.id}/${item.info.name}`);
                    console.log(item.info.id);
                  }}
                >
                  <div class="card">
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.info.cloudinaryImageId}`}
                      class="card-img-top image"
                      alt="..."
                    />
                    <div class="card-body">
                      <h5 class="card-title">{item.info.name}</h5>

                      <p class="card-text">
                        {" "}
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
                        <span
                          style={{ marginLeft: "7px", marginRight: "15px" }}
                        >
                          {item.info.avgRating
                            ? item.info.avgRating
                            : item.info.avgRatingString}
                        </span>
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
                        <span style={{ marginLeft: "5px" }}>
                          {item.info.sla.slaString}
                        </span>
                      </p>
                      <p class="card-text">{item.info.cuisines.join(",")}</p>
                      <p class="card-text">{item.info.areaName}</p>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      {filteredRestaurant.length === 0 && restaurant.length === 0 ? (
        <Shimmer />
      ) : (
        ""
      )}
    </div>
  );
}

export default InitialRestaurant;
