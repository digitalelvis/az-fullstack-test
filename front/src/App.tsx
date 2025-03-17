import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { ToastContainer, Zoom } from "react-toastify";

const App = () => {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
        />
    </Router>
  );
};

export default App;
