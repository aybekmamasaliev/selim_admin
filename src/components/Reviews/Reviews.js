import { useState } from "react";
import {
  useGetReviewsQuery,
  useAddReviewsMutation,
  usePutReviewsMutation,
  useDelReviewsMutation,
} from "../../store/apis/appSelim";
import Button from "../Button/Button";
import styles from "./Reviews.module.scss";

const Reviews = () => {
  const { data: reviews = [] } = useGetReviewsQuery();
  const [addReviews, { isLoading }] = useAddReviewsMutation();
  const [updateRews] = usePutReviewsMutation();
  const [deleteRews] = useDelReviewsMutation();

  const [newImage, setNewImage] = useState(null);
  const [newTxt, setNewTxt] = useState("");
  const [newName, setNewName] = useState("");
  const [newSurename, setNewsurename] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const [update_txt, setUpdata_txt] = useState("");
  const [update_file, setUpdate_file] = useState("");
  const [update_name, setUpdate_name] = useState("");
  const [update_surename, setUpdate_surename] = useState("");
  const [update_category, setUpdate_category] = useState("");

  const handleDeleteAdvantages = (e, id) => {
    e.preventDefault();
    deleteRews(id)
      .unwrap()
      .then((payload) => {
        alert("ok");
      })
      .catch((err) => {
        alert(err.status);
      });
  };

  const handleUpdateAdvantege = (e, id) => {
    e.preventDefault();
    const formdata = new FormData();
    if (update_txt) {
      formdata.append("text", update_txt);
    }
    if (update_surename) {
      formdata.append("last_name", update_surename);
    }
    if (update_name) {
      formdata.append("first_name", update_name);
    }
    if (update_file) {
      formdata.append("image", update_file);
    }
    if (update_category) {
      formdata.append("category_name", update_category);
    }
    const variable = { id, formdata };
    updateRews(variable)
      .unwrap()
      .then((payload) => {
        setUpdata_txt("");
        setUpdate_file(null);
        setUpdate_name("");
        setUpdate_surename("");
        setUpdate_category("");
      })
      .catch((err) => {
        alert(err.status);
      });
  };

  const handleChangeUpdateFile = (e) => {
    e.preventDefault();
    setUpdate_file(e.target.files[0]);
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
    if (newName) {
      formdata.append("title", newName);
    }
    if (newSurename) {
      formdata.append("title", newSurename);
    }

    addReviews(formdata)
      .unwrap()
      .then((payload) => {
        console.log("ok");
        setNewImage(null);
        setNewTxt("");
        setNewName("");
        setNewsurename("");
        setNewCategory("");
      })
      .catch((err) => {
        alert(err.status);
      });
  };

  console.log(reviews);

  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.title}>Отзывы</h1>

        {reviews.map((item) => (
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
                name="file"
                onChange={handleChangeUpdateFile}
                id={`advantage_file_${item.id}`}
              />
            </p>
            <div className={styles.img}>
              <img src={item.image} alt="" />
            </div>

            <p className={styles.form__field}>
              <label htmlFor={`advantage__title_${item.id}`}>Имя</label>
              <input
                className={styles.form__textarea}
                type="text"
                id={`advantage__title_${item.id}`}
                name="first_name"
                defaultValue={item.first_name}
                placeholder={item.title}
                // value={update_txt}
                onChange={(e) => setUpdate_name(e.target.value)}
              />
            </p>
            <p className={styles.form__field}>
              <label htmlFor={`advantage__title_${item.id}`}>Фамилия</label>
              <input
                className={styles.form__textarea}
                type="text"
                id={`advantage__title_${item.id}`}
                name="second_name"
                defaultValue={item.last_name}
                placeholder={item.title}
                // value={update_txt}
                onChange={(e) => setUpdate_surename(e.target.value)}
              />
            </p>
            <p className={styles.form__field}>
              <label htmlFor={`advantage__title_${item.id}`}>Тип ворот</label>
              <input
                className={styles.form__textarea}
                type="text"
                id={`advantage__title_${item.id}`}
                name="category"
                defaultValue={item.category_name}
                placeholder={item.title}
                // value={update_txt}
                onChange={(e) => setUpdate_category(e.target.value)}
              />
            </p>

            <p className={styles.form__field}>
              <label htmlFor={`advantage__text_${item.id}`}>Отзыв</label>
              <input
                className={styles.form__textarea}
                type="text"
                id={`advantage__text_${item.id}`}
                name="review"
                defaultValue={item.text}
                placeholder={item.text}
                onChange={(e) => setUpdata_txt(e.target.value)}
              />
            </p>

            <Button onClick={(e) => handleUpdateAdvantege(e, item.id)}>
              Обновить
            </Button>
            <Button onClick={(e) => handleDeleteAdvantages(e, item.id)}>
              Удалить
            </Button>
          </form>
        ))}
      </section>

      <section className={styles.section}>
        <h1 className={styles.title}>Добавить отзыв</h1>

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
            <label htmlFor="main_info__title">Имя</label>
            <input
              className={styles.form__textarea}
              type="text"
              id="main_info__title"
              name="first_name"
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
            />
          </p>
          <p className={styles.form__field}>
            <label htmlFor="main_info__subtitle">Фамилия</label>
            <input
              className={styles.form__textarea}
              type="text"
              id="main_info__subtitle"
              name="second_name"
              onChange={(e) => setNewsurename(e.target.value)}
              value={newSurename}
            />
          </p>
          <p className={styles.form__field}>
            <label htmlFor="main_info__title">Тип ворот</label>
            <input
              className={styles.form__textarea}
              type="text"
              id="main_info__title"
              name="category"
              onChange={(e) => setNewCategory(e.target.value)}
              value={newCategory}
            />
          </p>
          <p className={styles.form__field}>
            <label htmlFor="main_info__subtitle">Отзыв</label>
            <input
              className={styles.form__textarea}
              type="text"
              id="main_info__subtitle"
              name="review"
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

export default Reviews;
