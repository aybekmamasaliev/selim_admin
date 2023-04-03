import { useState } from "react";
import {
  useGetNewsQuery,
  usePutNewsMutation,
  useAddNewsMutation,
  useDelNewsMutation

} from "../../store/apis/appSelim";
import Button from "../Button/Button";
import styles from "./News.module.scss";

const News = () => {
  const [updateNews] = usePutNewsMutation();
  const [addNews, {isLoading}]=useAddNewsMutation();
  const {data:news={}}=useGetNewsQuery(1000)
  const [deleteNews]=useDelNewsMutation()

  const [newImage, setNewImage] = useState(null);
  const [newTxt, setNewTxt] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const [update_txt, setUpdata_txt] = useState("");
  const [update_file, setUpdate_file] = useState("");
  const [update_title, setUpdate_title] = useState("");

  const handleDeleteAdvantages = (e, id) => {
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

  const handleUpdateAdvantege = (e, id) => {
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
        setUpdate_title("")
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

  console.log(news)

  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.title}>Преимущества</h1>

        {news.results?.map((item) => (
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
                name="advantage__file"
                // value={update_file}
                onChange={handleChangeUpdateFile}
                id={`advantage_file_${item.id}`}
              />
            </p>
            <div>
              <img src={item.image} alt="" />
            </div>

            <p className={styles.form__field}>
              <label htmlFor={`advantage__title_${item.id}`}>Заголовок</label>
              <input
                className={styles.form__textarea}
                type="text"
                id={`advantage__title_${item.id}`}
                name="advantage_title"
                defaultValue={item.title}
                placeholder={item.title}
                // value={update_txt}
                onChange={(e) => setUpdate_title(e.target.value)}
              />
            </p>

            <p className={styles.form__field}>
              <label htmlFor={`advantage__text_${item.id}`}>Текст</label>
              <input
                className={styles.form__textarea}
                type="text"
                id={`advantage__text_${item.id}`}
                name="advantage_text"
                defaultValue={item.text}
                placeholder={item.text}
                // value={update_txt}
                onChange={(e) => setUpdata_txt(e.target.value)}
              />
            </p>

            <Button onClick={(e) => handleUpdateAdvantege(e, item.id)}>
              Обновить
            </Button>
            <Button onClick={(e) => handleDeleteAdvantages(e, item.id)}>
              Удалить
            </Button>
            <hr />
          </form>
        ))}
      </section>

      <section className={styles.section}>
        <h1 className={styles.title}>Добавить преимущества</h1>

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

export default News;
