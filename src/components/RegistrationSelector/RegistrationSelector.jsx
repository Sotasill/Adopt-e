
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../redux/registration/registrationSlice";
import { selectRole } from "../../redux/registration/registrationSelectors";
// import css from "./RegistrationSelector.module.css";


const RegistrationSelector = () => {
  const dispatch = useDispatch();
  const role = useSelector(selectRole); // Получаем текущую роль из Redux

  // Обработчик выбора роли
  const handleSelect = (selectedRole) => {
    dispatch(setRole(selectedRole)); // Изменяем роль в Redux
  };

  return (
    <div>
      <h1>Choose Your Role</h1>
      <button onClick={() => handleSelect("buyer")}>Buyer</button>
      <button onClick={() => handleSelect("breeder")}>Breeder</button>
      {role && <p>Selected Role: {role}</p>}
    </div>
  );
};

export default RegistrationSelector;
