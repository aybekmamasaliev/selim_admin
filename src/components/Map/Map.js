import React, { useState } from "react";
import {
  useFetchMapQuery,
  usePutMapMutation,
} from "../../store/apis/mainInfoApi";

import styles from "./Map.module.scss";
import Button from "../Button/Button";

const Map = () => {
    
  const [updateLink, setUpdateLink] = useState("");
  const [updateLatitude, setUpdateLatitude] = useState("");
  const [updateLongitude, setUpdateLongitude] = useState("");


  const { data: mapInfo = [], isLoading } = useFetchMapQuery();
  const [updateMap]=usePutMapMutation();

  
  const handleUpdateMap = (e, id) => {
    e.preventDefault();
    const formdata = new FormData();
    if (updateLink) {
      formdata.append("station_name", updateLink);
    }
    if (updateLatitude) {
      formdata.append("latitude", updateLatitude);
    }
    if (updateLongitude) {
      formdata.append("longitude", updateLongitude);
    }

    const variable = { id, formdata };

    updateMap(variable)
      .unwrap()
      .then((payload) => {
        alert("ok");
        setUpdateLink("");
        setUpdateLatitude("");
        setUpdateLongitude("");
      })
      .catch((err) => alert(err.status));
  };

  let filteredMap ;

    if (isLoading) {
      console.log("loading");
    } else {
      filteredMap = mapInfo[0];
    }

  return (
    <section className={styles.section}>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <form className={styles.form}>
            <h2>Карта</h2>
            <p className={styles.form__field}>
              <label className={styles.form__label} htmlFor={`map_${filteredMap.station_name}`}>
                Ссылка на локацию
              </label>
              <textarea
                className={styles.form__textarea}
                id={`map_${filteredMap.station_name}`}
                defaultValue={filteredMap.station_name}
                onChange={(e) => setUpdateLink(e.target.value)}
              />
            </p>

            <p className={styles.form__field}>
              <label className={styles.form__label} htmlFor={`map_${filteredMap.latitude}`}>
                Долгота
              </label>
              <textarea
                className={styles.form__textarea}
                id={`map_${filteredMap.latitude}`}
                defaultValue={filteredMap.latitude}
                onChange={(e) => setUpdateLatitude(e.target.value)}
              />
            </p>

            <p className={styles.form__field}>
              <label className={styles.form__label} htmlFor={`map_${filteredMap.longitude}`}>
                Широта
              </label>
              <textarea
                className={styles.form__textarea}
                id={`map_${filteredMap.longitude}`}
                defaultValue={filteredMap.longitude}
                onChange={(e) => setUpdateLongitude(e.target.value)}
              />
            </p>
            <Button onClick={(e) => handleUpdateMap(e, filteredMap.id)}>
              Сохранить
            </Button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Map;
