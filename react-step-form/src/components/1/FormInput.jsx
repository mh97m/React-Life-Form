import { useState } from "react";
import "./formInput.css";

const FormInput = (props) => {
    const { label, errorMessage, onChange, id, type, options, error, ...inputProps } = props;
    const [focused, setFocused] = useState(false);

    const handleFocus = (e) => {
        setFocused(true);
    };

    switch (type) {
        case 'select':
            return (
                <div className="life-compare-form-select">
                    <label className="life-compare-label">{label}</label>
                    <select
                        {...inputProps}
                        className={error ? "life-compare-select-error": "life-compare-select"}
                        onChange={onChange}
                        onBlur={handleFocus}
                        onFocus={() =>
                            inputProps.name === "confirmPassword" && setFocused(true)
                        }
                        focused={focused.toString()}
                    >
                        <option value="">{label}</option>
                        {
                            options.map((opt, index) => {
                                return (
                                    <option key={index} value={opt}>{opt}</option>
                                )
                            })
                        }
                    </select>
                    <span className="life-compare-span">{errorMessage}</span>
                    <span className="life-compare-span-error">{error}</span>
                </div>
            );
        break;
        default:
            return (
                <div className="life-compare-form-input">
                    <label className="life-compare-label">{label}</label>
                    <input
                        {...inputProps}
                        className="life-compare-input"
                        onChange={onChange}
                        onBlur={handleFocus}
                        onFocus={() =>
                            inputProps.name === "confirmPassword" && setFocused(true)
                        }
                        focused={focused.toString()}
                        type={type}
                    />
                    <span className="life-compare-span">{errorMessage}</span>
                    <span className="life-compare-span">{errorMessage}</span>
                </div>
            );
        }
    
};

export default FormInput;
