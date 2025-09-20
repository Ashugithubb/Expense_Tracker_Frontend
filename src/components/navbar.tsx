'use client'
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/redux/hook/hook";
import { toast, ToastContainer } from "react-toastify";
import { logoutUser } from "@/app/redux/thunk/authThunk";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handelLogOut = async () => {
    const res = await dispatch(logoutUser());
    if (res.meta.requestStatus === 'fulfilled') {
      router.push('/login');
    } else {
      toast.error(res.payload || "Logout failed");
    }
  }

  const navItems = [
    { name: "Dashboard & Analytics", path: "/dashboard" },
    { name: "Expenses", path: "/expenses" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center h-16 px-4 md:px-8">
        <ToastContainer />

        <Link
          href="/dashboard"
          className="text-3xl font-extrabold text-indigo-600 tracking-tight hover:text-indigo-700 transition"
        >
          ExpenseTracker
        </Link>


        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative px-2 py-1 font-medium transition 
                ${pathname === item.path
                  ? "text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"}`}
            >
              {item.name}
              {pathname === item.path && (
                <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-indigo-600 rounded-full"></span>
              )}
            </Link>
          ))}

          <button
            onClick={handelLogOut}
            className="ml-4 bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition cursor-pointer"
          >
            Logout
          </button>

        </div>


        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>


      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col p-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-2 py-2 rounded-md font-medium transition 
                  ${pathname === item.path
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"}`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={handelLogOut}
              className="ml-4 bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition cursor-pointer"
            >
              Logout
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}
