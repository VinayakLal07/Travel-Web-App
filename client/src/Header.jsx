import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/search?q=${searchQuery}`
      );
      console.log("this is from header ", response.data);
      // Redirect to search page with results
      navigate(`/search/`, { state: { results: response.data } });
    } catch (error) {
      console.error("Error searching:", error);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="flex justify-between items-center py-4 px-8 relative">
      <Link
        to={"/"}
        className="flex items-center px-2 py-2 gap-1 border-0 outline-none rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-primary"
        id="home"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 -rotate-90"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
        <span className="font-bold text-xl">TravelEase</span>
      </Link>
      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-6 shadow-md w-1/4 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-primary">
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search..."
          className="flex-1 text-lg placeholder-gray-500"
        />
        <button
          id="search-button"
          onClick={handleSearch}
          className="px-3 py-2 bg-primary text-white p-1 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <Link
        to={user ? "/account" : "/login"}
        className="flex items-center gap-2 border border-gray-300 rounded-full py-4 px-4 shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-primary"
        id="profile-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 relative top-1"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {!!user && <div>{user.name}</div>}
      </Link>
      <hr className="absolute bottom-0 left-0 right-0 h-0.5" />
    </header>
  );
}

// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "./UserContext.jsx";
// import axios from "axios";

// export default function Header() {
//   const navigate = useNavigate();
//   const { user } = useContext(UserContext);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showFilters, setShowFilters] = useState(false);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/search?q=${searchQuery}`
//       );
//       console.log("this is from header ", response.data);
//       // Redirect to search page with results
//       navigate(`/search/`, { state: { results: response.data } });
//     } catch (error) {
//       console.error("Error searching:", error);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   const toggleFilters = () => {
//     setShowFilters(!showFilters);
//   };

//   return (
//     <header className="flex justify-between items-center py-4 px-8 relative">
//       <Link
//         to={"/"}
//         className="flex items-center px-2 py-2 gap-1 border-0 outline-none rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-primary"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-8 h-8 -rotate-90"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
//           />
//         </svg>
//         <span className="font-bold text-xl">TravelEase</span>
//       </Link>
//       <div
//         className="relative"
//         onMouseEnter={() => setShowFilters(true)}
//         onMouseLeave={() => setShowFilters(false)}
//       >
//         <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-6 shadow-md w-1/4 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-primary">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyDown={handleKeyDown} // Call handleSearch on Enter key press
//             placeholder="Search..."
//             className="flex-1 text-lg placeholder-gray-500"
//           />
//           <button
//             onClick={handleSearch}
//             className="px-3 py-2 bg-primary text-white p-1 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-4 h-4"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
//               />
//             </svg>
//           </button>
//         </div>
//         {showFilters && (
//           <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 shadow-md rounded-lg p-4">
//             {/* Filter options go here */}
//           </div>
//         )}
//       </div>
//       <Link
//         to={user ? "/account" : "/login"}
//         className="flex items-center gap-2 border border-gray-300 rounded-full py-4 px-4 shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-primary"
//         id="profile-btn"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-6 h-6"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
//           />
//         </svg>
//         <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="w-6 h-6 relative top-1"
//           >
//             <path
//               fillRule="evenodd"
//               d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </div>
//         {!!user && <div>{user.name}</div>}
//       </Link>
//       <hr className="absolute bottom-0 left-0 right-0 h-0.5" />
//     </header>
//   );
// }

// import { Link } from "react-router-dom";
// import { useContext, useState } from "react";
// import { UserContext } from "./UserContext.jsx";
// import axios from "axios";

// export default function Header() {
//   const { user } = useContext(UserContext);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   // Function to handle search
//   const handleSearch = async () => {
//     try {
//       console.log(searchQuery);
//       const response = await axios.get(`/api/places/search?q=${searchQuery}`); // Using axios.get
//       if (response.status === 200) {
//         const data = response.data;
//         setSearchResults(data.results);
//       } else {
//         console.error("Failed to fetch search results:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   return (
//     <header className="flex justify-between items-center py-4 px-8 relative">
//       <Link
//         to={"/"}
//         className="flex items-center gap-1 px-2 py-2 border-0 outline-none rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-primary"
//         id="home"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-8 h-8 -rotate-90"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
//           />
//         </svg>
//         <span className="font-bold text-xl">airbnb</span>
//       </Link>
//       <Link
//         to={user ? "/account" : "/login"}
//         className="flex items-center gap-2 border border-gray-300 rounded-full py-4 px-4 shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-primary"
//         id="profile-btn"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-6 h-6"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
//           />
//         </svg>
//         <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="w-6 h-6 relative top-1"
//           >
//             <path
//               fillRule="evenodd"
//               d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </div>
//         {!!user && <div>{user.name}</div>}
//       </Link>
//     </header>
//   );
// }
