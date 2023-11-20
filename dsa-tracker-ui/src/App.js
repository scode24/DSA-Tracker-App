import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import RouteGuard from "./shared/RouteGuard";
import Playground from "./components/Playground";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        {/* <Route path='/' element={<RouteGuard />}> */}
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="playground" element={<Playground />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
