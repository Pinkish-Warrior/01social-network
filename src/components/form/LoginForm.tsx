"use client";

import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Input from "@components/ui/Input";
import Button from "@ui/Button";
import Link from "next/link";
import FormLayout from "@ui/FormLayout";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = (): JSX.Element => {
  const router = useRouter();

  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // State for error message

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setError(null); // Reset error on input change
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
        credentials: "include",
      });

      if (res.status === 200) {
        router.push("/"); // Redirect to main page
      } else if (res.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("An unexpected error occurred. Please try again."); // Handle other errors
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred. Please try again later."); // Handle network errors
    } finally {
      setIsLoading(false); // Reset loading state after submission attempt
    }
  };

  // Functions to handle social login redirection
  const redirectToOAuth = (provider: string) => {
    window.location.href = `http://localhost:8000/auth/${provider}/login`;
  };

  return (
    <FormLayout
      title="Login"
      subtitle="Sign in to your account"
      containerClassName="mt-20 mb-12 lg:mt-10 lg:mb-0 max-w-md mx-auto bg-blue-100 p-4 w-full border rounded-lg shadow-md glassmorphis"
    >
      {/* Social Login Buttons */}
      <div className="flex gap-4 mt-4">
        <Button
          type="button"
          onClick={() => redirectToOAuth("google")}
          className="flex items-center justify-center bg-red-500 text-white hover:bg-red-700 py-2 px-4 rounded-md shadow-md w-full"
        >
          <FaGoogle className="mr-2" /> Google
        </Button>
        <Button
          type="button"
          onClick={() => redirectToOAuth("facebook")}
          className="flex items-center justify-center bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded-md shadow-md w-full"
        >
          <FaFacebook className="mr-2" /> Facebook
        </Button>
        <Button
          type="button"
          onClick={() => redirectToOAuth("github")}
          className="flex items-center justify-center bg-gray-500 text-white hover:bg-gray-800 py-2 px-4 rounded-md shadow-md w-full"
        >
          <FaGithub className="mr-2" /> GitHub
        </Button>
      </div>
      {/* Divider with text on the same line */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-600">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          placeholder="example@email.com"
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formValues.password}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="Ocean_wave_button w-full mt-4 py-2"
        >
          {isLoading ? "Signing in..." : "Login"}
        </Button>
        {/* Add the link to the registration page */}
        <hr className="my-4" />
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-700 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </FormLayout>
  );
};

export default LoginForm;
