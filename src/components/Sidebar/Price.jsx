import React from "react";
import InputFiel from "../InputField/InputFiel";

export default function Price({ handleChange }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-xl font-semibold">Giá</div>
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
            value={200000}
          />
          <InputFiel
            handleChange={handleChange}
            name="test"
            title="< 500.000 đ"
            value={500000}
          />
          <InputFiel
            handleChange={handleChange}
            name="test"
            title="< 1.000.000 đ"
            value={1000000}
          />
          <InputFiel
            handleChange={handleChange}
            name="test"
            title="< 5.000.000 đ"
            value={5000000}
          />
        </fieldset>
      </form>
    </div>
  );
}
