import styles from './Footer.module.scss';
import IconRights from '../Icons/IconRights'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.iconRight}>
                <IconRights />
            </div>
            <div className={styles.footerText}>All rights reserved to me! | 2025</div>
        </div>
    )
}

export default Footer;