import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Input, Select, Button, message } from "antd";
import axios from "axios";

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
        "https://pos-app-production.up.railway.app/api/loan-request", // Production API endpoint to handle loan requests
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
