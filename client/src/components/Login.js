/** @jsxImportSource @emotion/react */
import "twin.macro";
import { Link } from "react-router-dom";
import loginService from "../services/login";
import { useField } from "../hooks";

const Login = ({ setAuth }) => {
  const email = useField("email", "email");
  const password = useField("password", "password");

  const { clearState: emailClearState, ...emailFieldProps } = email;
  const { clearState: passwordClearState, ...passwordFieldProps } = password;

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      email: email.value,
      password: password.value,
    };

    try {
      const user = await loginService(credentials);

      emailClearState();
      passwordClearState();
      if (user.token) {
        localStorage.setItem("token", user.token);
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
          Sign in to your account
        </h2>
      </div>

      <div tw="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div tw="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form tw="space-y-6" onSubmit={handleLogin}>
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

            <div tw="flex items-center justify-between">
              <div tw="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  tw="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  tw="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div tw="text-sm">
                <Link
                  to="/register"
                  tw="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Register new account
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                tw="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
