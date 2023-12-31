import React from "react";
import { useController } from "react-hook-form";

export default function Input({ control, ...props }) {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <input
      {...field}
      {...props}
      className="w-full px-4 py-3 pl-5 mb-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
    ></input>
  );
}
