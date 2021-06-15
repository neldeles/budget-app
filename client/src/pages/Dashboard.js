/** @jsxImportSource @emotion/react */
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import tw from "twin.macro";

// Services
import dashboardService from "../services/dashboard";

// Components
import Header from "../components/Header";
import BudgetTableContainer from "../components/BudgetTableContainer";

const navigation = [
  { name: "Budget", href: "#", icon: HomeIcon, current: true },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Wallets", href: "#", icon: FolderIcon, current: false },
];

const data = [
  {
    category: "Electricity",
    budgeted: 0,
    activity: 0,
    available: 0,
    category_group_name: "Immediate Obligations",
    id: 1,
  },
  {
    category: "Electricity",
    budgeted: 0,
    activity: 0,
    available: 0,
    category_group_name: "Immediate Obligations",
    id: 2,
  },
  {
    category: "Electricity",
    budgeted: 0,
    activity: 0,
    available: 0,
    category_group_name: "True Expenses",
    id: 3,
  },
];

const Dashboard = ({ setAuth }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({});

  async function fetchUser() {
    try {
      const config = {
        headers: { token: localStorage.token },
      };
      const response = await dashboardService(config);
      setUser(response);
    } catch (err) {
      console.error(err.message);
    }
  }

  const handleLogout = () => {
    window.localStorage.clear();
    setAuth(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div tw="h-screen flex overflow-hidden bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay tw="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div tw="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div tw="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    tw="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span tw="sr-only">Close sidebar</span>
                    <XIcon tw="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div tw="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div tw="flex-shrink-0 flex items-center px-4">
                  <img
                    tw="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt="Workflow"
                  />
                </div>
                <nav tw="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      css={[
                        tw`flex items-center px-2 py-2 text-base font-medium rounded-md`,
                        !item.current &&
                          tw`text-gray-600 hover:bg-gray-50 hover:text-gray-900`,
                        item.current && tw`bg-gray-100 text-gray-900`,
                      ]}
                    >
                      <item.icon
                        css={[
                          tw`mr-4 flex-shrink-0 h-6 w-6`,
                          !item.current &&
                            tw`text-gray-400 group-hover:text-gray-500`,
                          item.current && tw`text-gray-500`,
                        ]}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              <div tw="flex-shrink-0 flex border-t border-gray-200 p-4">
                <button tw="flex-shrink-0 block">
                  <div tw="text-left">
                    <div tw="ml-3">
                      <p tw="text-base font-medium text-gray-700">
                        {user.name}
                      </p>
                      <button
                        onClick={handleLogout}
                        tw="text-xs font-medium text-gray-500 hover:text-pink-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </Transition.Child>
          <div tw="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div tw="hidden md:flex md:flex-shrink-0">
        <div tw="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div tw="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div tw="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div tw="flex items-center flex-shrink-0 px-4">
                <span tw="font-medium text-2xl">My Budget App </span>
              </div>
              <nav tw="mt-5 flex-1 px-2 bg-white space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    css={[
                      tw`flex items-center px-2 py-2 text-base font-medium rounded-md`,
                      !item.current &&
                        tw`text-gray-600 hover:bg-gray-50 hover:text-gray-900`,
                      item.current && tw`bg-gray-100 text-gray-900`,
                    ]}
                    className="group"
                  >
                    <item.icon
                      css={[
                        tw`mr-4 flex-shrink-0 h-6 w-6`,
                        !item.current &&
                          tw`text-gray-400 group-hover:text-gray-500`,
                        item.current && tw`text-gray-500`,
                      ]}
                      className="group"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div tw="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div tw="text-left">
                <p tw="text-sm font-medium text-gray-700">{user.name}</p>
                <button
                  onClick={handleLogout}
                  tw="text-xs font-medium text-gray-500 hover:text-pink-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div tw="flex flex-col w-0 flex-1 overflow-hidden">
        <div tw="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            tw="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span tw="sr-only">Open sidebar</span>
            <MenuIcon tw="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main tw="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div tw="py-6">
            <Header />
            <div tw="max-w-7xl mx-auto px-4 my-4 sm:px-6 md:px-8">
              <BudgetTableContainer data={data} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
