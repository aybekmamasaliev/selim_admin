import { useState } from "react";
import {
  useAddAdvantagesMutation,
  useDelAdvantagesMutation,
  useDelFeedBackMutation,
  useGetAdvantagetQuery,
  useGetFeedBackQuery,
  usePutAdvantagesMutation,
} from "../../store/apis/appSelim";
import Button from "../Button/Button";
import styles from "./Feedback.module.scss";

const Feedback = () => {
  const [newTxt, setNewTxt] = useState("");

  const { data: feedback = [] } = useGetFeedBackQuery();
  const [deleteFeedback] = useDelFeedBackMutation();

  const handleDeleteAdvantages = (e, id) => {
    e.preventDefault();
    deleteFeedback(id)
      .unwrap()
      .then((payload) => {
        alert("ok");
      })
      .catch((err) => {
        alert(err.status);
      });
  };

  console.log(feedback)


  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.title}> Обратная связь </h1>

        {feedback.map((item) => (
          <form className={styles.form} key={item.id}>
            <p className={styles.form__field}>
              <label htmlFor={`feedback_${item.id}`}>Текст</label>
              <input
                className={styles.form__textarea}
                type="text"
                id={`feedback_${item.id}`}
                name="feedback_name"
                defaultValue={item.name}
                placeholder={item.name}
              />
            </p>
            <p className={styles.form__field}>
              <label htmlFor={`number_${item.id}`}>Номер</label>
              <input
                className={styles.form__textarea}
                type="text"
                id={`number_${item.id}`}
                name="number"
                defaultValue={item.number}
                placeholder={item.number}
              />
            </p>
            <Button onClick={(e) => handleDeleteAdvantages(e, item.id)}>
              Удалить
            </Button>
            <hr />
          </form>
        ))}
      </section>
    </>
  );
};

export default Feedback;
