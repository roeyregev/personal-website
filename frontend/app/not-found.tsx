import Link from "next/link";
import Image from "next/image";
import styles from "./(root)/page.module.scss";
import lostImage from "../public/images/404_image.png"

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.notFoundFlex}>
        <h1 className={styles.notFoundNumber}>404</h1>
        <h1 className={styles.notFoundTitle}>Page Not Found</h1>
      </div>
      <div className={styles.notFoundImageWrapper}>
        <Image
          className={styles.image}
          src={lostImage}
          alt="404 image"
        />
      </div>

      <Link href="/" className={styles.homeLink}>
        Take me home
      </Link>
    </div>
  );
}