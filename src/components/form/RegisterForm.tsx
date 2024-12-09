"use client";

import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Input from "@components/ui/Input";
import FileInput from "@ui/FileInput";
import Button from "@ui/Button";
import Link from "next/link";
import FormLayout from "@ui/FormLayout";
import TextArea from "@ui/TextArea";

interface RegisterFormValues {
  email: string;
  password: string;
  passwordRepeat: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // This should be in 'YYYY-MM-DD' format
  avatarUrl?: File | null;
  nickname?: string;
  aboutMe?: string;
}

const RegisterForm = (): JSX.Element => {
  const router = useRouter();

  const [formValues, setFormValues] = useState<RegisterFormValues>({
    email: "",
    password: "",
    passwordRepeat: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    avatarUrl: null,
    nickname: "",
    aboutMe: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define today's date in ISO format
  const todayIso = new Date().toISOString().split("T")[0];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (type === "file" && files) {
      // debug print
      console.log("Selected file:", files[0]);

      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files[0] || null,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (formValues.password !== formValues.passwordRepeat) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    formData.append("password_repeat", formValues.passwordRepeat);
    formData.append("first_name", formValues.firstName);
    formData.append("last_name", formValues.lastName);
    formData.append("date_of_birth", formValues.dateOfBirth);

    if (formValues.avatarUrl) {
      formData.append("avatarUrl", formValues.avatarUrl);
    }

    if (formValues.nickname) {
      formData.append("nickname", formValues.nickname);
    }

    if (formValues.aboutMe) {
      formData.append("about_me", formValues.aboutMe);
    }

    // Log FormData content
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        body: formData, // No need to set Content-Type for FormData; it's automatically set
      });

      // Read response as text
      const responseText = await res.text();
      console.log("Response Text:", responseText); // Debug print to see the response

      if (res.ok) {
        //router.push("/"); // Redirect to the main page
        // login user
        try {
          const loginResponse = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formValues.email,
              password: formValues.password,
            }),
            credentials: "include",
          });

          if (loginResponse.ok) {
            router.push("/"); // Redirect to main page
          } else {
            const errorData = await loginResponse.json();
            console.error("Login failed:", errorData);
            setError(errorData.message || "Login failed after registration.");
          }
        } catch (error) {
          console.error("Error logging in after registration:", error);
          setError(
            "An error occurred while logging in. Please try again later."
          );
        }
      } else {
        try {
          // Try to parse the response as JSON
          const errorData = JSON.parse(responseText);
          console.error("Registration failed:", errorData);
          setError(errorData.message || "Registration failed.");
        } catch (jsonError) {
          // If parsing fails, handle it as plain text
          console.error("Failed to parse error response:", responseText);
          setError("Registration failed. Please try again later.");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }

    // Debug print
    console.log("Submitted Data:", formValues);
  };

  return (
    <FormLayout
      title="Register"
      subtitle="Create a new account"
      containerClassName="mt-12 mb-12 lg:mt-0 lg:mb-0 max-w-md mx-auto bg-blue-100 p-4 w-full border rounded-lg shadow-md glassmorphis"
    >
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
        <Input
          label="Repeat Password"
          type="password"
          id="passwordRepeat"
          name="passwordRepeat"
          placeholder="Repeat your password"
          value={formValues.passwordRepeat}
          onChange={handleChange}
          required
        />
        {/* Display error message */}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Loki"
            value={formValues.firstName}
            onChange={handleChange}
            required
          />
          <Input
            label="Last Name"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Smith"
            value={formValues.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <Input
          label="Date of Birth"
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formValues.dateOfBirth}
          onChange={handleChange}
          required
          max={todayIso} // Restrict date to today or earlier
        />
        <FileInput
          label="Avatar/Image (Optional)"
          type="file"
          id="avatarUrl"
          name="avatarUrl"
          accept="image/*"
          onChange={handleChange}
        />
        <Input
          label="Nickname (Optional)"
          type="text"
          id="nickname"
          name="nickname"
          placeholder="Loki"
          value={formValues.nickname || ""}
          onChange={handleChange}
        />
        <TextArea
          label="About Me (Optional)"
          id="aboutMe"
          name="aboutMe"
          placeholder="Hi, I'm a web developer. I'm learning React right now!"
          value={formValues.aboutMe || ""}
          onChange={handleChange}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="Ocean_wave_button w-full mt-4 py-2"
        >
          {isLoading ? "Submitting..." : "Register"}
        </Button>
        {/* Add the link to the login page */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-700 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </FormLayout>
  );
};

export default RegisterForm;
