import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddProduct from "../../components/AddProduct/AddProduct";
import Delete from "../../components/Delete";
import UpdateProduct from "../../components/UpdateProduct";
import { REACT_API_URL } from "../../utils/http";
import { formatCurrency, getStringtoYear } from "../../utils/utils";
export default function ProductList() {
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

  //Data
  const product = useSelector((state) => state.product.products);
  const navigate = useNavigate();
  const deleteProduct = async (id) => {
    await axios.delete(`${REACT_API_URL}/products/delete/${id}`);
    toast.success("Xóa sản phẩm Thành Công");
    navigate("/admin");
  };

  const columns = [
    {
      title: "STT",
      accessor: "index",
      width: 50,
      fixed: "left",
      render: (text, object, index) => index + 1,
    },
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      render: (image) => <img src={image} alt={image} className="h-[100px]" />,
      width: 150,
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (price) => <p>{formatCurrency(price)} đ</p>,
    },
    {
      title: "Trang",
      dataIndex: "page",
      key: "page",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Năm XB",
      dataIndex: "yearPublish",
      key: "yearPublish",
      render: (text) => <p>{getStringtoYear(text)}</p>,
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplier",
      key: "supplier",
      render: (text) => <p>{text}</p>,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Delete onOk={() => deleteProduct(record._id)} />
          <UpdateProduct id={record._id} />
        </Space>
      ),
    },
  ];
  return (
    <>
      <AddProduct />
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 20,
              }}
              dangerouslySetInnerHTML={{ __html: record.description }}
            ></p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={product}
      />
    </>
  );
}
