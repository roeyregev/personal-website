import { Navigate, Route, Routes } from "react-router-dom";
import appConfig from "../../../Utils/appConfig";
import MainPage from "../../MainPageArea/MainPage/MainPage";
import AboutPage from "../../AboutArea/AboutPage/AboutPage";
import PageNotFound from "../PageNotFound/PageNotFound";


function Routing(): JSX.Element {
    return (
        <div className="Routing">

            <Routes>
                {/* Home Route */}
                <Route path={appConfig.mainRoute} element={<MainPage />} /> 

                {/* About Route */}
                <Route path={appConfig.aboutRoute} element={<AboutPage />} />

                {/* Default Route */}
                <Route path="/" element={<Navigate to="/home" />} />

                {/* Page Not Found Route */}
                <Route path="*" element={<PageNotFound />} />
            </Routes >
        </div>
    );
}

export default Routing;
