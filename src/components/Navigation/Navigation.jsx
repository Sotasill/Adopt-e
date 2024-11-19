import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Registration</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {/* Добавляйте другие ссылки по мере необходимости */}
      </ul>
    </nav>
  );
};

export default Navigation;
