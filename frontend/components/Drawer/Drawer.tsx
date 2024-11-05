import ReactDOM from "react-dom";
import closeIcon from "../../assets/svgs/close_icon.svg";
import arrowIcon from "../../assets/svgs/close_icon.svg";
import styles from "./Drawer.module.scss";

interface DrawerProps {
    close: Function;
}

function Drawer(props: DrawerProps): JSX.Element {


    return ReactDOM.createPortal(
        <>
            <div className={styles.Drawer}>
                <div className="drag-line"></div>
                <div className="nav-icons">
                    <div className="blank nav-icon"><p>blank</p></div>
                    <div className="change-page">
                        <div className="next nav-icon"><img className="previous-icon" src={arrowIcon} alt="previous-icon" /></div>
                        <div className="previous nav-icon"><img className="next-icon" src={arrowIcon} alt="next-icon" /></div>
                    </div>
                    <div className="close nav-icon" onClick={() => props.close()}><img src={closeIcon} alt="close-icon" /></div>
                </div>

                <div className="project-content-container">
                    <h2>Title</h2>
                    <div className="tags-container">

                    </div>
                    <div className="description">

                    </div>
                    <div className="content">

                    </div>

                </div>
            </div>
        </>,
        document.getElementById("portal") as HTMLElement
    );
}

export default Drawer;
