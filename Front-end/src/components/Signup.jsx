import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullName, // Changed from fullName to fullname to match backend
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post("http://localhost:4001/user/signup", userInfo);
      console.log("Signup response:", response.data);
      if (response.data) {
        toast.success("Signup Successfully");
        localStorage.setItem("Users", JSON.stringify(response.data.user));
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Error: An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[600px]">
          <div className="modal-box bg-white dark:bg-gray-800 text-black dark:text-white p-6">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black dark:text-white"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Signup</h3>
              <div className="mt-4 space-y-2">
                <span>Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full max-w-md px-3 py-2 border rounded-md outline-none bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  {...register("fullName", { required: true })}
                />
                <br />
                {errors.fullName && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Email */}
              <div className="mt-4 space-y-2">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full max-w-md px-3 py-2 border rounded-md outline-none bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Password */}
              <div className="mt-4 space-y-2">
                <span>Password</span>
                <br />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full max-w-md px-3 py-2 border rounded-md outline-none bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Button */}
              <div className="flex justify-around mt-4">
                <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                  Signup
                </button>
              </div>

              <p className="text-xl mt-3">
                Have an account?{" "}
                <button
                  className="underline text-blue-500 dark:text-blue-400 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </button>
              </p>
            </form>
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;