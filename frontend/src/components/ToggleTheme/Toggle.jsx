import "./Toggle.css";
import { TiAdjustContrast } from "react-icons/ti";
import { IconContext}  from "react-icons";

export const Toggle = ({ handleChange }) => {
    return (
        <div className="toggle-theme-container">
            <button
                type="button"
                className="toggle-theme-btn"
                onClick={handleChange}
            >
                <IconContext.Provider value={{ className:"theme-icon"}}>
                    <TiAdjustContrast />
                </IconContext.Provider>
            </button>
        </div>
    );
};