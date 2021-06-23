/** @jsxImportSource @emotion/react */
import "twin.macro";
import { Link } from "react-router-dom";
import { useField } from "../hooks";

// Services
import registerService from "../services/register";
import categoryService from '../services/category'
import categoryGroupService from '../services/categoryGroup'

// Utilities
import { generateTokenConfig } from "../utilities";

const moment = require("moment");

const Register = ({ setAuth }) => {
  const name = useField("name", "text");
  const email = useField("email", "email");
  const password = useField("password", "password");

  const { clearState: nameClearState, ...nameFieldProps } = name;
  const { clearState: emailClearState, ...emailFieldProps } = email;
  const { clearState: passwordClearState, ...passwordFieldProps } = password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: name.value,
        email: email.value,
        password: password.value,
      };

      const response = await registerService(data);

      nameClearState();
      passwordClearState();
      emailClearState();

      if (response.token) {
        localStorage.setItem("token", response.token);

        // create default "to be budgeted category" if registration is successful
        // its category group is inflow by default
        const categoryGroupServiceResponse = await categoryGroupService.create({name: "Inflow"}, generateTokenConfig()) 
        const {id: categoryGroupId} = categoryGroupServiceResponse

        const categoryServiceCreatePayload = {
          name: "To be budgeted",
          category_group_id: categoryGroupId,
          date: moment() 
        }

        await categoryService.create(categoryServiceCreatePayload, generateTokenConfig())

        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error("error", err.message);
    }
  };
  return (
    <div tw="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div tw="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 tw="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register for a new account
        </h2>
      </div>

      <div tw="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div tw="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form tw="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                tw="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div tw="mt-1">
                <input
                  {...nameFieldProps}
                  required
                  tw="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                tw="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div tw="mt-1">
                <input
                  {...emailFieldProps}
                  autoComplete="email"
                  required
                  tw="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                tw="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div tw="mt-1">
                <input
                  {...passwordFieldProps}
                  autoComplete="current-password"
                  required
                  tw="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div tw="flex items-center justify-center">
              <div tw="text-sm">
                <Link
                  to="/login"
                  tw="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Already have an account? Login
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                tw="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
