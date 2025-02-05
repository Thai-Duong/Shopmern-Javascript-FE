import { AutoComplete, Divider, Dropdown, Input, message, Popover } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../redux/userSlice";
import { generateNameId } from "../../utils/utils";
import { REACT_API_URL } from "../../utils/http";
import axios from "axios";

export default function Header() {
  // data
  const product = useSelector((state) => state.cart.cart);
  const userData = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  //sreach products
  const [options, setOptions] = useState([]); // Gợi ý sản phẩm
  const handleSearch = async (value) => {
    if (!value.trim()) {
      setOptions([]);
      return;
    }

    try {
      const response = await axios.get(
        `${REACT_API_URL}/products/search?query=${value}`
      );
      const data = response.data;

      // Chuyển dữ liệu sang format phù hợp cho AutoComplete
      const formattedOptions = data.map((item) => ({
        value: item.name,
        label: (
          <Link
            to={`${"/products/"}${generateNameId({
              name: item.name,
              id: item._id,
            })}`}
            className="flex gap-4"
          >
            <img src={item.image} alt="" className="w-10 h-16" />
            <>
              <div>{item.name}</div>
              <div className="text-gray-400">{item.price || ""}</div>
            </>
          </Link>
        ),
      }));
      setOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSelect = (value) => {
    console.log("Selected:", value);
  };

  //logout
  const handleLogout = () => {
    dispatch(logout());
    navigator("/");
    toast.success("Logout successfully");
    window.location.reload(); // Force page reload
  };

  //Menu information
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          className="flex gap-3 my-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
            />
          </svg>

          <div>
            <div className="font-bold text-black">
              Nâng tầm ngoài ngữ cùng MCBOOK
            </div>
            <p className="text-gray-400">
              Sale khung lên đến 70% - Giảm ngay 15k cho Đơn hàng từ 149k
            </p>
          </div>
        </a>
      ),
    },
    {
      key: "22",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          className="flex gap-3 my-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
            />
          </svg>

          <div>
            <div className="font-bold text-black">
              Nâng tầm ngoài ngữ cùng MCBOOK
            </div>
            <p className="text-gray-400">
              Sale khung lên đến 70% - Giảm ngay 15k cho Đơn hàng từ 149k
            </p>
          </div>
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          className="flex gap-3 my-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
            />
          </svg>

          <div>
            <div className="font-bold text-black">
              Nâng tầm ngoài ngữ cùng MCBOOK
            </div>
            <p className="text-gray-400">
              Sale khung lên đến 70% - Giảm ngay 15k cho Đơn hàng từ 149k
            </p>
          </div>
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          className="flex gap-3 my-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
            />
          </svg>

          <div>
            <div className="font-bold text-black">
              Nâng tầm ngoài ngữ cùng MCBOOK
            </div>
            <p className="text-gray-400">
              Sale khung lên đến 70% - Giảm ngay 15k cho Đơn hàng từ 149k
            </p>
          </div>
        </a>
      ),
    },
    {
      key: "5",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          className="flex gap-3 my-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
            />
          </svg>

          <div>
            <div className="font-bold text-black">
              Nâng tầm ngoài ngữ cùng MCBOOK
            </div>
            <p className="text-gray-400">
              Sale khung lên đến 70% - Giảm ngay 15k cho Đơn hàng từ 149k
            </p>
          </div>
        </a>
      ),
    },
    {
      key: "6",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          className="flex gap-3 my-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
            />
          </svg>

          <div>
            <div className="font-bold text-black">
              Nâng tầm ngoài ngữ cùng MCBOOK
            </div>
            <p className="text-gray-400">
              Sale khung lên đến 70% - Giảm ngay 15k cho Đơn hàng từ 149k
            </p>
          </div>
        </a>
      ),
    },
    {
      key: "7",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          className="flex gap-3 my-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
            />
          </svg>

          <div>
            <div className="font-bold text-black">
              Nâng tầm ngoài ngữ cùng MCBOOK
            </div>
            <p className="text-gray-400">
              Sale khung lên đến 70% - Giảm ngay 15k cho Đơn hàng từ 149k
            </p>
          </div>
        </a>
      ),
    },
  ];

  return (
    <div className="bg-white px-[140px] font-bold grid grid-cols-4 text-gray-500 mb-5 py-1 ">
      {/* Logo website */}
      <div className="flex col-span-1 mt-3 text-2xl ">
        <Link to="/">
          <img src="./fahasa-logo.webp" alt="logo" className="h-[40px]" />
        </Link>
      </div>

      {/* Menu and Sreach */}
      <div className="flex items-center col-span-2 gap-3">
        <Popover>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>
        </Popover>

        <div className="relative w-full">
          <AutoComplete
            options={options}
            onSearch={handleSearch}
            onSelect={handleSelect}
            style={{ width: "100%" }}
            placeholder="Tìm kiếm sản phẩm..."
          >
            <Input className="p-2" />
          </AutoComplete>
        </div>
      </div>

      {/* User and Cart */}
      <div className="flex items-center justify-end col-span-1 gap-3">
        <Dropdown
          menu={{
            items,
            onClick,
          }}
          placement="bottomRight"
          className="relative p-3 text-xl fa-solid fa-cart-shopping"
        >
          <a onClick={(e) => e.preventDefault()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>{" "}
            <span className="absolute top-0 flex items-center justify-center w-5 h-4 text-sm text-white bg-red-800 rounded-full right-5">
              50          
            </span>
            <div className="text-xs font-medium text-gray-400 ">Thông Báo</div>{" "}
          </a>
        </Dropdown>
        <div className="flex justify-end">
          <Popover
            title={
              <div>
                {userData ? (
                  <div className="text-gray-500 w-[250px]">
                    <Link
                      to="/profile"
                      className="flex w-full gap-2 text-left bg-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-12 h-12"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>

                      <div>
                        <div className="text-lg font-bold text-black">
                          {userData.name}
                        </div>
                        <div className="text-sm">
                          {userData?.isAdmin === true
                            ? "Quản Lý Fahasa"
                            : "Thành Viên Fahasa"}
                        </div>
                      </div>
                    </Link>
                    {userData.isAdmin === true ? (
                      <>
                        <Divider className="my-2" />
                        <Link
                          to="/admin"
                          className="flex w-full gap-2 text-left bg-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                          Trang Admin
                        </Link>
                      </>
                    ) : (
                      ""
                    )}
                    <Divider className="my-2" />
                    <Link
                      to="/profile"
                      className="flex w-full gap-2 text-left bg-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>{" "}
                      Đơn Hàng Của Tôi
                    </Link>
                    <Divider className="my-2" />
                    <Link
                      to=""
                      className="flex w-full gap-2 text-left bg-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                      Sản Phẩm Yêu Thích
                    </Link>
                    <Divider className="my-2" />
                    <Link
                      to=""
                      className="flex w-full gap-2 text-left bg-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                        />
                      </svg>{" "}
                      Wallet Voucher
                    </Link>
                    <Divider className="my-2" />
                    <button
                      className="flex w-full gap-2 text-left bg-white hover:text-blue-400"
                      onClick={handleLogout}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
                        />
                      </svg>
                      Thoát Khỏi Tài Khoản
                    </button>
                  </div>
                ) : null}
                {!userData ? (
                  <div className="block w-full px-3 py-2 text-left bg-white">
                    Đăng Nhập và Đăng Ký
                  </div>
                ) : null}
              </div>
            }
          >
            {userData ? (
              <div className="items-center mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 ml-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <div className="text-xs font-medium text-gray-400">
                  {userData.name}
                </div>
              </div>
            ) : (
              <div className="flex items-center mt-1 rounded-lg ">
                <Link
                  to="/login"
                  className="flex items-center justify-center mx-3"
                >
                  <img
                    src="https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png"
                    alt="header_header_account_img"
                    className="w-6 h-6 mr-2"
                  />
                </Link>
              </div>
            )}
          </Popover>

          <Link
            to="/cart"
            className="relative p-3 ml-2 text-xl fa-solid fa-cart-shopping"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 ml-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span className="absolute top-0 flex items-center justify-center w-4 h-4 text-sm text-white bg-red-800 rounded-full right-5">
              {product.length}
            </span>
            <div className="text-xs font-medium text-gray-400">Giỏ Hàng</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
