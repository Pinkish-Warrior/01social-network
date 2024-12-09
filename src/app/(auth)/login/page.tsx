import type { Metadata } from "next";
import LoginForm from "@components/form/LoginForm";

export const metadata: Metadata = {
  title: "login page",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
