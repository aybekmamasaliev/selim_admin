import { useEffect, useState } from 'react';
import {
  useFetchAboutUsQuery,
  useFetchMainInfoQuery,
  useFetchPhoneNumberQuery,
  useFetchSocialMediaQuery,
  useUpdateAboutUsMutation,
  useUpdateMainInfoMutation,
} from '../../store/apis/mainInfoApi';
import Button from '../Button/Button';
import styles from './MainInfo.module.scss';

function MainInfo() {
  const [mainInfoData, setMainInfoData] = useState({ title: '', subtitle: '' });
  const [aboutUsData, setAboutUsData] = useState({ title: '', text: '' });
  const [phoneNumbersData, setPhoneNumbersData] = useState([]);
  const [socialMediaData, setSocialMediaData] = useState({
    instagram: '',
    whatsapp: '',
  });

  const { data: mainInfo } = useFetchMainInfoQuery();
  const { data: aboutUs } = useFetchAboutUsQuery();
  const { data: phoneNumbers } = useFetchPhoneNumberQuery();
  const { data: socialMedia } = useFetchSocialMediaQuery();

  useEffect(() => {
    setMainInfoData(mainInfo?.at(-1));
  }, [mainInfo]);

  useEffect(() => {
    setAboutUsData(aboutUs?.at(-1));
  }, [aboutUs]);

  useEffect(() => {
    if (!phoneNumbers) return;
    setPhoneNumbersData([...phoneNumbers]);
  }, [phoneNumbers]);

  useEffect(() => {
    if (!socialMedia) return;
    setSocialMediaData(socialMedia.at(-1));
  }, [socialMedia]);

  const [updateMainInfo] = useUpdateMainInfoMutation();
  const [updateAboutUs] = useUpdateAboutUsMutation();

  const handleMainInfoChange = (e) => {
    e.preventDefault();
    updateMainInfo(mainInfoData);
  };

  const handleAboutUsChange = (e) => {
    e.preventDefault();
    updateAboutUs(aboutUsData);
  };

  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.title}>Главная страница</h1>

        <form className={styles.form} onSubmit={handleMainInfoChange}>
          <p className={styles.form__field}>
            <label htmlFor="main_info__title" className={styles.form__label}>
              Заголовок
            </label>
            <textarea
              className={styles.form__textarea}
              type="text"
              id="main_info__title"
              name="title"
              value={mainInfoData?.title}
              onChange={(e) => {
                const nextInfoData = { ...mainInfoData, title: e.target.value };
                setMainInfoData(nextInfoData);
              }}
            />
          </p>
          <p className={styles.form__field}>
            <label htmlFor="main_info__subtitle">Подзаголовок</label>
            <textarea
              className={styles.form__textarea}
              type="text"
              id="main_info__subtitle"
              name="subtitle"
              value={mainInfoData?.subtitle}
              onChange={(e) => {
                const nextInfoData = {
                  ...mainInfoData,
                  subtitle: e.target.value,
                };
                setMainInfoData(nextInfoData);
              }}
            />
          </p>
          <Button>Сохранить</Button>
        </form>
      </section>

      <section className={styles.section}>
        <form className={styles.form} onSubmit={handleAboutUsChange}>
          <h2>О нас</h2>
          <p className={styles.form__field}>
            <label className={styles.form__label} htmlFor="aboutus__title">
              Заголовок
            </label>
            <textarea
              className={styles.form__textarea}
              id="aboutus__title"
              value={aboutUsData?.title}
              onChange={(e) => {
                const nextAboutUsData = {
                  ...aboutUsData,
                  title: e.target.value,
                };
                setAboutUsData(nextAboutUsData);
              }}
            />
          </p>

          <p className={styles.form__field}>
            <label className={styles.form__label} htmlFor="aboutus__title">
              Текст
            </label>
            <textarea
              className={styles.form__textarea}
              id="aboutus__title"
              value={aboutUsData?.text}
              onChange={(e) => {
                const nextAboutUsData = {
                  ...aboutUsData,
                  text: e.target.value,
                };
                setAboutUsData(nextAboutUsData);
              }}
            />
          </p>
          <Button>Сохранить</Button>
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
      </section>
    </>
  );
}

export default MainInfo;
