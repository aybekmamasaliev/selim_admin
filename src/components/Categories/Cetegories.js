import { useState } from "react";
import {
  useGetNewsQuery,
  usePutNewsMutation,
  useAddNewsMutation,
  useDelNewsMutation,
  useAddSubNewsImgMutation,
  useDelSubNewsFileMutation,
  usePutSubMenuImgMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDelCategoryMutation,
  usePutCategoriesMutation,
  useGetCategoryAdvantagesQuery,
} from "../../store/apis/appSelim";
import Button from "../Button/Button";
import styles from "./Categories.module.scss";

const Categories = () => {
  const [updateNews] = usePutNewsMutation();
  const [addNews, { isLoading }] = useAddNewsMutation();
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: category_dvantages = [] } = useGetCategoryAdvantagesQuery();
  const [deleteNews] = useDelNewsMutation();
  const [addSunNewsImg] = useAddSubNewsImgMutation();
  const [delSubNewsFile] = useDelSubNewsFileMutation();
  const [updateSubImg] = usePutSubMenuImgMutation();

  const [newImage, setNewImage] = useState(null);
  const [newTxt, setNewTxt] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newSubFile, setNewSubFile] = useState("");
  const [boolean, setBoolean] = useState(false);

  const [update_txt, setUpdata_txt] = useState("");
  const [update_file, setUpdate_file] = useState("");
  const [update_title, setUpdate_title] = useState("");
  const [update_desc, setUpdate_desc] = useState("");
  const [update_parent, setUpdate_parent] = useState("");
  const [update_sub_file, setUpdate_sub_file] = useState("");

  const handleDeleteNews = (e, id) => {
    e.preventDefault();
    deleteNews(id)
      .unwrap()
      .then((payload) => {
        alert("ok");
      })
      .catch((err) => {
        alert(err.status);
      });
  };

  const handleUpdateNews = (e, id) => {
    e.preventDefault();
    const formdata = new FormData();
    if (update_txt) {
      formdata.append("text", update_txt);
    }
    if (update_title) {
      formdata.append("title", update_title);
    }
    if (update_file) {
      formdata.append("image", update_file);
    }
    const variable = { id, formdata };
    updateNews(variable)
      .unwrap()
      .then((payload) => {
        setUpdata_txt("");
        setUpdate_file(null);
        setUpdate_title("");
        alert("ok");
      })
      .catch((err) => {
        alert(err.status);
      });
  };

  const upDateSubNewsImg = (e, id) => {
    e.preventDefault();
    const formdata = new FormData();
    if (update_txt) {
      formdata.append("text", update_txt);
    }
    if (update_title) {
      formdata.append("title", update_title);
    }
    if (update_file) {
      formdata.append("image", update_file);
    }
    const variable = { id, formdata };
    updateSubImg(variable)
      .unwrap()
      .then((payload) => {
        setUpdata_txt("");
        setUpdate_file(null);
        setUpdate_title("");
      })
      .catch((err) => {
        alert(err.status);
      });
  };

  const handleChangeUpdateFile = (e) => {
    e.preventDefault();
    setUpdate_file(e.target.files[0]);
  };

  const handleChangeUpdateSubFile = (e) => {
    e.preventDefault();
    setUpdate_sub_file(e.target.files[0]);
  };

  const handleChangeAddSubFile = (e) => {
    e.preventDefault();
    setNewSubFile(e.target.files[0]);
  };

  const addSubFile = (e, id) => {
    e.preventDefault();
    setBoolean(true);
    const formdata = new FormData();
    if (newSubFile) {
      formdata.append("image", newSubFile);
    }
    formdata.append("news", id);
    addSunNewsImg(formdata)
      .unwrap()
      .then((payload) => {
        alert("ok");
        setBoolean(false);
      })
      .catch((err) => {
        alert(err.status);
        setBoolean(false);
      });
  };

  const deleteSubFile = (e, id) => {
    e.preventDefault();
    delSubNewsFile(id)
      .unwrap()
      .then((payload) => {
        alert("ok");
      })
      .catch((err) => {
        alert(err.status);
      });
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
    console.log(e.target.files[0].name);
  };

  const handleAddData = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    if (newImage) {
      formdata.append("image", newImage);
    }
    if (newTxt) {
      formdata.append("text", newTxt);
    }
    if (newTitle) {
      formdata.append("title", newTitle);
    }

    addNews(formdata)
      .unwrap()
      .then((payload) => {
        console.log("ok");
        setNewImage(null);
        setNewTxt("");
      })
      .catch((err) => {
        alert(err.status);
      });
  };

  console.log(categories);
  console.log(update_sub_file);

  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.title}>Новости</h1>

        {categories.map((item) => (
          <form className={styles.form} key={item.id}>
            <p className={styles.form__field}>
              <label
                htmlFor={`advantage_file_${item.id}`}
                className={styles.form__label}
              >
                {update_file ? (
                  <span>{update_file.name}</span>
                ) : (
                  <span>Файл</span>
                )}
              </label>
              <input
                className={styles.form__file}
                type="file"
                name="news_file"
                onChange={handleChangeUpdateFile}
                id={`advantage_file_${item.id}`}
              />
            </p>
            <div className={styles.img}>
              <img src={item.image} alt="" />
            </div>
            <p className={styles.form__field}>
              <label htmlFor={`category_title_${item.id}`}>Заголовок</label>
              <input
                className={styles.form__textarea}
                type="text"
                id={`category_title_${item.id}`}
                name="title"
                defaultValue={item.title}
                placeholder={item.title}
                onChange={(e) => setUpdate_title(e.target.value)}
              />
            </p>
            <p className={styles.form__field}>
              <label htmlFor={`category_desc_${item.id}`}>Описание</label>
              <textarea
                className={styles.form__textarea}
                type="text"
                id={`category_desc_${item.id}`}
                name="description"
                onChange={(e) => setUpdate_desc(e.target.value)}
              >
                {item.description}
              </textarea>
            </p>
            <p className={styles.form__field}>
              <label htmlFor={`parent_category_${item.id}`}>Категория</label>
              <textarea
                className={styles.form__textarea}
                type="text"
                id={`parent_category_${item.id}`}
                name="parent_category"
                onChange={(e) => setUpdate_parent(e.target.value)}
              >
                {item.parent_category}
              </textarea>
            </p>

            <div className={styles.sub_img}>
              {category_dvantages.map((image) => (
                <div className={styles.div_for_subnews} key={image.id}>
                  <label
                    htmlFor={`description${image.id}`}
                    className={styles.form__label}
                  >
                   description
                  </label>
                  <input
                    type="text"
                    id={`description${image.id}`}
                    defaultValue={image.text}
                    onChange={handleChangeUpdateSubFile}
                  />
                  <label
                    htmlFor={`sub_title_${image.id}`}
                    className={styles.form__label}
                  >
                   description
                  </label>
                  <textarea
                    type="text"
                    id={`sub_title_${image.id}`}
                    defaultValue={image.text}
                    onChange={handleChangeUpdateSubFile}
                  />
                  <Button onClick={(e) => deleteSubFile(e, image.id)}>
                    Удалить
                  </Button>
                </div>
              ))}
              <div className={styles.sub_file_add}>
                <label className={styles.form__label_add}>
                  {newSubFile ? (
                    <span>{newSubFile.name}</span>
                  ) : (
                    <span>Добавить файл</span>
                  )}
                  <input type="file" onChange={handleChangeAddSubFile} />
                </label>
                <Button onClick={(e) => addSubFile(e, item.id)}>
                  {boolean ? (
                    <span>Выкладывается ...</span>
                  ) : (
                    <span>Выложить</span>
                  )}
                </Button>
              </div>
            </div>

            <Button onClick={(e) => handleUpdateNews(e, item.id)}>
              Обновить
            </Button>
            <Button onClick={(e) => handleDeleteNews(e, item.id)}>
              Удалить
            </Button>
            <hr />
          </form>
        ))}
      </section>

      <section className={styles.section}>
        <h1 className={styles.title}>Добавить новость</h1>

        <form className={styles.form} onSubmit={(e) => handleAddData(e)}>
          <p className={styles.form__field}>
            <label htmlFor="main_info__title" className={styles.form__label}>
              {newImage ? (
                <span>Вы выбрали файл : {newImage.name}</span>
              ) : (
                <span>Файл</span>
              )}
            </label>
            <input
              className={styles.form__file}
              type="file"
              id="main_info__title"
              name="title"
              // value={newImage}
              onChange={handleFileChange}
            />
          </p>
          <p className={styles.form__field}>
            <label htmlFor="main_info__title">Заголовок</label>
            <input
              className={styles.form__textarea}
              type="text"
              id="main_info__title"
              name="subtitle"
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
            />
          </p>
          <p className={styles.form__field}>
            <label htmlFor="main_info__subtitle">Текст</label>
            <input
              className={styles.form__textarea}
              type="text"
              id="main_info__subtitle"
              name="subtitle"
              onChange={(e) => setNewTxt(e.target.value)}
              value={newTxt}
            />
          </p>

          <Button
            type="submit"
            onSubmit={(e) => handleAddData(e)}
            disabled={!newImage || isLoading}
          >
            {isLoading ? "Выкладывается..." : "Выложить"}
          </Button>
        </form>
      </section>
    </>
  );
};

export default Categories;
