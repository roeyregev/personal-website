import styles from "./Toggle.module.scss"

function Toggle() {

    return (
        <div className={styles.toggle}>
            <div className={styles.switch}>
                <div className={styles.toggleIcon}></div>
            </div>
        </div>
    );
}

export default Toggle