import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import SignIn from "../modules/signin/SignIn";
import SignUp from "../modules/signup/SignUp";
import TableView from "../../components/TableView";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../modules/constantComponents/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    exact: true,
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    exact: true,
    element: (
      <Layout>
        <SignIn />
      </Layout>
    ),
  },
  {
    path: "/signup",
    exact: true,
    element: (
      <Layout>
        <SignUp />
      </Layout>
    ),
  },
  {
    path: "/table",
    exact: true,
    element: (
      <Layout>
        <ProtectedRoute>
          <TableView />
        </ProtectedRoute>
      </Layout>
    ),
  },
]);

export default router;
