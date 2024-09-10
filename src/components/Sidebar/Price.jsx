import React from "react";
import InputFiel from "../InputField/InputFiel";

export default function Price({ handleChange }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="mt-3 text-xl font-semibold">Giá</div>
      <form>
        <fieldset className="flex flex-col gap-3">
          <InputFiel
            handleChange={handleChange}
            name="test"
            title="Tất Cả"
            value=""
          />
          <InputFiel
            handleChange={handleChange}
            name="test"
            title="< 200.000 đ"
            value={100000}
          />
          <InputFiel
            handleChange={handleChange}
            name="test"
            title="< 500.000 đ"
            value={300000}
          />
          <InputFiel
            handleChange={handleChange}
            name="test"
            title="< 1.000.000 đ"
            value={80000000}
          />
          <InputFiel
            handleChange={handleChange}
            name="test"
            title="< 5.000.000 đ"
            value={100000000}
          />
        </fieldset>
      </form>
    </div>
  );
}
