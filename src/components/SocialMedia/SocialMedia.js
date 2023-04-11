import React, { useState } from "react";
import {
  useFetchAboutUsQuery,
  useFetchSocialMediaQuery,
  usePutAboutUsMutation,
  usePutSocialMediaMutation,
} from "../../store/apis/mainInfoApi";

import styles from "./SocialMedia.module.scss";
import Button from "../Button/Button";

const SocialMedia = () => {
  const [updateInsta, setUpdateInsta] = useState("");

  const [updateWhatsapp, setUpdateWhatsapp] = useState("");

  const { data: socialMedia = [], isLoading } = useFetchSocialMediaQuery();

  const [putSocialMedia] = usePutSocialMediaMutation();

  const handleUpdateSocialMedia = (e, id) => {
    e.preventDefault();
    const formdata = new FormData();
    if (updateInsta) {
      formdata.append("instagram", updateInsta);
    }
    if (updateWhatsapp) {
      formdata.append("whatsapp", updateWhatsapp);
    }

    const variable = { id, formdata };

    putSocialMedia(variable)
      .unwrap()
      .then((payload) => {
        alert("ok");
        setUpdateInsta("");
        setUpdateWhatsapp("");
      })
      .catch((err) => alert(err.status));
  };

  let filteredSocial;

  if (isLoading) {
    console.log("loading");
  } else {
    filteredSocial = socialMedia[0];
  }

  return (
    <section className={styles.section}>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <form className={styles.form}>
            <h2>Социальные сети</h2>
            <p className={styles.form__field}>
              <label
                className={styles.form__label}
                htmlFor={`social_${filteredSocial.instagram}`}
              >
                Инстаграм
              </label>
              <textarea
                className={styles.form__textarea}
                id={`social_${filteredSocial.instagram}`}
                defaultValue={filteredSocial.instagram}
                onChange={(e) => setUpdateInsta(e.target.value)}
              />
            </p>

            <p className={styles.form__field}>
              <label className={styles.form__label} htmlFor={`social_${filteredSocial.whatsapp}`}>
                Вотсапп
              </label>
              <textarea
                className={styles.form__textarea}
                id={`social_${filteredSocial.whatsapp}`}
                defaultValue={filteredSocial.whatsapp}
                onChange={(e) => setUpdateWhatsapp(e.target.value)}
              />
            </p>
            <Button
              onClick={(e) => handleUpdateSocialMedia(e, filteredSocial.id)}
            >
              Сохранить
            </Button>
          </form>
        </div>
      )}
    </section>
  );
};

export default SocialMedia;
