import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { RootReducer } from "../Redux/RootReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });

      const res = await axios.post(
        "http://localhost:8080/api/user/login",
        values
      );

      message.success("User Logged In Successfully");

      dispatch({
        type: "STOP_LOADING",
      });

      localStorage.setItem("auth", JSON.stringify(res.data));

      navigate("/");
    } catch (error) {
      dispatch({
        type: "STOP_LOADING",
      });
      console.log(error);
      message.error("Failed to login user");
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
        <h1 className="text-3xl">Microfinance App</h1>
        <h4 className="text-3xl">Login</h4>

        <Form layout="vertical" onFinish={handleSubmit}>
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
                Dont have an account
                <Link to="/register">Register</Link>
              </p>
            </div>

            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
