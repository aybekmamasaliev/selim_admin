
import {
  useDelFeedBackMutation,
  useGetFeedBackQuery,
} from "../../store/apis/appSelim";
import Button from "../Button/Button";
import styles from "./Feedback.module.scss";

const Feedback = () => {

  const { data: feedback = [], isLoading } = useGetFeedBackQuery();
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


  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.title}> Обратная связь </h1>

        {isLoading ? (
          <p className={styles.loading}>loading ...</p>
        ) : (
          <div>
            {feedback.map((item) => (
              <form className={styles.form} key={item.id}>
                <p className={styles.form__field}>
                  <label htmlFor={`feedback_${item.id}`}>Имя</label>
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
                  <label htmlFor={`number_${item.id}`}>Cообщение</label>
                  <input
                    className={styles.form__textarea}
                    type="text"
                    id={`message_${item.id}`}
                    name="message"
                    defaultValue={item.message}
                    placeholder={item.message}
                  />
                </p>
                <p className={styles.form__field}>
                  <label htmlFor={`date_${item.id}`}>Дата</label>
                  <input
                    className={styles.form__textarea}
                    type="text"
                    id={`date_${item.id}`}
                    name="date"
                    defaultValue={item.created_at}
                    placeholder={item.created_at}
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
          </div>
        )}
      </section>
    </>
  );
};

export default Feedback;
