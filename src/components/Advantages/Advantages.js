import { useState } from "react";
import {
  useAddAdvantagesMutation,
  useDelAdvantagesMutation,
  useGetAdvantagetQuery,
  usePutAdvantagesMutation,
} from "../../store/apis/appSelim";
import Button from "../Button/Button";
import styles from "./Advantages.module.scss";

const Advantages = () => {
  const { data: advantages = [] } = useGetAdvantagetQuery();
  const [deleteAdvantages] = useDelAdvantagesMutation();
  const [updateAdvantage] = usePutAdvantagesMutation();
  const [addAdvantages, { isLoading }] = useAddAdvantagesMutation();
  const [newImage, setNewImage] = useState(null);
  const [newTxt, setNewTxt] = useState("");

  const [update_txt, setUpdata_txt]=useState("");
  const [update_file, setUpdate_file]=useState(undefined);

  const handleDeleteAdvantages = (e, id) => {
    e.preventDefault();
    deleteAdvantages(id)
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
    if (update_file) {
      formdata.append("image", newImage);
    }
    if (update_txt) {
      formdata.append("text", newTxt);
    }
    updateAdvantage({id, formdata})
      .unwrap()
      .then((payload) => {
        console.log("ok");
        console.log(formdata);
      })
      .catch((err) => {
        alert(err.status);
        console.log(formdata);
      });
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
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

    addAdvantages(formdata)
      .unwrap()
      .then((payload) => {
        console.log("ok");
      })
      .catch((err) => {
        alert(err.status);
      });
  };

  console.log(advantages);

  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.title}>Преимущества</h1>

        {advantages.map((item) => (
          <form className={styles.form} key={item.id}>
            <p className={styles.form__field}>
              <label
                htmlFor={`advantage_file_${item.id}`}
                className={styles.form__label}
              >
                Файл
              </label>
              <input
                className={styles.form__file}
                type="file"
                name="advantage__file"
                value={update_file}
                onChange={(e)=>setUpdate_file(e.target.files[0])}
                id={`advantage_file_${item.id}`}
              />
            </p>
            <div>
              <img src={item.image} alt="" />
            </div>
            <p className={styles.form__field}>
              <label htmlFor={`advantage__text_${item.id}`}>Текст</label>
              <input
                className={styles.form__textarea}
                type="text"
                id={`advantage__text_${item.id}`}
                name="advantage_text"
                // defaultValue={item.text}
                placeholder={item.text}
                value={update_txt}
                onChange={(e)=>setUpdata_txt(e.target.value)}
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
              Файл
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
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </section>
    </>
  );
};

export default Advantages;
