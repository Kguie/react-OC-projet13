import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../../pages/home/Home";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SignIn from "../../pages/signIn/SignIn";
import User from "../../pages/user/User";
import Error from "../../pages/error/Error";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <SignIn /> },
  { path: "/profile/:id", element: <User /> },
  { path: "*", element: <Error /> },
];
