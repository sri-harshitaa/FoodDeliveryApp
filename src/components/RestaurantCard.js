import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { loggedInUser } = useContext(UserContext);

  // Add fallback/default values to avoid NaN and runtime issues
  const {
    cloudinaryImageId = "",
    name = "Unknown Restaurant",
    avgRating = "4.0",
    cuisines = [],
    costForTwo = 20000, // default to ₹200
    sla = {},
  } = resData || {};

  const imageUrl = cloudinaryImageId ? CDN_URL + cloudinaryImageId : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div
      data-testid="resCard"
      className="w-64 h-80 m-4 p-4 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-between shadow-md transition-transform hover:scale-105"
    >
      <img
        className="w-full h-32 object-cover rounded-md mb-2"
        alt="res-logo"
        src={imageUrl}
      />

      <div className="flex flex-col justify-between flex-1">
        <h3 className="font-bold text-md truncate">{name}</h3>
        <p className="text-sm text-gray-700 line-clamp-2">
          {cuisines.length > 0 ? cuisines.join(", ") : "Various Cuisines"}
        </p>
        <div className="mt-2 text-sm">
          <p>
            ⭐ {avgRating} • ₹
            {isNaN(costForTwo / 100) ? "200" : (costForTwo / 100).toFixed(0)} FOR TWO
          </p>
          <p>{sla?.deliveryTime || 30} mins</p>
          <p className="text-gray-500 text-xs">User: {loggedInUser}</p>
        </div>
      </div>
    </div>
  );
};

// Higher Order Component to add 'Promoted' label
export const withPromtedLabel = (RestaurantCard) => {
  return (props) => (
    <div className="relative">
      <label className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
        Promoted
      </label>
      <RestaurantCard {...props} />
    </div>
  );
};

export default RestaurantCard;

