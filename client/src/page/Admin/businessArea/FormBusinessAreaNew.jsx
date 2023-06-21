import React from "react";
import FormBusinessArea from "./FormBusinessArea";
import axios from "axios";
import { toast } from "react-toastify";
const initValue = {
  name: "",
  status: 1,
  content: "",
};

const FormBusinessAreaNew = ({ setOpen, fetchData }) => {
  const onSave = async (data) => {
    try {
      console.log("form business are new: ", data);
      const result = await axios.post(
        "http://localhost:3001/api/business-areas",
        data,
        {
          withCredentials: true,
        }
      );
      console.log(result);
      fetchData();
      setOpen(false);
      toast.success("Thêm lĩnh vực hoạt động thành công.");
    } catch (error) {
      console.log(error.message);
      toast.success("Thêm lĩnh vực hoạt động thất bại.");
    }
    // const data =await axios.post('http://localhost:3001/api/event/createEvent', )
  };
  return (
    <div>
      <FormBusinessArea initValue={initValue} onSave={onSave} />
    </div>
  );
};

export default FormBusinessAreaNew;
