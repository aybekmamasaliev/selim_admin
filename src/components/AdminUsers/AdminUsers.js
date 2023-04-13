import { useState } from "react";
import {
  useAddAdvantagesMutation,
  useAddNewAdminMutation,
  useDelAdminusersMutation,
  useGetAdminusersQuery,
  useGetAdvantagetQuery,
  usePutAdminUserMutation,
} from "../../store/apis/appSelim";
import Button from "../Button/Button";
import styles from "./AdminUsers.module.scss";

const AdminUsers = () => {
  const { data: advantages = [] } = useGetAdvantagetQuery();
  const {data: adminusers=[]}=useGetAdminusersQuery();
  const [removeAdmin]=useDelAdminusersMutation();
  const [updateAdmin]=usePutAdminUserMutation();
  const [addNewAdmin]=useAddNewAdminMutation();
  const [addAdvantages, { isLoading }] = useAddAdvantagesMutation();
  const [newImage, setNewImage] = useState(null);
  const [newTxt, setNewTxt] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [update_txt, setUpdata_txt]=useState("");
  const [update_file, setUpdate_file]=useState("");

  const handleDeleteAdmin = (e, id) => {
    e.preventDefault();
    removeAdmin(id)
      .unwrap()
      .then((payload) => {
        alert("ok");
      })
      .catch((err) => {
        alert(err.status);
      });
  };

  const handleUpdateAdmin = (e, id) => {
    e.preventDefault();
    const formdata = new FormData();
    if (update_txt) {
      formdata.append("username", update_txt);
    }
    const variable = {id, formdata}
    updateAdmin(variable)
      .unwrap()
      .then((payload) => {
        alert("ok");
        setUpdata_txt("");
      })
      .catch((err) => {
        alert(err.status);
      });
  };
  const makeSuperAdmin = (e, id) => {
    e.preventDefault();
    const formdata = new FormData();
    if (update_txt) {
      formdata.append("username", update_txt);
    }

    formdata.append("is_superuser", true)
    const variable = {id , formdata}
    updateAdmin(variable)
      .unwrap()
      .then((payload) => {
        alert("ok");
        setUpdata_txt("");
      })
      .catch((err) => {
        alert(err.status);
      });
  };
  
  const makeStaffAdmin = (e, id) => {
    e.preventDefault();
    const formdata = new FormData();
    if (update_txt) {
      formdata.append("username", update_txt);
    }

    formdata.append("is_superuser", false)
    const variable = {id , formdata}
    updateAdmin(variable)
      .unwrap()
      .then((payload) => {
        alert("ok");
        setUpdata_txt("");
      })
      .catch((err) => {
        alert(err.status);
      });
  };


  const handleChangeUpdateFile=(e)=>{
    e.preventDefault();
    setUpdate_file(e.target.files[0])
  }

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
      console.log(e.target.files[0].name)
  };

  const handleAddData = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    if (newTxt) {
      formdata.append("username", newTxt);
    }
    if(password){
        formdata.append("password", password )
    }
    if(confirmpassword){
        formdata.append("password2", confirmpassword )
    }

    addNewAdmin(formdata)
      .unwrap()
      .then((payload) => {
        alert("ok");
        setNewTxt("")
        setConfirmPassword("")
        setPassword("")
      })
      .catch((err) => {
        alert(err.status);
        setNewTxt("")
        setConfirmPassword("")
        setPassword("")
      });
  };

  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.title}>Администраторы</h1>

        {adminusers.map((item) => (
          <form className={styles.form} key={item.id}>
            <p className={styles.form__field}>
              <label htmlFor={`admin__text_${item.id}`}>Логин</label>
              <input
                className={styles.form__textarea}
                type="text"
                id={`admin__text_${item.id}`}
                name="admin__text_"
                defaultValue={item.username}
                placeholder={item.username}
                onChange={(e)=>setUpdata_txt(e.target.value)}
              />
            </p>

            <p className={styles.form__field}>
              <label htmlFor={`admin_password${item.id}`}>Статус</label>
              <input
                className={styles.form__textarea}
                type="text"
                id={`admin_password${item.id}`}
                name="admin_password"
                defaultValue={item.is_superuser? "Супер админ" : "Админ Сотрудник"}
                onChange={(e)=>setUpdata_txt(e.target.value)}
                disabled
              />
            </p>
            <Button onClick={(e) => makeSuperAdmin(e, item.id)}>
              Сделать супер админом
            </Button>
            <Button onClick={(e) => makeStaffAdmin(e, item.id)}>
            Сделать сотрудником
            </Button>
            <Button onClick={(e) => handleUpdateAdmin(e, item.id)}>
              Обновить
            </Button>
            <Button onClick={(e) => handleDeleteAdmin(e, item.id)}>
              Удалить
            </Button>
            <hr />
          </form>
        ))}
      </section>

      <section className={styles.section}>
        <h1 className={styles.title}>Добавить администратора</h1>
        <form className={styles.form} onSubmit={(e)=>handleAddData(e)}>
          <p className={styles.form__field}>
            <label htmlFor="main_admin">Логин</label>
            <input
              className={styles.form__textarea}
              type="text"
              id="main_admin"
              name="new_admin"
              onChange={(e) => setNewTxt(e.target.value)}
              value={newTxt}
            />
          </p>
          <p className={styles.form__field}>
            <label htmlFor="password_admin">Пароль</label>
            <input
              className={styles.form__textarea}
              type="text"
              id="password_admin"
              name="new_admin_password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </p>
          <p className={styles.form__field}>
            <label htmlFor="password_admin">Пароль</label>
            <input
              className={styles.form__textarea}
              type="text"
              id="password_admin"
              name="new_admin_password_conf"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmpassword}
            />
          </p>
          <Button
            type="submit"
            onSubmit={(e) => handleAddData(e)}
            disabled={!password || isLoading}
          >
            {isLoading ? "Выкладывается..." : "Выложить"}
          </Button>
        </form>
      </section>
    </>
  );
};

export default AdminUsers;
