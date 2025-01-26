// // // import DefultLayout from "../Componets/DefualtLayout";
// // import { useEffect, useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { Row, Col } from "antd";
// // import axios from "axios";
// // import ItemList from "../Componets/ItemList";
// // const HomePage = () => {
// //   const dispatch = useDispatch();
// //   const [itemsData, setItemsData] = useState([]);
// //   const [selectedCategory, setSelectedCategory] = useState("Electronics");

// //   const categroy = [

// //     {
// //       name: "Electronics",
// //       ImageUrl:
// //         "https://static.vecteezy.com/system/resources/previews/004/210/331/non_2x/circuit-electronic-icon-free-vector.jpg",
// //     },
// //     {
// //       name: "Fitness",
// //       ImageUrl: "https://cdn-icons-png.flaticon.com/512/4729/4729328.png",
// //     },
// //     {
// //       name: "Home Appliances",
// //       ImageUrl: "https://cdn-icons-png.flaticon.com/512/6020/6020634.png",
// //     },
// //   ];

// //   useEffect(() => {
// //     const getAllItems = async () => {
// //       try {
// //         dispatch({
// //           type: "SHOW_LOADING",
// //         });

// //         const { data } = await axios.get(
// //           "http://localhost:8080/api/item/get-item"
// //         );
// //         setItemsData(data);

// //         dispatch({
// //           type: "STOP_LOADING",
// //         });
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     };

// //     getAllItems();
// //   }, []);
// //   return (
// //     <div>
// //       <div className="flex  items-center flex-wrap gap-4 p-4">
// //         {categroy.map((category) => (
// //           <div
// //             className={`border-2 border-gray-600 p-2 flex justify-center items-center gap-4  ${
// //               category.name === selectedCategory ? "bg-gray-200" : ""
// //             } cursor-pointer`}
// //             onClick={() => setSelectedCategory(category.name)}
// //             key={category.name}
// //           >
// //             <h1 className="text-center text-xl">{category.name}</h1>

// //             <img
// //               src={category.ImageUrl}
// //               alt={category.name}
// //               className="w-12 h-12 "
// //             />
// //           </div>
// //         ))}
// //       </div>

// //       <Row gutter={16}>
// //         {itemsData
// //           .filter((item) => item.category === selectedCategory)
// //           .map((item) => (
// //             <Col xs={24} sm={6} md={12} lg={6} key={item._id}>
// //               <ItemList item={item} key={item._id} />
// //             </Col>
// //           ))}
// //       </Row>
// //     </div>
// //   );
// // };

// // export default HomePage;

// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { Row, Col } from "antd";
// import axios from "axios";
// import ItemList from "../Componets/ItemList";

// const HomePage = () => {
//   const dispatch = useDispatch();
//   const [itemsData, setItemsData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All"

//   const categories = [
//     {
//       name: "All", // New category for displaying all items
//       ImageUrl: "https://cdn-icons-png.flaticon.com/512/5110/5110770.png", // You can replace this with an appropriate icon
//     },
//     {
//       name: "Wedding Loans",
//       ImageUrl:
//         "https://static.vecteezy.com/system/resources/previews/004/210/331/non_2x/circuit-electronic-icon-free-vector.jpg",
//     },
//     {
//       name: "Home Construction Loans",
//       ImageUrl: "https://cdn-icons-png.flaticon.com/512/4729/4729328.png",
//     },
//     {
//       name: "Business Startup Loans",
//       ImageUrl: "https://cdn-icons-png.flaticon.com/512/6020/6020634.png",
//     },
//     {
//       name: "Education Loans",
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
//   }, [dispatch]);

//   return (
//     <div>
//       <div className="flex items-center flex-wrap gap-4 p-4">
//         {categories.map((category) => (
//           <div
//             className={`border-2 border-gray-600 p-2 flex justify-center items-center gap-4 ${
//               category.name === selectedCategory ? "bg-gray-200" : ""
//             } cursor-pointer`}
//             onClick={() => setSelectedCategory(category.name)}
//             key={category.name}
//           >
//             <h1 className="text-center text-xl">{category.name}</h1>
//             <img
//               src={category.ImageUrl}
//               alt={category.name}
//               className="w-12 h-12"
//             />
//           </div>
//         ))}
//       </div>

//       <Row gutter={16}>
//         {itemsData
//           .filter(
//             (item) =>
//               selectedCategory === "All" || item.category === selectedCategory // Show all if selectedCategory is "All"
//           )
//           .map((item) => (
//             <Col xs={24} sm={6} md={12} lg={6} key={item._id}>
//               <ItemList item={item} />
//             </Col>
//           ))}
//       </Row>
//     </div>
//   );
// };

