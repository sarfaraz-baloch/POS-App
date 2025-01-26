import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const server = "pos-app-production.up.railway.app";
  const handleSubmit = async (values) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });

      await axios.post(`${server}/api/user/register`, values);

      message.success("User Registered Successfully");
      dispatch({
        type: "STOP_LOADING",
      });
      navigate("/login");
    } catch (error) {
      dispatch({
        type: "STOP_LOADING",
      });
      console.log(error);
      message.error("Failed to add item");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="Register flex items-center justify-center flex-col  h-screen bg-gray-100">
      <div className="register-form">
        <h1 className="text-3xl">Microfinance</h1>
        <h4 className="text-3xl">Register</h4>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>

          <Form.Item name="userId" label="User Id">
            <Input />
          </Form.Item>

          <Form.Item name="password" label="Password">
            <Input type="password" />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",

              alignItems: "center",
            }}
          >
            <div>
              <p className="text-sm flex gap-2 ">
                Already have an account?
                <Link to="/login">Login</Link>
              </p>
            </div>

            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
