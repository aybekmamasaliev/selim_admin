import React, { useState } from "react";
import {
  useFetchPhoneNumberQuery,
  usePutPhoneNumberMutation,
} from "../../store/apis/mainInfoApi";

import styles from "./Phones.module.scss";
import Button from "../Button/Button";

const Phones = () => {
  const [updateNumber, setUpdateNumber] = useState("");

  const { data: number = [], isLoading } = useFetchPhoneNumberQuery();

  const [putPhoneNumber] = usePutPhoneNumberMutation();

  const handleUpdateNumber = (e, id) => {
    e.preventDefault();
    const formdata = new FormData();
    if (updateNumber) {
      formdata.append("number", updateNumber);
    }

    const variable = { id, formdata };

    putPhoneNumber(variable)
      .unwrap()
      .then((payload) => {
        alert("ok");
        setUpdateNumber("");
      })
      .catch((err) => alert(err.status));
  };


  return (
    <section className={styles.section}>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <form className={styles.form}>
            <h2>Телефоны</h2>
            <p>{updateNumber}</p>
            {number.map((item) => (
              <div key={item.id}>
                <p className={styles.form__field}>
                  <label
                    className={styles.form__label}
                    htmlFor={`number_${item.number}`}
                  >
                    Номер
                  </label>
                  <textarea
                    className={styles.form__textarea}
                    id={`number_${item.number}`}
                    defaultValue={item.number}
                    onChange={(e) => setUpdateNumber(e.target.value)}
                  />
                </p>
                <Button
                  onClick={(e) => handleUpdateNumber(e, item.id)}
                >
                  Сохранить
                </Button>
              </div>
            ))}
          </form>
        </div>
      )}
    </section>
  );
};

export default Phones;
