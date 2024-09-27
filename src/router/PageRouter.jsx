import { Routes, Route } from "react-router-dom";
import { Paths } from "./Paths";
import { MainLayout } from "../Layouts/MainLayout";

export const PageRouter = () => {
  return (
    <Routes>
      <Route path={Paths.home} element={<MainLayout />}>
        <Route index element={<h1>React Boilerplate 2.0</h1>} />
        <Route path={Paths.pageNotFound} element={<h2>404 not found...</h2>} />
      </Route>
    </Routes>
  );
};
