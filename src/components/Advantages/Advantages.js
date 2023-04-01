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

  const handleDeleteAdvantages = async (id) => {
    await (id).unwrap();
  };

  const handleUpdateAdvantege = async (id) => {
    await updateAdvantage(id).unwrap();
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };


  const handleAddData =(e) => {
    e.preventDefault();
    const formdata = new FormData();
    if(newImage){
      formdata.append("image", newImage);
    }
    formdata.append("text", newTxt);

      addAdvantages(formdata)
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
                defaultValue={item.text}
              />
            </p>
            <Button onClick={() => handleUpdateAdvantege(item.id)}>
              Обновить
            </Button>
            <Button onClick={() => handleDeleteAdvantages(item.id)}>
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
              onChange={(e) => handleFileChange(e)}
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
          {/* <Button type="submit" disabled={!newImage || isLoading}>
            {" "}
            {isLoading ? "Uploading..." : "Upload"}
          </Button> */}
          <button type="submit" disabled={!newImage|| isLoading} >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </section>
    </>
  );
};

export default Advantages;
