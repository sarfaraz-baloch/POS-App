import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
const PopPage = () => {
  const location = useLocation();
  const item = location.state?.item; // Access the item passed via state

  const [itemsData, setItemsData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });

      const { data } = await axios.get(
        "http://localhost:8080/api/item/get-item"
      );
      setItemsData(data);
      console.log("data in item==>", data);
      dispatch({
        type: "STOP_LOADING",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //

  //form submit

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSubcategories(categorySubcategories[value] || []);
  };

  const categorySubcategories = {
    "Wedding Loans": ["Gold Loan", "Personal Loan"],
    "Home Construction Loans": ["Material Loan", "Labor Loan"],
    "Business Startup Loans": ["Seed Funding", "Equipment Loan"],
    "Education Loans": ["Scholarship Loan", "Tuition Loan"],
  };

  const handleSubmit = async (values) => {
    if (editItem === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });

        const res = await axios.post(
          "http://localhost:8080/api/item/add-item",
          values
        );

        message.success("Item Added Successfully");
        getAllItems();
        setPopModal(false);
        console.log("res==>", res);
        dispatch({
          type: "STOP_LOADING",
        });
      } catch (error) {
        dispatch({
          type: "STOP_LOADING",
        });
        console.log(error);
        message.error("Failed to add item");
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });

        await axios.put("http://localhost:8080/api/item/edit-item", {
          ...values,
          itemId: editItem._id,
        });
        message.success("Item Updated Successfully");
        getAllItems();
        setPopModal(false);
        dispatch({
          type: "STOP_LOADING",
        });
      } catch (error) {
        dispatch({
          type: "STOP_LOADING",
        });
        console.log(error);
        message.error("Failed to add item");
      }
    }
  };

  const handleDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });

      await axios.post("http://localhost:8080/api/item/delete-item", {
        itemId: record._id,
      });

      message.success("Item Deleted Successfully");
      getAllItems();
      setPopModal(false);

      dispatch({
        type: "STOP_LOADING",
      });
    } catch (error) {
      console.log(error);
      message.error("Failed to add item");
    }
  };

  //table columns
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
          <EditOutlined
            style={{
              fontSize: "20px",
              color: "green",
              cursor: "pointer",
            }}
            onClick={() => {
              setEditItem(record);
              setPopModal(true);
            }}
          />
          <DeleteOutlined
            style={{ fontSize: "20px", color: "red", cursor: "pointer" }}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex   p-4">
      <div>
        <h1>{item?.name}</h1>
        <p>Maximum loan:Lakh {item?.price}</p>
        <img src={item?.image} alt={item?.name} style={{ maxWidth: "300px" }} />
      </div>

      <div className="ml-4 border-2 border-gray-600 w-full flex  p-4">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>Item Page</h1> */}
          <Button
            type="primary"
            className="primary-button p-4"
            onClick={() => setPopModal(true)}
          >
            Add Item
          </Button>
        </div>
        {/* <Table bordered columns={colums} dataSource={itemsData} /> */}

        {popModal && (
          <Modal
            visible={popModal}
            onCancel={() => {
              setEditItem(null);
              setPopModal(false);
            }}
            footer={false}
          >
            <Form
              layout="vertical"
              initialValues={editItem}
              onFinish={handleSubmit}
            >
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>

              <Form.Item name="price" label="Price">
                <Input />
              </Form.Item>

              <Form.Item name="image" label="Image URL">
                <Input />
              </Form.Item>

              <Form.Item name="category" label="Category">
                <Select onChange={handleCategoryChange}>
                  {Object.keys(categorySubcategories).map((category) => (
                    <Select.Option key={category} value={category}>
                      {category}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {selectedCategory && (
                <Form.Item name="subcategory" label="Subcategory">
                  <Select>
                    {subcategories.map((subcategory) => (
                      <Select.Option key={subcategory} value={subcategory}>
                        {subcategory}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}

              <div style={{ display: "flex", justifyContent: "end" }}>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </div>
            </Form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default PopPage;
