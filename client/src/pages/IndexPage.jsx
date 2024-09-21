// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Image from "../Image.jsx";

// export default function IndexPage() {
//   const [places, setPlaces] = useState([]);
//   useEffect(() => {
//     axios.get("http://localhost:3000/api/places").then((response) => {
//       setPlaces(response.data);
//     });
//   }, []);
//   return (
//     <div className="mt-8 grid gap-x-10 gap-y-10 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
//       {places.length > 0 &&
//         places.map((place) => (
//           <Link
//             className="shadow-md rounded-xl  transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-primary"
//             to={"/place/" + place._id}
//           >
//             <div className="bg-gray-500 mb-2 rounded-2xl flex ">
//               {place.photos?.[0] && (
//                 <Image
//                   className="rounded-2xl object-cover aspect-square transition-all duration-300 ease-in-out transform hover:scale-130 "
//                   src={place.photos?.[0]}
//                   alt=""
//                 />
//               )}
//             </div>
//             <div className="py-2 px-3">
//               <h3 className="font-bold">{place.address}</h3>
//               <h2 className="text-sm text-gray-500">{place.title}</h2>
//               <div className="mt-1">
//                 <span className="font-bold">${place.price}</span> per night
//               </div>
//             </div>
//           </Link>
//         ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image.jsx";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="mt-8 grid gap-x-10 gap-y-10 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            className="shadow-md rounded-xl transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-primary"
            to={"/place/" + place._id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="bg-gray-500 mb-2 rounded-2xl overflow-hidden flex">
              {place.photos?.[0] && (
                <Image
                  className="rounded-2xl object-cover aspect-square transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg"
                  src={place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <div className="py-2 px-3">
              <h3 className="font-bold">{place.address}</h3>
              <h2 className="text-sm text-gray-500">{place.title}</h2>
              <div className="mt-1">
                <span className="font-bold">₹{place.price}</span> per night
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
