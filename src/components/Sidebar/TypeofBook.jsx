import React from "react";
import InputFiel from "../InputField/InputFiel";

export default function TypeofBook({ handleChange }) {
  return (
    <form>
      <fieldset className="flex flex-col gap-3">
        <div className="mt-3 text-xl font-semibold">Thể Loại</div>
        <InputFiel
          handleChange={handleChange}
          name="test"
          title="Tất Cả"
          value=""
        />
        <InputFiel
          handleChange={handleChange}
          name="test"
          value="Thiếu Nhi"
          title="Thiếu Nhi"
        />
        <InputFiel
          handleChange={handleChange}
          name="test"
          title="Lịch sử"
          value="Lịch sử"
        />
        <InputFiel
          handleChange={handleChange}
          name="test"
          title="Sefl Help"
          value="self help"
        />{" "}
        <InputFiel
          handleChange={handleChange}
          name="test"
          title="Tiểu Thuyết"
          value="Tiểu Thuyết"
        />
        <InputFiel
          handleChange={handleChange}
          name="test"
          title="Chính trị"
          value="Chính trị"
        />{" "}
        <InputFiel
          handleChange={handleChange}
          name="test"
          title="Giáo khoa - Tham khảo"
          value="Giáo khoa - Tham khảo"
        />
        <InputFiel
          handleChange={handleChange}
          name="test"
          title="Kinh tế"
          value="Kinh tế"
        />
        <InputFiel
          handleChange={handleChange}
          name="test"
          title="Báo Tạp Chí"
          value="Báo Tạp Chí"
        />
      </fieldset>
    </form>
  );
}
