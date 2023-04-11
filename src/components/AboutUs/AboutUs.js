import React, { useState } from "react";
import {
  useFetchAboutUsQuery,
  usePutAboutUsMutation,
} from "../../store/apis/mainInfoApi";

import styles from "./AboutUs.module.scss";
import Button from "../Button/Button";

const AboutUs = () => {
  const [updateAboutUsTitle, setUpdateAboutUsTitle] = useState("");

  const [updateAboutUsText, setUpdateAboutUsText] = useState("");

  const { data: aboutUs = [], isLoading } = useFetchAboutUsQuery();

  const [putAboutUs] = usePutAboutUsMutation();

  const handleUpdateAboutUs = (e, id) => {
    e.preventDefault();
    const formdata = new FormData();
    if (updateAboutUsTitle) {
      formdata.append("title", updateAboutUsTitle);
    }
    if (updateAboutUsText) {
      formdata.append("text", updateAboutUsText);
    }

    const variable = { id, formdata };

    putAboutUs(variable)
      .unwrap()
      .then((payload) => {
        alert("ok");
        setUpdateAboutUsText("");
        setUpdateAboutUsTitle("");
      })
      .catch((err) => alert(err.status));
  };

  let filteredAboutUs ;

    if (isLoading) {
      console.log("loading");
    } else {
      filteredAboutUs = aboutUs[0];
    }

  return (
    <section className={styles.section}>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <form className={styles.form}>
            <h2>О нас</h2>
            <p className={styles.form__field}>
              <label className={styles.form__label} htmlFor={`aboutus__title_${filteredAboutUs.title}`}>
                Заголовок
              </label>
              <textarea
                className={styles.form__textarea}
                id={`aboutus__title_${filteredAboutUs.title}`}
                defaultValue={filteredAboutUs.title}
                onChange={(e) => setUpdateAboutUsTitle(e.target.value)}
              />
            </p>

            <p className={styles.form__field}>
              <label className={styles.form__label} htmlFor={`aboutus__title_${filteredAboutUs.text}`}>
                Текст
              </label>
              <textarea
                className={styles.form__textarea}
                id={`aboutus__title_${filteredAboutUs.text}`}
                defaultValue={filteredAboutUs.text}
                onChange={(e) => setUpdateAboutUsText(e.target.value)}
              />
            </p>
            <Button onClick={(e) => handleUpdateAboutUs(e, filteredAboutUs.id)}>
              Сохранить
            </Button>
          </form>
        </div>
      )}
    </section>
  );
};

export default AboutUs;
