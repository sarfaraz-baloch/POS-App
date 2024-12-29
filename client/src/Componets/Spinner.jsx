// import { Spin } from "antd";

const CircleSpinner = () => {
  return (
    // <div className="flex items-center justify-center h-screen bg-gray-100">
    //   <Spin
    //     size="large"
    //     tip="Loading..."
    //     className="text-blue-600"
    //     indicator={
    //       <svg
    //         className="animate-spin h-64 w-64 border-8 border-t-transparent rounded-full"
    //         xmlns="http://www.w3.org/2000/svg"
    //         viewBox="0 0 24 24"
    //       >
    //         <circle
    //           className="opacity-25"
    //           cx="12"
    //           cy="12"
    //           r="10"
    //           stroke="currentColor"
    //           strokeWidth="4"
    //         />
    //         <path
    //           className="opacity-75"
    //           fill="currentColor"
    //           d="M12 2a10 10 0 1 1-10 10A10.012 10.012 0 0 1 12 2z"
    //         />
    //       </svg>
    //     }
    //   />
    // </div>

    <div className="flex items-center justify-center w-screen  h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="loader"></div>
    </div>
  );
};

export default CircleSpinner;
