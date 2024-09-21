import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Image from "../Image.jsx";

export default function SearchResultsPage() {
  console.log("this is before axios request to backend");

  const location = useLocation();
  console.log("Location state:", location.state); // Log the location state

  const [results, setResults] = useState([]);

  // Function to fetch data when the component mounts
  const fetchData = async () => {
    // If search results are passed through location state, set them directly
    if (location.state && location.state.results) {
      setResults(location.state.results);
    } else {
      // Otherwise, fetch data from the server using the search query
      const { q } = location.search;
      const response = await axios.get(
        `http://localhost:3000/api/search?q=${q}`
      );
      console.log("this is search page", response.data);
      setResults(response.data);
    }
  };

  // Call the fetchData function when the component mounts
  React.useEffect(() => {
    fetchData();
  }, [location]);

  return (
    <>
      <h1 className="mt-4 font-bold">Search</h1>
      <div className="mt-8 grid gap-x-10 gap-y-10 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        {results.map((result) => (
          <Link
            key={result._id}
            className="shadow-md rounded-xl transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-primary"
            to={"/place/" + result._id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="bg-gray-500 mb-2 rounded-2xl overflow-hidden flex">
              {result.photos?.[0] && (
                <Image
                  className="rounded-2xl object-cover aspect-square transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg"
                  src={result.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <div className="py-2 px-3">
              <h3 className="font-bold">{result.address}</h3>
              <h2 className="text-sm text-gray-500">{result.title}</h2>
              <div className="mt-1">
                <span className="font-bold">₹{result.price}</span> per night
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
