import { useState } from "react";
import {
  useAddServicesMutation,
  useGetServicesQuery,
  usePutServicesMutation,
  useDelServicesMutation
} from "../../store/apis/appSelim";
import Button from "../Button/Button";
import styles from "./Services.module.scss";

const Services = () => {
  const [addServices, { isLoading }] = useAddServicesMutation();
  const [deleteServices] = useDelServicesMutation();
  const [updateServices] = usePutServicesMutation();
  const { data: services = [] } = useGetServicesQuery();

  const [newImage, setNewImage] = useState(null);
  const [newTxt, setNewTxt] = useState("");

  const [update_txt, setUpdata_txt] = useState("");
  const [update_file, setUpdate_file] = useState("");

  const handleDeleteAdvantages = (e, id) => {
    e.preventDefault();
    deleteServices(id)
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
    if (update_file) {
      formdata.append("image", update_file);
    }
    const variable = { id, formdata };
    updateServices(variable)
      .unwrap()
      .then((payload) => {
        setUpdata_txt("");
        setUpdate_file(null);
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

    addServices(formdata)
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

  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.title}>Сервисы</h1>

        {services.map((item) => (
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
                name="service__file"
                onChange={handleChangeUpdateFile}
                id={`advantage_file_${item.id}`}
              />
            </p>
            <div className={styles.img}>
              <img src={item.image} alt="" />
            </div>
            <p className={styles.form__field}>
              <label htmlFor={`advantage__text_${item.id}`}>Текст</label>
              <input
                className={styles.form__textarea}
                type="text"
                id={`advantage__text_${item.id}`}
                name="service_text"
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
            <hr />
          </form>
        ))}
      </section>

      <section className={styles.section}>
        <h1 className={styles.title}>Добавить Сервисы</h1>

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
              name="file"
              onChange={handleFileChange}
            />
          </p>
          <p className={styles.form__field}>
            <label htmlFor="main_info__subtitle">Текст</label>
            <input
              className={styles.form__textarea}
              type="text"
              id="main_info__subtitle"
              name="text"
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

export default Services;
