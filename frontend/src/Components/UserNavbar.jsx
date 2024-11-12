import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./UserNavbar.css";

function UserNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div>
            <img
              className="cash-logo"
              src="src/assets/cash-app-logo.png"
              alt="CashApp's logo in green"
            />
          </div>
          <div
            className="menu-container collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard2">
                  Dashboard 2
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/change-password">
                  Change Password
                </Link>
              </li>
            </ul>
            <div className="btn-container">
              <button
                className="logout-btn btn btn-outline-danger ms-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default UserNavbar;
