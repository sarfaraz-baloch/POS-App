import "./App.css";
import "antd/dist/reset.css"; // Newer style reset
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ItemPage from "./Pages/ItemPage";
import DefaultLayout from "./Componets/DefualtLayout"; // Fixed spelling of 'Components'
import CartPage from "./Pages/CartPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import CustomerPage from "./Pages/CustomerPage";
import BillPage from "./Pages/BillPage";

function App() {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
}

const MainRoutes = () => {
  const location = useLocation();

  // Define paths that should not use DefaultLayout
  const noLayoutPaths = ["/login", "/register"];

  // Check if the current path is one of those that should not use DefaultLayout
  const shouldUseDefaultLayout = !noLayoutPaths.includes(location.pathname);

  return (
    <>
      {shouldUseDefaultLayout ? (
        <DefaultLayout>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path="/item" element={<ItemPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/bill" element={<BillPage />} />
            <Route path="/customer" element={<CustomerPage />} />
            {/* Add more routes here that should use DefaultLayout */}
          </Routes>
        </DefaultLayout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Add more routes here that should not use DefaultLayout */}
        </Routes>
      )}
    </>
  );
};

export default App;

export const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
