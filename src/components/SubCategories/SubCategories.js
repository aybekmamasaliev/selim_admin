import React, { useState } from "react";
import {
  useAddCategoryMutation,
  useDelCategoryMutation,
  useGetCategoryDetailsQuery,
  usePutCategoriesMutation,
} from "../../store/apis/appSelim";
import styles from "./SubCategories.module.scss";
import Button from "../Button/Button";

const SubCategories = (props) => {
  const id = props.id;
  const [new_description, setNewdescription] = useState("");
  const [newTitle, setNewtitle] = useState("");
  const [newImage, setNewImage] = useState(null);

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateText, setUpdateText] = useState("");
  const [updateImage, setUpdateImage]=useState(null);
  const [postBool, setPostBool] = useState(false);

  const { data: subCategories = [] } = useGetCategoryDetailsQuery(id);
  const [updateDetailsCategory] = usePutCategoriesMutation();
  const [deleteData] = useDelCategoryMutation();
  const [addSubCategory] = useAddCategoryMutation();

  const deleteCategoryAdvantages = (e, id) => {
    e.preventDefault();
    deleteData(id)
      .unwrap()
      .then((payload) => {
        alert("ok");
      })
      .catch((err) => alert(err.status));
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
    console.log(newImage)
  };

//   const handleChangeUpdateFile = (e) => {
//     setUpdateImage(e.target.files[0]);
//   };


  const postSubCategory = (e, n) => {
    e.preventDefault();
    setPostBool(true);
    const formdata = new FormData();
    if (newTitle) {
      formdata.append("title", newTitle);
    }
    if (new_description) {
      formdata.append("description", new_description);
    }
    if (newImage) {
      formdata.append("image", newImage);
    }

    formdata.append("parent_category", n)

    addSubCategory(formdata)
      .unwrap()
      .then((payload) => {
        alert("ok");
        setPostBool(false);
        setNewdescription("");
        setNewtitle("");
        setNewImage(null)
      })
      .catch((err) => {
        alert(err.status);
        setPostBool(false);
        setNewdescription("");
        setNewtitle("");
        setNewImage(null)
      });
  };

  const handleTile = (e) => {
    setUpdateTitle(e.target.value);
  };

  const handleText = (e) => {
    setUpdateText(e.target.value);
  };

  const updateDataSubCategory = (e, id) => {
    e.preventDefault();
    const formdata = new FormData();
    if (updateTitle) {
      formdata.append("title", updateTitle);
    }
    if (updateText) {
      formdata.append("description", updateText);
    }
    if(updateImage){
        formdata.append("image", updateImage)
    }

    const variable = { id, formdata };

    updateDetailsCategory(variable)
      .unwrap()
      .then((payload) => {
        alert("ok");
      })
      .catch((err) => {
        alert(err.status);
      });
  };

  return (
    <>
      <div className={styles.cover_form}>
        {subCategories.child_category?.map((item) => (
          <form className={styles.form} key={item.id}>
            {/* <p className={styles.form__field}>
              <label
                htmlFor={`subcategory_file_${item.id}`}
                className={styles.form__label}
              >
                {updateImage ? (
                  <span>{updateImage.name}</span>
                ) : (
                  <span>Обновить Файл</span>
                )}
              </label>
              <input
                className={styles.form__file}
                type="file"
                name="news_file"
                onChange={handleChangeUpdateFile}
                id={`subcategory_file_${item.id}`}
              />
            </p> */}
            <div className={styles.div_subcategories}>
              <img alt="" src={item.image} className={styles.image_detail} />
            </div>
            <div className={styles.flex_c}>
              <label htmlFor={`title_subcategory_${item.id}`}>
                Заголовок подкатегории
              </label>
              <input
                id={`title_subcategory_${item.id}`}
                className={styles.input}
                defaultValue={item.title}
                onChange={handleTile}
              />
            </div>
            <div className={styles.flex_c}>
              <label htmlFor={`sub_text_area_${item.id}`}>
                Описание подкатегории
              </label>
              <textarea
                className={styles.texarea}
                id={`sub_text_area_${item.id}`}
                defaultValue={item.description}
                onChange={handleText}
              />
            </div>
            <Button onClick={(e) => updateDataSubCategory(e, item.id)}>Обновить</Button>
            <br />
            <Button onClick={(e) => deleteCategoryAdvantages(e, item.id)}>
              Удалить
            </Button>
          </form>
        ))}
      </div>
      <div className={styles.cover_form}>
        <form className={styles.form}>
          <p className={styles.form__field}>
            <label htmlFor={`image_of_subcategory_${id}`} className={styles.form__label}>
              {newImage ? (
                <span>Вы выбрали файл : {newImage.name}</span>
              ) : (
                <span>Выберите Файл</span>
              )}
            </label>
            <input
              className={styles.form__file}
              type="file"
              id={`image_of_subcategory_${id}`}
              name="title"
              onChange={handleImageChange}
            />
          </p>

          <div className={styles.flex_c}>
            <label htmlFor={`title}`}>Заголовок подкатегории</label>
            <input
              id={`title`}
              value={newTitle}
              onChange={(e) => setNewtitle(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.flex_c}>
            <label htmlFor={`text`}>Описание подкатегории</label>
            <textarea
              className={styles.texarea}
              value={new_description}
              id={`text`}
              onChange={(e) => setNewdescription(e.target.value)}
            />
          </div>
          <Button onClick={(e) => postSubCategory(e, props.id)}>
            {postBool ? <span>Выкладывается ...</span> : <span>Выложить</span>}
          </Button>
        </form>
      </div>
    </>
  );
};

export default SubCategories;
