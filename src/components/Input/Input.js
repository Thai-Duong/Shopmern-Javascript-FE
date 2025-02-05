import React from "react";
import { useController } from "react-hook-form";

export default function Input({ control, name, ...props }) {
  const { field, fieldState } = useController({
    control,
    name,
  });
  return (
    <div className="flex flex-col w-full mt-4">
      <input
        {...field}
        {...props}
        className="px-4 py-2 pl-5 mb-2 text-sm border border-gray-200 rounded-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
      />
      {fieldState.error && (
        <p className="pl-2 text-sm text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
}
