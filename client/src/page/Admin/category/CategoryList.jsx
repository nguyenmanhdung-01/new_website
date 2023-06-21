import { useState } from "react";
import CategoryFormAdd from "./CategoryFormAdd";
import Modal from "../../../components/Modal/Modal";
import FormEditCategory from "./FormEditCategory";
import axios from "axios";
import FormDeleteCategory from "./FormDeleteCategory";
import { GrAdd } from "react-icons/gr";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";

const CategoryItem = ({ comment, setOpen, open, fetchData }) => {
  const [openEditForm, setOpenEditForm] = useState(false);
  const [newsCategoryEdit, setNewsCategoryEdit] = useState();
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [newsCategoryDelete, setNewsCategoryDelete] = useState([]);

  const handleEdit = async (item) => {
    // console.log("vao day: ", item);
    setNewsCategoryEdit(item);
    setOpenEditForm(true);
  };

  const handleDelete = async (item) => {
    try {
      const result = await axios.get(
        `http://localhost:3001/api/newscategory/getOneCategory/${item.news_category_id}`,
        {
          withCredentials: true,
        }
      );
      setNewsCategoryDelete(result.data);
      setOpenDeleteForm(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div
        className={`${
          comment.father_id === null
            ? "mt-2 pt-3 px-3 border-[1px] border-gray-300 rounded-md bg-gray-100 mb-3"
            : ""
        }`}
      >
        <div className="flex gap-2 items-center mb-3 ">
          <div className="flex-1 flex justify-between bg-gray-200 rounded-lg px-2 py-1 ">
            <p>{comment.name}</p>
            <div className="flex gap-2">
              <button onClick={() => setOpen(comment.news_category_id)}>
                <GrAdd />
              </button>
              <button onClick={() => handleEdit(comment)}>
                <AiTwotoneEdit />
              </button>

              <button onClick={() => handleDelete(comment)}>
                <AiTwotoneDelete />
              </button>
            </div>
          </div>
        </div>
        {comment.news_category_id === open && (
          <CategoryFormAdd
            value={comment}
            fetchData={fetchData}
            setOpen={setOpen}
          />
        )}

        {comment.children.length > 0 && (
          <div className="ml-4">
            {comment.children.map((child) => (
              <CategoryItem
                key={child.id}
                comment={child}
                setOpen={setOpen}
                open={open}
                fetchData={fetchData}
              />
            ))}
          </div>
        )}
      </div>
      <Modal open={openEditForm} setOpen={setOpenEditForm} title="Sửa danh mục">
        <FormEditCategory
          newsCategoryEdit={newsCategoryEdit}
          setOpen={setOpenEditForm}
          fetchData={fetchData}
        />
      </Modal>

      {newsCategoryDelete ? (
        <Modal
          open={openDeleteForm}
          setOpen={setOpenDeleteForm}
          title="Xóa danh mục"
        >
          <FormDeleteCategory
            newsCategoryDelete={newsCategoryDelete}
            setOpenDeleteForm={setOpenDeleteForm}
            fetchData={fetchData}
          />
        </Modal>
      ) : null}
    </div>
  );
};

const CategoryList = ({ comments, setOpen, open, fetchData }) => {
  return (
    <div className={`p-[10px] border border-gray-300`}>
      {comments.map((comment) => (
        <CategoryItem
          key={comment.id}
          comment={comment}
          setOpen={setOpen}
          open={open}
          fetchData={fetchData}
        />
      ))}
    </div>
  );
};
export default CategoryList;
