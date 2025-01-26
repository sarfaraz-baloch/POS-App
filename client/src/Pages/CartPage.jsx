import { useSelector, useDispatch } from "react-redux";
import { RootReducer } from "./../Redux/RootReducer";
import {
  DeleteOutlined,
  MinusCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Table, message, Input, Form, Select } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState(0);
  const [billPopUp, setBillPopUp] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.RootReducer);

  // Increment
  const handleIncrement = (record) => {
    dispatch({
      type: "Update_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  // Decrement
  const handleDecrement = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "Update_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  // Delete
  const handleDelete = (id) => {
    dispatch({
      type: "DELETE_FROM_CART",
      payload: id,
    });

    message.success("Deleted successfully");
  };

  const colums = [
    //Name, Image, Price, Quantity, Total

    // 1. Name
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    // 2. Image
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img
          src={image}
          alt={record.name}
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },

    // 3. Price
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    // 4. Quantity
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="flex items-center  gap-4">
          <PlusCircleOutlined
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => handleIncrement(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleFilled
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => handleDecrement(record)}
          />
        </div>
      ),
    },

    // 6. Action
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
          onClick={() => handleDelete(record)}
        />
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp += item.price * item.quantity));
    setSubTotal(parseFloat(temp.toFixed(2))); // Convert back to float

    // setSubTotal(temp);
  }, [cartItems]);

  const handleSubmit = async (values) => {
    try {
      const newObj = {
        ...values,
        cartItems,
        subTotal,
        tax: Number(((subTotal / 100) * 5).toFixed(2)),
        totalAmount: Number(((subTotal / 100) * 5 + subTotal).toFixed(2)),
        userId: JSON.parse(localStorage.getItem("auth"))._id,
      };

      await axios.post(
        "https://pos-app-production.up.railway.app/api/bill/add-bill",
        newObj
      );
      message.success("Bill Generted");
      navigate("/bill");
    } catch (error) {
      message.error(error, "Smth went Wrong");
    }
  };
  return (
    <div>
      <h1 className="p-4 text-4xl">Cart Page</h1>
      {/* <Table colums={colums} dataSource={cartItems} /> */}
      <Table bordered columns={colums} dataSource={cartItems} />

      <div className="flex flex-col items-end  p-4">
        <h1 className="text-2xl">Sub Total: {subTotal}</h1>

        <Button
          type="primary"
          style={{ marginLeft: "20px" }}
          onClick={() => setBillPopUp(true)}
        >
          Checkout
        </Button>
      </div>

      <Modal
        title="Invoice Bill"
        visible={billPopUp}
        open={billPopUp}
        footer={null}
        onCancel={() => setBillPopUp(false)}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>

          <Form.Item name="phoneNumber" label="Phone Number">
            <Input />
          </Form.Item>

          <Form.Item name="paymentMode" label="Payment Mode">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>

          <div className="div">
            <h1 className="text-2xl">Sub Total: {subTotal}</h1>
            <h4>
              Tax: <b> {((subTotal / 100) * 5).toFixed(2)} </b>{" "}
            </h4>
            <h4>
              Total: <b> {((subTotal / 100) * 5 + subTotal).toFixed(2)} </b>{" "}
            </h4>
          </div>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button type="primary" htmlType="submit">
              Generate Bill
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CartPage;
