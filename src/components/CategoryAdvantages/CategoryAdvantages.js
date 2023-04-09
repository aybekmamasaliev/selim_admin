import React, { useState } from "react";
import {
  useAddCategoryAdvantagesMutation,
  useDelCategoryAdvantagesMutation,
  useGetCategoryAdvantagesQuery,
  usePutCategoryAdvantagesMutation,
} from "../../store/apis/appSelim";
import styles from "./CategoryAdvantages.module.scss";
import Button from "../Button/Button";

const CategoryAdvantages = (props) => {
  const id = props.id;

  const [new_text, setNewText] = useState("");
  const [new_title, setNewTitle] = useState("");

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateText, setUpdateText] = useState("");
  const [postBool, setPostBool] = useState(false);

  const { data: categoryAdvantages = [] } = useGetCategoryAdvantagesQuery();
  const [updateCategoryAdvantages] = usePutCategoryAdvantagesMutation();
  const [deleteData] = useDelCategoryAdvantagesMutation();
  const [postData] = useAddCategoryAdvantagesMutation();

  let filteredAdvantages = categoryAdvantages.filter(
    (item) => item.category === id
  );


  const deleteCategoryAdvantages = (e, id) => {
    e.preventDefault();
    deleteData(id)
      .unwrap()
      .then((payload) => {
        alert("ok");
      })
      .catch((err) => alert(err.status));
  };

  const postCategoryAdvantage = (e) => {
    e.preventDefault();
    setPostBool(true)
    const formdata = new FormData();
    if(new_title){
      formdata.append("title", new_title);
    }
    if(new_text){
      formdata.append("text", new_text);
    }
    formdata.append("category", id);

    postData(formdata)
      .unwrap()
      .then((payload) => {
        alert("ok");
        setPostBool(false);
        setNewText("");
        setNewTitle("");
      })
      .catch((err) => alert(err.status));
  };

  const handleTile = (e) => {
    setUpdateTitle(e.target.value);
  };

  const handleText = (e) => {
    setUpdateText(e.target.value);
  };

  const updateData = (e, id) => {
    e.preventDefault();
    const formdata = new FormData();
    if (updateTitle) {
      formdata.append("title", updateTitle);
    }
    if (updateText) {
      formdata.append("text", updateText);
    }

    const variable = { formdata, id };

    updateCategoryAdvantages(variable)
      .unwrap()
      .then((payload) => {
        alert("ok");
      })
      .catch((err) =>{ 
        alert(err.status)
      });
  };

  return (
    <>
      <div className={styles.cover_form}>
        {filteredAdvantages.map((item) => (
          <form className={styles.form}>
            <div className={styles.flex_c}>
              <label htmlFor={`title_${item.id}`}>Заголовок</label>
              <input
                id={`title_${item.id}`}
                className={styles.input}
                defaultValue={item.title}
                onChange={handleTile}
              />
            </div>
            <div className={styles.flex_c}>
              <label htmlFor={`text_area_${item.id}`}>Описание</label>
              <textarea
                className={styles.texarea}
                id={`text_area_${item.id}`}
                onChange={handleText}
              >
                {item.text}
              </textarea>
            </div>
            <Button onClick={(e) => updateData(e, item.id)}>Обновить</Button>
            <br />
            <Button onClick={(e) => deleteCategoryAdvantages(e, item.id)}>
              Удалить
            </Button>
          </form>
        ))}
      </div>
      <div className={styles.cover_form}>
        <form className={styles.form}>
          <div className={styles.flex_c}>
            <label htmlFor={`title}`}>Заголовок</label>
            <input
              id={`title`}
              value={new_title}
              onChange={(e) => setNewTitle(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.flex_c}>
            <label htmlFor={`text`}>Описание</label>
            <textarea
              className={styles.texarea}
              value={new_text}
              id={`text`}
              onChange={(e) => setNewText(e.target.value)}
            />
          </div>
          <Button onClick={postCategoryAdvantage}>
            {postBool ? <span>Выкладывается ...</span> : <span>Выложить</span>}
          </Button>
        </form>
      </div>
    </>
  );
};

export default CategoryAdvantages;
