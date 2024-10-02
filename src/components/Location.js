import React, { useState, useEffect } from "react";
import { fetchLocationSuggestions, fetchLocationDetails } from "../apis/api";

function Location({ setlocation }) {
  const [userLocationSearch, setuserLocationSearch] = useState("");
  const [LocationSuggestion, setLocationSuggestion] = useState([]);

  useEffect(() => {
    if (userLocationSearch) {
      fetchLocationSuggestions(userLocationSearch)
        .then((res) => {
          if (res.data.data) {
            setLocationSuggestion(res?.data?.data);
          }
        })
        .catch((error) =>
          console.error("Error fetching location suggestions: ", error)
        );
    }
  }, [userLocationSearch]);

  return (
    <div className="col-2 pt-4">
      <input
        value={userLocationSearch}
        onChange={(e) => setuserLocationSearch(e.target.value)}
        placeholder="search for location"
      />
      <br />
      <br />
      <ol>
        {userLocationSearch !== ""
          ? LocationSuggestion?.map((item, i) => (
              <li
                key={i}
                className="location-suggest"
                onClick={() =>
                  fetchLocationDetails(item.place_id)
                    .then((res) => {
                      let locationdata = res.data?.data[0]?.geometry?.location;
                      console.log("Selected location data: ", locationdata); // Debugging log
                      if (locationdata) {
                        setlocation({
                          lat: locationdata.lat,
                          lng: locationdata.lng, // Make sure it's lng, not long
                        });
                        setLocationSuggestion([]);
                      } else {
                        console.error("Location data not found.");
                      }
                    })
                    .catch((error) =>
                      console.error("Error fetching location details: ", error)
                    )
                }
              >
                {item.description}
              </li>
            ))
          : ""}
      </ol>
    </div>
  );
}

export default Location;
