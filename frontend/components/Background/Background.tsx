import style from "./Background.module.scss"
import MyBitmoji from "../Icons/myBitmoji";


const Background = () => {

    return (
        <div className={style.bgMain}>
            <div className={style.bitmojiFlex}>
            <div className={style.bitmojiWrapper}>
                <MyBitmoji />
            </div>
            
            <div className={style.bitmojiWrapper}>
                <MyBitmoji />
            </div>
            </div>
        </div>
    );
}

export default Background;