// export default HomePage;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Input, Select, Button, message } from "antd";
import axios from "axios";

// import HomePage from "./HomePage";

const HomePage = () => {
  const { Option } = Select;

  const categories = [
    {
      name: "Home Construction Loans",
      subcategories: ["Material Loans", "Labor Loans", "Renovation Loans"],
    },
    {
      name: "Wedding Loans",
      subcategories: ["Venue Loans", "Photography Loans", "Catering Loans"],
    },
    {
      name: "Education Loans",
      subcategories: ["School Loans", "College Loans", "Abroad Study Loans"],
    },
    {
      name: "Business Startup Loans",
      subcategories: [
        "Small Business Loans",
        "Equipment Loans",
        "Marketing Loans",
      ],
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [userName, setUserName] = useState(""); // User's name
  const [userEmail, setUserEmail] = useState(""); // User's email
  const [loanBreakdown, setLoanBreakdown] = useState(null);
  const dispatch = useDispatch();
  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    setSelectedSubcategory("");
    setInitialDeposit("");
    setLoanPeriod("");
    setUserName("");
    setUserEmail("");
    setLoanBreakdown(null);
    setIsModalVisible(true);
  };

  const calculateLoan = () => {
    if (!initialDeposit || !loanPeriod || !selectedSubcategory) {
      message.error("Please fill in all required fields!");
      return;
    }

    const totalLoan = parseFloat(initialDeposit) * 10;
    const monthlyInstallment = totalLoan / parseInt(loanPeriod);

    setLoanBreakdown({
      totalLoan: totalLoan.toFixed(2),
      monthlyInstallment: monthlyInstallment.toFixed(2),
    });
  };

  const handleSubmitRequest = async () => {
    if (!userName || !userEmail || !loanBreakdown) {
      message.error("Please complete the form and calculate the loan first!");
      return;
    }

    const requestData = {
      userName,
      userEmail,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      initialDeposit,
      loanPeriod,
      totalLoan: loanBreakdown.totalLoan,
      monthlyInstallment: loanBreakdown.monthlyInstallment,
    };

    try {
      dispatch({
        type: "SHOW_LOADING",
      });

      const res = await axios.post(
        "http://localhost:8080/api/loan-request",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      message.success("Loan request submitted successfully!");
      setIsModalVisible(false);

      dispatch({
        type: "STOP_LOADING",
      });
    } catch (error) {
      console.error("292 ==>Error submitting loan request:", error);
      message.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="p-6">
      {/* Categories Section */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="border-2 p-4 rounded-lg text-center cursor-pointer hover:shadow-lg"
            onClick={() => handleCategoryClick(category)}
          >
            <h3 className="text-lg font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>

      {/* Loan Request Modal */}
      <Modal
        title={`Request a Loan - ${selectedCategory}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {/* Subcategory Selection */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Select Subcategory</label>
          <Select
            style={{ width: "100%" }}
            value={selectedSubcategory}
            onChange={(value) => setSelectedSubcategory(value)}
            placeholder="Select a subcategory"
          >
            {categories
              .find((cat) => cat.name === selectedCategory)
              ?.subcategories.map((sub, index) => (
                <Option key={index} value={sub}>
                  {sub}
                </Option>
              ))}
          </Select>
        </div>

        {/* User Name */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Name</label>
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        {/* User Email */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>
          <Input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        {/* Initial Deposit Input */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Initial Deposit</label>
          <Input
            type="number"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
            placeholder="Enter initial deposit"
          />
        </div>

        {/* Loan Period Input */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Loan Period (Months)</label>
          <Input
            type="number"
            value={loanPeriod}
            onChange={(e) => setLoanPeriod(e.target.value)}
            placeholder="Enter loan period in months"
          />
        </div>

        {/* Calculate Button */}
        <Button type="primary" onClick={calculateLoan} block>
          Calculate Loan
        </Button>

        {/* Loan Breakdown */}
        {loanBreakdown && (
          <div className="mt-6 p-4 border rounded-lg">
            <h4 className="text-lg font-semibold mb-2">Loan Breakdown</h4>
            <p>Total Loan: ${loanBreakdown.totalLoan}</p>
            <p>Monthly Installment: ${loanBreakdown.monthlyInstallment}</p>
          </div>
        )}

        {/* Submit Request Button */}
        <Button
          type="primary"
          onClick={handleSubmitRequest}
          block
          className="mt-4"
        >
          Submit Loan Request
        </Button>
      </Modal>
    </div>
  );
};

export default HomePage;
