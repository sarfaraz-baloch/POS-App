import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";

const BillPage = () => {
  const [billData, setBillsData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const contentRef = useRef();
  const dispatch = useDispatch();

  //Print Funcation

  const handlePrint = useReactToPrint({
    contentRef, // Pass the contentRef here
    documentTitle: "Bill Details", // Optional title for printed document
  });

  useEffect(() => {
    getAllBills();
  }, []);

  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });

      const { data } = await axios.get(
        // "http://localhost:8080/api/bill/get-bill"
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

  //table columns
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

    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
    },

    {
      title: "Sub Total",
      dataIndex: "subTotal",
    },

    {
      title: "Tax",
      dataIndex: "tax",
    },

    {
      title: "Total Amount",
      dataIndex: "totalAmount",
    },

    // 6. Action
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <EyeOutlined
            style={{
              fontSize: "20px",
              color: "#1890ff",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedBill(record);
              setPopModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: "Item",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  //Print

  const dataSource = selectedBill?.cartItems.map((item, index) => ({
    key: index,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    total: (item.quantity * item.price).toFixed(2), // Calculate total
  }));

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>Invoice List</h1>
      </div>
      <Table
        pagination={false}
        bordered
        columns={colums}
        dataSource={billData}
      />

      {popModal && (
        <Modal
          title="Bill Details"
          visible={popModal}
          onCancel={() => setPopModal(false)}
          footer={false}
          style={{
            borderRadius: "10px", // Rounded corners for the modal
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Shadow effect for the modal
          }}
          bodyStyle={{
            padding: "10px", // Increased padding inside the modal body
            backgroundColor: "#ffffff", // White background color for clarity
          }}
        >
          <div ref={contentRef}>
            <div id="invoice-POS p-12">
              <center id="top">
                <div className="logo">
                  <img
                    src="/img/S.png" // Update this with your actual image path
                    alt="logo"
                    style={{ maxWidth: "150px", marginBottom: "15px" }} // Logo size and margin
                  />
                </div>
                <div className="info">
                  <h2 style={{ margin: "0", fontSize: "24px" }}>Starbucks</h2>
                  <p style={{ margin: "5px 0" }}>12345 Sunny Road</p>
                  <p style={{ margin: "5px 0" }}>California, CA 12345</p>
                </div>
              </center>

              <div id="mid" style={{ marginBottom: "20px" }}>
                <div className="mt-3">
                  <p style={{ margin: "5px 0" }}>
                    Customer Name: <strong>{selectedBill.customerName}</strong>
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    Contact Number: <strong>{selectedBill.phoneNumber}</strong>
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    Date:{" "}
                    <strong>
                      {selectedBill.date.toString().substring(0, 10)}
                    </strong>
                  </p>
                  <hr style={{ margin: "10px 0" }} />
                </div>
              </div>

              {/* Main Table */}
              <Table
                style={{ backgroundColor: "gray" }}
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                bordered
                footer={() => (
                  <div className="flex flex-col justify-end items-end gap-3 bg-gray-200">
                    <tr className="flex gap-4">
                      <td
                        colSpan={3}
                        style={{ textAlign: "left", fontWeight: "bold" }}
                      >
                        Tax:
                      </td>
                      <td>{`$ ${selectedBill.tax}`}</td>
                    </tr>
                    <tr className="flex gap-4">
                      <td
                        colSpan={3}
                        style={{ textAlign: "left", fontWeight: "bold" }}
                      >
                        Grand Total:
                      </td>
                      <td>{`$ ${selectedBill.totalAmount}`}</td>
                    </tr>
                  </div>
                )}
              />
            </div>

            <div className="mt-10  p-2">
              <footer>
                <p>
                  <b>Thank you for your Order !</b> 10% GST application on total
                  amount. Please note that is non refundable amount for any
                  assistance please write email{" "}
                  <b>sarfarazkohda321@gmail.com</b>
                </p>
              </footer>
            </div>
          </div>
          <div className="flex justify-end items-end m-2 p-2">
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BillPage;
