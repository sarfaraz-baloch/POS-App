import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Table } from "antd";
const CustomerPage = () => {
  const [billData, setBillsData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllBills();
  }, []);

  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });

      const { data } = await axios.get(
        "https://pos-app-production.up.railway.app/api/bill/get-bill"
      );
      setBillsData(data);
      console.log("data in item==>", data);
      dispatch({
        type: "STOP_LOADING",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const colums = [
    // 1. Id
    {
      title: "ID",
      dataIndex: "_id",
    },

    // 2. Customer Name
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },

    {
      title: "Contact Number",
      dataIndex: "phoneNumber",
    },
  ];
  return (
    <div>
      <Table
        pagination={false}
        bordered
        columns={colums}
        dataSource={billData}
      />
    </div>
  );
};

export default CustomerPage;
