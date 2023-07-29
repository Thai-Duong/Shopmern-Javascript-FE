import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, Space } from "antd";
import React from "react";
const { confirm } = Modal;
export default function Delete({ onOk }) {
  const showDeleteConfirm = () => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        onOk();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <Space wrap>
      <div onClick={showDeleteConfirm} type="dashed" className="text-2xl">
        <DeleteOutlined />
      </div>
    </Space>
  );
}
