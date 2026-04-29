import { Button } from "@/components/reusable/button";
import {
  selectGlobalParams,
  setGlobalParams,
} from "@/redux/features/auth/globalSlice";
import type { TQueryParam } from "@/types";
import { Mail, Menu, Phone, Search, SearchCheck, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import {
  logout,
  selectCurrentUser,
} from "../../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import logoWhite from "/public/assets/logo-white.png";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const [scrollY, setScrollY] = useState(0);
  const [show, setShow] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<number | null>(null);
  const globalParams = useAppSelector(selectGlobalParams);
  const userImg = (user as unknown as { img?: string } | null)?.img;

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleMouseEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setShow(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 150); // 150ms delay
    setHideTimeout(timeout);
  };

  const navLinks = (
    <ul className="2lg:flex gap-4 2lg:mt-4 2lg:space-y-0 space-y-3 ">
      <li className="">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "   activeNav  " : "inActiveNav "
          }
        >
          Home
        </NavLink>
      </li>

      <li className="relative 2lg:block hidden   ">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="cursor-pointer "
        >
          <NavLink to="/" className="pb-6 rounded-b-none inActiveNav ">
            Featured
          </NavLink>
        </div>
      </li>

      <li className="">
        <NavLink
          to="/all-products"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "   activeNav  " : "inActiveNav "
          }
        >
          All Products
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "   activeNav  " : "inActiveNav "
          }
        >
          About
        </NavLink>
      </li>
      <li className="">
        <NavLink
          to="/contact"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "   activeNav  " : "inActiveNav "
          }
        >
          Contact
        </NavLink>
      </li>
    </ul>
  );

  useEffect(() => {
    const handleScroll = () => setScrollY(document.documentElement.scrollTop);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  const handleResetSearch = () => {
    setSearchTerm("");

    console.log("searchTerm", searchTerm);
  };

  return (
    <nav className=" ">
      <div className="bg-p1">
        <div
          className="customWidth text-sm flex justify-between
         text-white h-[40px]"
        >
          <div className="flex gap-5  items-center    ">
            <p className="font-semibold flex items-center gap-1   ">
              <Phone className="w-[16px]" /> <span>+9 (681) 843-4596</span>
            </p>
            <p className="font-semibold xs:flex items-center gap-1 hidden ">
              <Mail className="w-[16px]" /> <span>info@bikebari.com</span>
            </p>
          </div>
          <div className="md:flex items-center  hidden ">
            <p className="font-semibold  flex gap-1 items-center">
              {/* Discover your perfect rental apartment with our advanced search
               */}
              <SearchCheck className="w-[20px]" />{" "}
              <span className="">
                Shop your dream bike quickly
                <span className="3xs:hidden xl:inline">
                  and easily with our smart filtering tools.
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${
          scrollY > 30
            ? "border-b w-screen ml-[-4px] fixed  top-0 left-0 z-50"
            : ""
        }  border-b3 border-b bg-white  `}
      >
        <div className="customWidth   h-[70px] flex  justify-between items-center">
          <Link to={`/`}>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="bg-p1 p-2 rounded-md">
                  <img
                    className="w-[30px] lg:w-[30px]"
                    src={logoWhite}
                    alt="BikeBari Logo"
                  />
                </div>
                <div>
                  <h2 className="text-base 2xs:text-lg sm:text-xl text-p1 font-bold font-Inter">
                    Bike Bari
                  </h2>
                  <p className="hidden 2xs:block text-[12px] -mt-1 text-d1">
                    Showroom
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <div
            className="border-2 border-white focus-within:border-2
           focus-within:border-p1 rounded-sm p-[1px] 2xl:w-[400px] 2lg:w-[300px] 
           md:w-[380px] sm:w-[300px] sm:block hidden"
          >
            <div className="pl-2 rounded-sm flex items-center border border-[#D9D9D9]  ">
              <input
                name="searchTerm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  // setParams([
                  //   ...(params?.filter((p) => p.name !== "searchTerm") || []),
                  //   { name: "searchTerm", value: e.target.value },
                  // ])

                  dispatch(
                    setGlobalParams([
                      ...(globalParams?.filter(
                        (p: TQueryParam) => p.name !== "searchTerm",
                      ) || []),
                      { name: "searchTerm", value: e.target.value },
                    ]),
                  );
                }}
                id="field-id"
                className=" text-sm text-gray-950 w-full h-[37px] outline-none "
                type="text"
                placeholder="Search for bikes,brands,model..."
                tabIndex={0}
              />

              <Link to={`/all-products`}>
                <div
                  onClick={handleResetSearch}
                  className="bg-p1 px-3 py-1 mr-1 cursor-pointer mx-auto
               text-white flex items-center justify-center rounded-sm"
                >
                  <Search className=" w-[14px] " />
                </div>
              </Link>
            </div>
          </div>
          {/* py-3 */}
          <div
            className={`${
              scrollY > 30 ? "border-none" : ""
            } ] 2lg:flex  items-center hidden  px-12 `}
          >
            <ul className="">{navLinks}</ul>
          </div>

          <div className="">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="dropdown lg:block dropdown-end">
                  <div className="flex gap-3 items-center">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-[40px] rounded-full text-white">
                        <img src={userImg} alt={user?.name} />
                      </div>
                    </label>
                    <div className="hidden 2lg:block">
                      <button
                        onClick={handleLogout}
                        className="text-sm cursor-pointer flex items-center gap-1 font-Inter font-semibold text-p1"
                      >
                        Logout{" "}
                        <HiOutlineLogout className="text-xl"></HiOutlineLogout>
                      </button>
                    </div>
                  </div>

                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-[160px] p-2 shadow"
                  >
                    <li>
                      <a className="justify-between">{user?.name}</a>
                    </li>
                    <li>
                      <Link
                        to={`/${user.role}/overview-dashboard`}
                        className="justify-between"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li className="2lg:hidden">
                      <button
                        onClick={handleLogout}
                        className="justify-between"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setMobileMenu(!mobileMenu)}
                  className="2xs:block 2lg:hidden hover:bg-[#f8fafc] cursor-pointer p-1.5 rounded-sm"
                >
                  <Menu className="w-8" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <button className="mt-1">
                  <NavLink
                    to="/login"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                          ? "text-sm bg-p1 text-white font-Inter rounded-md font-semibold py-2.5 px-6"
                          : "text-sm hover:bg-p1/80 bg-p1 text-white font-Inter rounded-md font-semibold py-2.5 px-6 flex items-center gap-3"
                    }
                  >
                    <User className="w-[20px]" /> Login
                  </NavLink>
                </button>
                <div className="">
                  <button
                    onClick={() => setMobileMenu(!mobileMenu)}
                    className="2xs:block 2lg:hidden
                 hover:bg-[#f8fafc] cursor-pointer p-1.5 rounded-sm "
                  >
                    <Menu className="w-8 " />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenu && (
        <div
          className="fixed inset-0 bg-[#000] opacity-60 z-40"
          onClick={() => setMobileMenu(false)}
        />
      )}
      <div
        className={`2lg:hidden bg-white transition-all duration-300 fixed top-0 right-0 h-full shadow-xl z-50 border-l overflow-hidden w-80 3xs:w-[85vw] 2xs:w-80 ${
          mobileMenu
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div className="p-4">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="2xs:block 2lg:hidden hover:bg-[#f8fafc] cursor-pointer p-2 rounded-sm"
          >
            <X className="w-[25px]" />
          </button>

          <div className="mt-10 mb-2">
            <div className="border-2 border-white focus-within:border-2 focus-within:border-p1 rounded-sm p-[1px] w-full">
              <div className="pl-2 rounded-sm flex items-center border border-[#D9D9D9]">
                <input
                  name="searchTerm"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);

                    dispatch(
                      setGlobalParams([
                        ...(globalParams?.filter(
                          (p: TQueryParam) => p.name !== "searchTerm",
                        ) || []),
                        { name: "searchTerm", value: e.target.value },
                      ]),
                    );
                  }}
                  id="field-id"
                  className="text-sm text-gray-950 w-full h-[37px] outline-none"
                  type="text"
                  placeholder="Search for bikes,brands,model..."
                  tabIndex={0}
                />

                <Link to={`/all-products`}>
                  <div
                    onClick={() => {
                      handleResetSearch();
                      setMobileMenu(false);
                    }}
                    className="bg-p1 px-3 py-1 mr-1 cursor-pointer mx-auto text-white flex items-center justify-center rounded-sm"
                  >
                    <Search className="w-[14px]" />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full border-b mt-8 pb-5 list-none">{navLinks}</div>

          <div className="mt-8 space-y-3">
            {user ? (
              <>
                <Link
                  to={`/${user.role}/overview-dashboard`}
                  onClick={() => setMobileMenu(false)}
                >
                  <Button className="w-full cursor-pointer h-[45px] bg-p1">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    handleLogout();
                    setMobileMenu(false);
                  }}
                  className="w-full cursor-pointer h-[45px] bg-p1/10 text-p1 hover:bg-p1/15"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenu(false)}>
                <Button className="w-full cursor-pointer h-[45px] bg-p1">
                  <User /> Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      {show && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`${
            scrollY > 30 ? "top-[71px]" : "top-[110px]"
          } fixed left-0 bg-[#ededee] z-40 h-[70vh] w-full border-b-5 border-p1 transition-all duration-300`}
        >
          <div className="flex mt-7 justify-center gap-8">
            <div>
              <h1 className="megaMenuTitle">Shop Bikes</h1>
              <ul className="megaMenuList text-lg font-bold">
                <li>Mountain Bikes</li>
                <li>Road Bikes</li>
                <li>Electric Commuter Bikes</li>
                <li>Kids' Balance Bikes</li>
                <li>Gravel Touring Bikes</li>
              </ul>
            </div>
            <div>
              <h1 className="megaMenuTitle">Accessories</h1>
              <ul className="megaMenuList">
                <li>Protective Helmets</li>
                <li>Rechargeable Bike Lights</li>
                <li>High-Security Locks</li>
                <li>Portable Bike Pumps</li>
                <li>Insulated Water Bottles</li>
                <li>Waterproof Bike Bags</li>
                <li>Handlebar Phone Mounts</li>
                <li>Comfort Pedals and Saddles</li>
                <li>Compact Repair Kits</li>
                <li>GPS Navigation Devices</li>
              </ul>
            </div>
            <div>
              <h1 className="megaMenuTitle">Services</h1>
              <ul className="megaMenuList">
                <li>Professional Bike Repairs</li>
                <li>Custom Bike Fitting Services</li>
                <li>Complete Custom Builds</li>
                <li>Bike Trade-In Program</li>
                <li>Annual Maintenance Plans</li>
                <li>Workshop Training Events</li>
                <li>Home Bike Assembly Service</li>
                <li>Local Delivery Services</li>
              </ul>
            </div>
            <div>
              <h1 className="megaMenuTitle">Explore</h1>
              <ul className="megaMenuList">
                <li>New Arrivals Collection</li>
                <li>Best Selling Bikes</li>
                <li>Seasonal Sale & Offers</li>
                <li>Digital Gift Cards</li>
                <li>Beginner Riding Guides</li>
                <li>Customer Experience Reviews</li>
                <li>Bike Size & Fit Guide</li>
                <li>Bike Adventure Blog</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
