import { useEffect, useState } from "react";
import {
  useFetchMainInfoQuery,
  usePutAboutUsMutation,
  usePutMainInfoMutation,
} from "../../store/apis/mainInfoApi";
import AboutUs from "../AboutUs/AboutUs";
import Button from "../Button/Button";
import Phones from "../Phones/Phones";
import Map from "../Map/Map";
import SocialMedia from "../SocialMedia/SocialMedia";
import styles from "./MainInfo.module.scss";

function MainInfoTwo() {

  const [updateMainInfoTitle, setUpdateMainInfoTitle] = useState("");
  const [updateMainInfoText, setUpdateMainInfoText] = useState("");

  const [putMainInfo] = usePutMainInfoMutation();

  const { data: mainInfo, isLoading } = useFetchMainInfoQuery();

  const handlePutMainInfo = (e, id) => {
    e.preventDefault();
    const formdata = new FormData();

    if (updateMainInfoTitle) {
      formdata.append("title", updateMainInfoTitle);
    }
    if (updateMainInfoText) {
      formdata.append("subtitle", updateMainInfoText);
    }

    const variable = { id, formdata };

    putMainInfo(variable)
      .unwrap()
      .then((payload) => {
        alert("ok");
        setUpdateMainInfoText("");
        setUpdateMainInfoTitle("");
      })
      .catch((err) => alert(err.status));
  };



  let filteredMainInfo;

  if (isLoading) {
    console.log("no");
  } else {
    console.log(mainInfo[0]);
    filteredMainInfo = mainInfo[0];
  }

  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.title}>Главная страница</h1>
        {isLoading ? (
          <p>loading ...</p>
        ) : (
          <div>
            <form className={styles.form}>
              <p className={styles.form__field}>
                <label
                  htmlFor="main_info__title"
                  className={styles.form__label}
                >
                  Заголовок
                </label>
                <textarea
                  className={styles.form__textarea}
                  type="text"
                  id="main_info__title"
                  name="title"
                  defaultValue={filteredMainInfo.title}
                  onChange={(e) => setUpdateMainInfoTitle(e.target.value)}
                />
              </p>
              <p>{updateMainInfoTitle}</p>
              <p>{updateMainInfoText}</p>
              <p className={styles.form__field}>
                <label htmlFor="main_info__subtitle">Подзаголовок</label>
                <textarea
                  className={styles.form__textarea}
                  type="text"
                  id="main_info__subtitle"
                  name="subtitle"
                  defaultValue={filteredMainInfo.subtitle}
                  onChange={(e) => setUpdateMainInfoText(e.target.value)}
                />
              </p>
              <Button
                onClick={(e) => {
                  handlePutMainInfo(e, filteredMainInfo.id);
                }}
              >
                Сохранить
              </Button>
            </form>
          </div>
        )}
      </section>
      <AboutUs/>
      <SocialMedia/>
      <Phones/>
      <Map/>
     

      {/* 

       <section className={styles.section}>
        <form className={styles.form}>
          <h2>О нас</h2>
          <p className={styles.form__field}>
            <label className={styles.form__label} htmlFor="aboutus__title">
              Заголовок
            </label>
            <textarea
              className={styles.form__textarea}
              id="aboutus__title"
              defaultValue={filteredAboutUs.title}
              onChange={(e) => setUpdateAboutUsTitle(e.target.value)}
            />
          </p>

          <p className={styles.form__field}>
            <label className={styles.form__label} htmlFor="aboutus__title">
              Текст
            </label>
            <textarea
              className={styles.form__textarea}
              id="aboutus__title"
              defaultValue={filteredAboutUs.text}
              onChange={(e) => setUpdateAboutUsText(e.target.value)}
            />
          </p>
          <Button onClick={(e) => handleUpdateAboutUs(e, filteredAboutUs.id)}>
            Сохранить
          </Button>
        </form>
      </section>


      <section className={styles.section}>
        <form className={styles.form}>
          <h2>Телефоны</h2>
          {phoneNumbersData?.map(({ id, number }) => (
            <p key={id} className={styles.form__field}>
              <label className={styles.form__label} htmlFor={`phone-${id}`}>
                Номер {id}
              </label>
              <input
                type="text"
                id={`phone-${id}`}
                className={styles.form__input}
                value={
                  phoneNumbersData?.filter(
                    (phoneNumber) => phoneNumber.id === id
                  )[0].number
                }
                onChange={(e) => {
                  const nextPhoneNumbersdata = phoneNumbersData.map(
                    (phoneNumber) => {
                      if (phoneNumber.id === id) {
                        return { ...phoneNumber, number: e.target.value };
                      }
                      return phoneNumber;
                    }
                  );
                  setPhoneNumbersData(nextPhoneNumbersdata);
                }}
              />
            </p>
          ))}

          <Button>Сохранить</Button>
        </form>
      </section>

      <section className={styles.section}>
        <form className={styles.form}>
          <h2>Карта</h2>
          {phoneNumbersData?.map(({ id, number }) => (
            <p key={id} className={styles.form__field}>
              <label className={styles.form__label} htmlFor={`phone-${id}`}>
                Номер {id}
              </label>
              <input
                type="text"
                id={`phone-${id}`}
                className={styles.form__input}
                value={
                  phoneNumbersData?.filter(
                    (phoneNumber) => phoneNumber.id === id
                  )[0].number
                }
                onChange={(e) => {
                  const nextPhoneNumbersdata = phoneNumbersData.map(
                    (phoneNumber) => {
                      if (phoneNumber.id === id) {
                        return { ...phoneNumber, number: e.target.value };
                      }
                      return phoneNumber;
                    }
                  );
                  setPhoneNumbersData(nextPhoneNumbersdata);
                }}
              />
            </p>
          ))}

          <Button>Сохранить</Button>
        </form>
      </section>

      <section className={styles.section}>
        <form className={styles.form}>
          <h2>Социальные сети</h2>
          <p className={styles.form__field}>
            <label className={styles.form__label} htmlFor="instagram">
              Инстаграм
            </label>
            <input
              className={styles.form__input}
              id="instagram"
              value={socialMediaData.instagram}
              onChange={(e) => {
                const nextSocialMediaData = { ...socialMedia };
                nextSocialMediaData.instagram = e.target.value;
                setSocialMediaData(nextSocialMediaData);
              }}
            />
          </p>
          <p className={styles.field}>
            <label htmlFor="whatsapp">Вотсапп</label>
            <input
              className={styles.form__input}
              id="whatsapp"
              value={socialMediaData.whatsapp}
              onChange={(e) => {
                const nextSocialMediaData = { ...socialMedia };
                nextSocialMediaData.whatsapp = e.target.value;
                setSocialMediaData(nextSocialMediaData);
              }}
            />
          </p>

          <Button>Сохранить</Button>
        </form>
      </section> */}
    </>
  );
}

export default MainInfoTwo;
