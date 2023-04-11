import { useState } from "react";
import {
  useAddCategoryMutation,
  useDelCategoryMutation,
  useGetCategoriesQuery,
  usePutCategoriesMutation,
} from "../../store/apis/appSelim";
import Button from "../Button/Button";
import CategoryAdvantages from "../CategoryAdvantages/CategoryAdvantages";
import styles from "./Categories.module.scss";

const Categories = () => {
  const { data: categories = [] } = useGetCategoriesQuery();
  const [updateCategory] = usePutCategoriesMutation();
  const [deleteCategory] = useDelCategoryMutation();
  const [postCategory] = useAddCategoryMutation();

  const [newImage, setNewImage] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDecs] = useState("");
  const [isLoading, setIsloading]=useState(false);

  const [update_file, setUpdate_file] = useState(null);
  const [update_title, setUpdate_title] = useState("");
  const [update_desc, setUpdate_desc] = useState("");


  const handleChangeUpdateFile = (e) => {
    e.preventDefault();
    setUpdate_file(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleUpdateCategories = (e, id) => {
    e.preventDefault();
    const formdata = new FormData();
    if (update_desc) {
      formdata.append("description", update_desc);
    }
    if (update_title) {
      formdata.append("title", update_title);
    }
    if (update_file) {
      formdata.append("image", update_file);
    }
    const variable = { id, formdata };
    updateCategory(variable)
      .unwrap()
      .then((payload) => {
        setUpdate_desc("");
        setUpdate_file(null);
        setUpdate_title("");
        alert("ok");
      })
      .catch((err) => {
        alert(err.status);
      });
  };



  const handleAddData = (e) => {
    e.preventDefault();
    setIsloading(true);
    const formdata = new FormData();
    if (newImage) {
      formdata.append("image", newImage);
    }
    if (newDesc) {
      formdata.append("description", newDesc);
    }
    if (newTitle) {
      formdata.append("title", newTitle);
    }

    postCategory(formdata)
      .unwrap()
      .then((payload) => {
        alert("ok");
        setNewTitle("")
        setNewDecs("");
        setIsloading(false)
        setNewImage(null)
      })
      .catch((err) => {
        alert(err.status);
        setIsloading(false);
        setNewTitle("")
        setNewDecs("");
        setNewImage(null)
      });
  };

  const handleDeleteNews = (e, id) => {
    e.preventDefault();
    deleteCategory(id)
      .unwrap()
      .then((payload) => {
        alert("ok");
        setNewDecs("");
        setNewTitle("")
      })
      .catch((err) => {
        alert(err.status);
        setNewDecs("");
        setNewTitle("")
      });
  };


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
                defaultValue={item.description}
                type="text"
                id={`category_desc_${item.id}`}
                name="description"
                onChange={(e) => setUpdate_desc(e.target.value)}
              />
            </p>
            <div className={styles.sub_img}>
              <div>
                <CategoryAdvantages id={item.id} />
              </div>
              {/* <div className={styles.sub_file_add}>
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
              </div> */}
            </div>
            <Button onClick={(e) => handleUpdateCategories(e, item.id)}>
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
        <h1 className={styles.title}>Добавить категорию</h1>

        <form className={styles.form}>
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
              onChange={(e) => setNewDecs(e.target.value)}
              value={newDesc}
            />
          </p>

          <Button
            type="submit"
            onClick={(e) => handleAddData(e)}
          >{
            isLoading? <span>Выкладывается ...</span>:<span>Выложить</span>
          }
          </Button>
        </form>
      </section>
    </>
  );
};

export default Categories;
