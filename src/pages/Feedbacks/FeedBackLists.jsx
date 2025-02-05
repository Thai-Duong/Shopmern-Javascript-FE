import { DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeedback } from "../../redux/feedbackSlice";
import { REACT_API_URL } from "../../utils/http";

export default function FeedbackLists() {
  const dispatch = useDispatch();
  const feedbacks = useSelector((state) => state.feedback.feedback);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFeedback = async () => {
    try {
      const res = await axios.get(`${REACT_API_URL}/feedback/getAll`);
      console.log("res", res);
      dispatch(setFeedback(res.data.data));
    } catch (error) {
      message.error("Lỗi khi tải phản hồi!");
    }
  };

  //   const handleDelete = async (id) => {
  //     try {
  //       await axios.delete(`${REACT_API_URL}/feedback/delete/${id}`);
  //       dispatch(removeFeedback(id));
  //       message.success("Xóa phản hồi thành công!");
  //     } catch (error) {
  //       message.error("Lỗi khi xóa phản hồi!");
  //     }
  //   };

  //   const filteredFeedbacks = feedbacks.filter((fb) =>
  //     fb.message.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  useEffect(() => {
    fetchFeedback();
  }, []);
  const columns = [
    { title: "Người gửi", dataIndex: "user", key: "user" },
    { title: "Phản hồi", dataIndex: "message", key: "message" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          //   onClick={() => handleDelete(record.id)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý Phản hồi</h2>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm phản hồi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 300 }}
        />
      </Space>
      <Table columns={columns} dataSource={feedbacks} rowKey="id" />
    </div>
  );
}
