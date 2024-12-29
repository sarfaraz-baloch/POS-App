// // import DefultLayout from "../Componets/DefualtLayout";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { Row, Col } from "antd";
// import axios from "axios";
// import ItemList from "../Componets/ItemList";
// const HomePage = () => {
//   const dispatch = useDispatch();
//   const [itemsData, setItemsData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("Electronics");

//   const categroy = [

//     {
//       name: "Electronics",
//       ImageUrl:
//         "https://static.vecteezy.com/system/resources/previews/004/210/331/non_2x/circuit-electronic-icon-free-vector.jpg",
//     },
//     {
//       name: "Fitness",
//       ImageUrl: "https://cdn-icons-png.flaticon.com/512/4729/4729328.png",
//     },
//     {
//       name: "Home Appliances",
//       ImageUrl: "https://cdn-icons-png.flaticon.com/512/6020/6020634.png",
//     },
//   ];

//   useEffect(() => {
//     const getAllItems = async () => {
//       try {
//         dispatch({
//           type: "SHOW_LOADING",
//         });

//         const { data } = await axios.get(
//           "http://localhost:8080/api/item/get-item"
//         );
//         setItemsData(data);

//         dispatch({
//           type: "STOP_LOADING",
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getAllItems();
//   }, []);
//   return (
//     <div>
//       <div className="flex  items-center flex-wrap gap-4 p-4">
//         {categroy.map((category) => (
//           <div
//             className={`border-2 border-gray-600 p-2 flex justify-center items-center gap-4  ${
//               category.name === selectedCategory ? "bg-gray-200" : ""
//             } cursor-pointer`}
//             onClick={() => setSelectedCategory(category.name)}
//             key={category.name}
//           >
//             <h1 className="text-center text-xl">{category.name}</h1>

//             <img
//               src={category.ImageUrl}
//               alt={category.name}
//               className="w-12 h-12 "
//             />
//           </div>
//         ))}
//       </div>

//       <Row gutter={16}>
//         {itemsData
//           .filter((item) => item.category === selectedCategory)
//           .map((item) => (
//             <Col xs={24} sm={6} md={12} lg={6} key={item._id}>
//               <ItemList item={item} key={item._id} />
//             </Col>
//           ))}
//       </Row>
//     </div>
//   );
// };

// export default HomePage;

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "antd";
import axios from "axios";
import ItemList from "../Componets/ItemList";

const HomePage = () => {
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All"

  const categories = [
    {
      name: "All", // New category for displaying all items
      ImageUrl: "https://cdn-icons-png.flaticon.com/512/5110/5110770.png", // You can replace this with an appropriate icon
    },
    {
      name: "Electronics",
      ImageUrl:
        "https://static.vecteezy.com/system/resources/previews/004/210/331/non_2x/circuit-electronic-icon-free-vector.jpg",
    },
    {
      name: "Fitness",
      ImageUrl: "https://cdn-icons-png.flaticon.com/512/4729/4729328.png",
    },
    {
      name: "Home Appliances",
      ImageUrl: "https://cdn-icons-png.flaticon.com/512/6020/6020634.png",
    },
  ];

  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });

        const { data } = await axios.get(
          "http://localhost:8080/api/item/get-item"
        );
        setItemsData(data);

        dispatch({
          type: "STOP_LOADING",
        });
      } catch (error) {
        console.log(error);
      }
    };

    getAllItems();
  }, [dispatch]);

  return (
    <div>
      <div className="flex items-center flex-wrap gap-4 p-4">
        {categories.map((category) => (
          <div
            className={`border-2 border-gray-600 p-2 flex justify-center items-center gap-4 ${
              category.name === selectedCategory ? "bg-gray-200" : ""
            } cursor-pointer`}
            onClick={() => setSelectedCategory(category.name)}
            key={category.name}
          >
            <h1 className="text-center text-xl">{category.name}</h1>
            <img
              src={category.ImageUrl}
              alt={category.name}
              className="w-12 h-12"
            />
          </div>
        ))}
      </div>

      <Row gutter={16}>
        {itemsData
          .filter(
            (item) =>
              selectedCategory === "All" || item.category === selectedCategory // Show all if selectedCategory is "All"
          )
          .map((item) => (
            <Col xs={24} sm={6} md={12} lg={6} key={item._id}>
              <ItemList item={item} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default HomePage;
