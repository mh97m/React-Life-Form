import { useState, useEffect } from "react";
import "./lifeCompare.css";
import FormInput from "./FormInput";
import Cookies from "universal-cookie";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function LifeCompare() {
    const cookies = new Cookies();
    const formData = cookies.get("formData");
    const [values, setValues] = useState({
        insurance_target: formData["insurance_target"],
        insurance_target_error: "",
        birth_year: formData["birth_year"],
        birth_year_error: "",
        birth_month: formData["birth_month"],
        birth_day: formData["birth_day"],
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        insurance_target: "",
        birth_year: "",
        birth_month: "",
        birth_day: "",
    });
    const [now, setNow] = useState(
        new DateObject({
            date: new Date(),
            calendar: persian,
            locale: persian_fa,
        })
    );
    const [age, setAge] = useState(
        now.year -
            values["birth_year"] -
            (now.month > values["birth_month"] ? 1 : 0) -
            (now.month == values["birth_month"] && now.day > values["birth_day"]
                ? 1
                : 0)
    );
    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [days, setDays] = useState([]);

    useEffect(() => {
        setYears([...Array(66).keys()].map((i) => now.year - i));
        setMonths([...Array(12).keys()].map((i) => 12 - i));
        setDays([...Array(30).keys()].map((i) => 30 - i));
    }, []);

    const inputs = [
        {
            id: 1,
            name: "insurance_target",
            type: "select",
            errorMessage: ".نسبت خود را وارد کنید!!",
            label: "نسبت",
            required: true,
            options: ["خودم", "همسر", "فرزند", "پدر", "مادر", "خواهر", "برادر"],
        },
        {
            id: 2,
            name: "birth_year",
            type: "select",
            // errorMessage: ". سن شما بیشتر از 64 سال است",
            label: "سال تولد",
            options: years,
        },
        {
            id: 3,
            name: "birth_month",
            type: "select",
            label: "ماه تولد",
            options: months,
        },
        {
            id: 4,
            name: "birth_day",
            type: "select",
            label: "روز تولد",
            options: days,
        },
        {
            id: 44,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:
                "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 55,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "Passwords don't match!",
            label: "Confirm Password",
            pattern: values.password,
            required: true,
        },
    ];

    // const makeHandle = (str) =>
    //     ('handle_'+ str)
    //         .toLowerCase()
    //         .replace(/([-_][a-z])/g, (group) =>
    //             group.toUpperCase().replace("-", "").replace("_", "")
    //         );

    const handleChange = (e, name) => {
        switch (name) {
            case "insurance_target":
                handleInsuranceTarget(e);
                break;
            case "birth_year":
                handleBirthYear(e);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const updateAge = (e) => {
        setAge(
            now.year -
            values["birth_year"] -
            (now.month > values["birth_month"] ? 1 : 0) -
            (now.month == values["birth_month"] && now.day > values["birth_day"]
                ? 1
                : 0)
        );
    };

    const handleInsuranceTarget = (e) => {
        setErrors({ ...errors, birth_year: "" });
        if (e.target.value == "خودم") {
            if (age < 18) {
                setValues({ ...values, birth_year: "" });
                setErrors({
                    ...errors,
                    birth_year:
                        ". سن شما کمتر از 18 سال است. نمی توانید خود را بیمه کنید !!",
                });
            }
        }
    };

    const handleBirthYear = (e) => {
        setAge(
            now.year -
            e.target.value -
            (now.month > values["birth_month"] ? 1 : 0) -
            (now.month == values["birth_month"] && now.day > values["birth_day"]
                ? 1
                : 0)
        );
        console.log(age);
        setErrors({ ...errors, birth_year: "" });
        if (age >= 64) {
            setValues({ ...values, birth_year: "" });
            setErrors({
                ...errors,
                birth_year:
                    ". حداکثر سن 64 سال است !!",
            });
        } else if (age < 18) {
            if (values["insurance_target"] == "خودم") {
                setValues({ ...values, birth_year: "" });
                setErrors({
                    ...errors,
                    birth_year:
                        ". سن شما کمتر از 18 سال است. نمی توانید خود را بیمه کنید !!",
                });
            }
        }
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        handleChange(e, e.target.name);
    };

    return (
        <div className="life-compare">
            <form onSubmit={handleSubmit} className="life-compare-form">
                <h1 className="life-compare-h1">استعلام قیمت</h1>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        error={errors[input.name]}
                        onChange={onChange}
                    />
                ))}
                <button className="life-compare-button">Submit</button>
            </form>
        </div>
    );
}

export default LifeCompare;
