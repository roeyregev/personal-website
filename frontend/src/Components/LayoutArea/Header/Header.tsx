import { NavLink } from "react-router-dom";
import "./Header.css";
import appConfig from "../../../Utils/appConfig";

function Header(): JSX.Element {
    return (
        <div className="Header">

            <NavLink to={"/home/"}>
                <div>
                    <p>My Work</p>
                </div>
            </NavLink>

            <NavLink to={appConfig.aboutRoute}>
                <div>
                    <p>About</p>
                </div>
            </NavLink>
        </div>
    );
}

export default Header;
