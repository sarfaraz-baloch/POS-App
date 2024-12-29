import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CircleSpinner from "./Spinner";
import { RootReducer } from "./../Redux/RootReducer";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const { cartItems, loading } = useSelector((state) => state.RootReducer);

  const Navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-screen p-10 ">
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute  inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <CircleSpinner />
        </div>
      )}
      <Sider
        className="h-screen mr-5 p-4 rounded-lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <h1 className="logo text-4xl pt-2 text-white text-center">Pos</h1>
        <Menu
          className="mt-5 text-xl"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/bill" icon={<CopyOutlined />}>
            <Link to="/bill">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/item" icon={<UnorderedListOutlined />}>
            <Link to="/item">Items</Link>
          </Menu.Item>
          <Menu.Item key="/customer" icon={<UserOutlined />}>
            <Link to="/customer">Customers</Link>
          </Menu.Item>
          <Menu.Item
            key="/logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("auth");
              Navigate("/login");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            borderRadius: borderRadiusLG,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "40px",
              width: 64,
              height: 64,
            }}
          />

          <div className="flex items-center pl-5 pr-7s">
            <ShoppingCartOutlined
              style={{ fontSize: "30px", marginRight: "10px" }}
              onClick={() => Navigate("/cart")}
            />
            <div className="text-xl font-semibold mr-7">{cartItems.length}</div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            maxHeight: "calc(100vh - 200px)", // Adjust this value based on your layout
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
