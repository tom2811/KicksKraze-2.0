import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { Loading } from "./components/Loading";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { AuthProvider } from "./context/AuthContext";
import { ForgotPassword } from "./components/ForgotPassword";
import { ToastContainer } from "react-toastify";
const LazyStore = React.lazy(() => import("./pages/Store"));
const LazyHome = React.lazy(() => import("./pages/Home"));

function App() {
  return (
    <>
      <AuthProvider>
        <ShoppingCartProvider>
          <ToastContainer />
          <Navbar />
          <Container>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <React.Suspense fallback={<Loading />}>
                    <LazyHome />
                  </React.Suspense>
                }
              />
              <Route
                path="/store"
                element={
                  <React.Suspense fallback={<Loading />}>
                    <LazyStore />
                  </React.Suspense>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </Container>
        </ShoppingCartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
