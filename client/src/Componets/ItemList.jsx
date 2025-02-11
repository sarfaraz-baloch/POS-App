// import { Card, message } from "antd";
// const { Meta } = Card;
// import { Button } from "antd";
// import { useDispatch } from "react-redux";

// const ItemList = ({ item }) => {
//   const dispatch = useDispatch();

//   // add to Cart
//   const handleToCart = () => {
//     // localStorage.setItem("cartItems", JSON.stringify(item));

//     dispatch({
//       type: "ADD_TO_CART",
//       payload: { ...item, quantity: 1 },
//     });
//     message.success("Added successfully");
//   };

//   return (
//     <Card
//       hoverable
//       onClick={() => handleToCart()}
//       style={{
//         width: "100%", // Use 100% to fill the column
//         marginBottom: "10px",
//       }}
//       cover={
//         <img
//           alt={item.name}
//           src={item.image}
//           style={{ height: "200px", objectFit: "cover" }} // Ensure image covers space well
//         />
//       }
//     >
//       <Meta title={item.name} description={`$${item.price}`} />
//       <Button
//         style={{
//           marginTop: "20px",
//           width: "100%", // Make button full width
//           backgroundColor: "#189960",
//           color: "white",
//         }}
//         onClick={() => handleToCart()}
//       >
//         Add To Cart
//       </Button>
//     </Card>
//   );
// };

// export default ItemList;

import { Card, message } from "antd";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const { Meta } = Card;

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // Add to Cart
  const handleToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity: 1 },
    });
    message.success("Added successfully");
  };

  // Navigate to PopPage
  const handleCardClick = () => {
    navigate("/pop", { state: { item } }); // Pass the item object to PopPage
  };

  return (
    <Card
      hoverable
      onClick={handleCardClick} // Navigate on card click
      style={{
        width: "100%",
        marginBottom: "10px",
      }}
      cover={
        <img
          alt={item.name}
          src={item.image}
          style={{ height: "200px", objectFit: "cover" }}
        />
      }
    >
      <Meta title={item.name} description={`$${item.price}`} />
      <Button
        style={{
          marginTop: "20px",
          width: "100%",
          backgroundColor: "#189960",
          color: "white",
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click event
          handleToCart();
        }}
      >
        Add To Cart
      </Button>
    </Card>
  );
};

export default ItemList;
