import React , {useState} from "react";
import styles from "./Products.module.scss";
import { useAddProductsMutation, useDelProductsMutation, useGetProductsQuery } from "../../store/apis/appSelim";
import Button from "../Button/Button";

const Products = () => {
    const [newImage, setNewImage]=useState(null)
    const [update_file, setUpdate_file] = useState("");
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [deleteProducts]=useDelProductsMutation();
  const [addProducts]=useAddProductsMutation();


  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
    console.log(e.target.files[0].name);
  };


//   const handleProduct = (e, id) => {
//     e.preventDefault();
//     const formdata = new FormData();
//     if (update_file) {
//       formdata.append("image", update_file);
//     }
//     const variable = { id, formdata };
//     updateNews(variable)
//       .unwrap()
//       .then((payload) => {
//         setUpdate_file(null);
//         alert("ok")
//       })
//       .catch((err) => {
//         alert(err.status);
//       });
//   };

  const handleDeleteProduct = (e, id) => {
    e.preventDefault();
    deleteProducts(id)
      .unwrap()
      .then((payload) => {
        alert("ok");
      })
      .catch((err) => {
        alert(err.status);
      });
  };

  const handleAddData = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    if (newImage) {
      formdata.append("image", newImage);
    }

    addProducts(formdata)
      .unwrap()
      .then((payload) => {
        console.log("ok");
        setNewImage(null);
      })
      .catch((err) => {
        alert(err.status);
        setNewImage(null);
      });
  };



  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.title}>Продукты</h1>

        {products.map((item) => (
          <form className={styles.form} key={item.id}>
            <div className={styles.img}>
              <img src={item.image} alt="" />
            </div>
            <Button onClick={(e) => handleDeleteProduct(e, item.id)}>
              Удалить
            </Button>
            <hr />
          </form>
        ))}
      </section>

      <section className={styles.section}>
        <h1 className={styles.title}>Добавить продукт</h1>

        <form className={styles.form} onSubmit={(e) => handleAddData(e)}>
          <p className={styles.form__field}>
            <label htmlFor="main_info__title" className={styles.form__label}>
              {newImage ? (
                <span>Вы выбрали файл : {newImage.name}</span>
              ) : (
                <span>Файл</span>
              )}
            </label>
            <input
              className={styles.form__file}
              type="file"
              id="main_info__title"
              name="title"
              onChange={handleFileChange}
            />
          </p>

          <Button
            type="submit"
            onSubmit={(e) => handleAddData(e)}
            disabled={!newImage || isLoading}
          >
            {isLoading ? "Выкладывается..." : "Выложить"}
          </Button>
        </form>
      </section>
    </>
  );
};

export default Products;
