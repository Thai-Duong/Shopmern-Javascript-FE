import React from "react";
import { useController } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export default function Textarea({ control, ...props }) {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <ReactQuill
      {...field}
      {...props}
      theme="snow"
      placeholder="Thông tin sản phẩm"
      className="text-lg "
    />
  );
}
