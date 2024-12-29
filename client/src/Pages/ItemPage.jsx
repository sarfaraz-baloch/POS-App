import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
const ItemPage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

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
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>Item Page</h1>
        <Button
          type="primary"
          className="primary-button p-4"
          onClick={() => setPopModal(true)}
        >
          Add Item
        </Button>
      </div>
      <Table bordered columns={colums} dataSource={itemsData} />

      {popModal && (
        <Modal
          title={`${editItem !== null ? "Edit" : "Add"} Item`}
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

            {/* <Form.Item name="category" label="category">
            <Input />
          </Form.Item> */}

            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="Electronics">Electronics</Select.Option>
                <Select.Option value="Home Appliances">
                  Home Appliances
                </Select.Option>
                <Select.Option value="Wearables">Wearables</Select.Option>
              </Select>
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default ItemPage;
