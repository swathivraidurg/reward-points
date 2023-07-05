import { NavLink } from "react-router-dom";

const NavbarsComponent = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => {
              return {
                color: isActive ? "white" : "grey",
              };
            }}
            exact="true"
          >
            Transactions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/customerbymonth"
            style={({ isActive }) => {
              return {
                color: isActive ? "white" : "grey",
              };
            }}
          >
            Monthly Reward Points
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarsComponent;
