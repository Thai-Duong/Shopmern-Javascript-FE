import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/utils";

export default function OrderList() {
  const order = useSelector((state) => state.order.order);

  //Table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "STT",
      accessor: "index",
      width: 50,
      fixed: "left",
      render: (text, object, index) => index + 1,
    },

    {
      title: "Tên Người Nhận Hàng",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Giá",
      dataIndex: "totalAmount",
      render: (totalAmount) => <p>{formatCurrency(totalAmount)} đ</p>,
    },
    {
      title: "Địa Chỉ Nhận Hàng",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "ID Tài Khoản",
      dataIndex: "user",
      ...getColumnSearchProps("user"),
    },
    {
      title: "SDT",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    // {
    //   title: "Đã Giao",
    //   dataIndex: "isDelivered",
    //   key: "isDelivered",
    //   render: (isDelivered) => <p>{isDelivered.toString()}</p>,
    // },
    // {
    //   title: "Đã Thanh Toán",
    //   dataIndex: "isPaid",
    //   key: "isPaid",
    //   render: (isPaid) => <p>{isPaid.toString()}</p>,
    // },
  ];
  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <div
            style={{
              margin: 20,
            }}
          >
            {record.cart.map((item) => (
              <tr key={item._id} className="flex gap-5 mb-2 item-between">
                <td className="w-20 h-20 border border-black">
                  <img src={item.image} alt="" />
                </td>
                <td>
                  <div className="mb-10 text-sm font-bold">{item.name}</div>
                  <div className="">{formatCurrency(item.price)} Đ</div>
                </td>
              </tr>
            ))}
          </div>
        ),
        rowExpandable: (record) => record.cart.name !== "Not Expandable",
      }}
      dataSource={order}
    />
  );
}
