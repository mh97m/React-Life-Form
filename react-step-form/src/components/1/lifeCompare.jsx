import { useState, useEffect, useRef } from "react";
import FormInput from "./FormInput";
import Cookies from "universal-cookie";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "./lifeCompare.css";
import Jobs from "../../Jobs.json";

function LifeCompare() {
    const cookies = new Cookies();
    const formData = cookies.get("formData");
    const [values, setValues] = useState({
        insurance_target:
            typeof formData !== "undefined" ? formData["insurance_target"] : "",
        birth_year:
            typeof formData !== "undefined" ? formData["birth_year"] : "",
        birth_month:
            typeof formData !== "undefined" ? formData["birth_month"] : "",
        birth_day: typeof formData !== "undefined" ? formData["birth_day"] : "",
        life_ins_duration:
            typeof formData !== "undefined"
                ? formData["life_ins_duration"]
                : "",
        payment_method:
            typeof formData !== "undefined" ? formData["payment_method"] : "",
        annual_payment:
            typeof formData !== "undefined"
                ? parseInt(formData["annual_payment"]).toLocaleString()
                : "",
        first_job_level: typeof formData !== "undefined" ? formData["job"] : "",
        first_job_level_id: "",
        divided_payment: typeof formData !== "undefined" ? (formData["annual_payment"] / formData["payment_method"]).toLocaleString() : "",
    });
    const [errors, setErrors] = useState({
        insurance_target: "",
        birth_year: "",
        birth_month: "",
        birth_day: "",
        annual_payment: "",
    });
    const [now, setNow] = useState(
        new DateObject({
            date: new Date(),
            calendar: persian,
            locale: persian_fa,
        })
    );
    const age = useRef(
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
    const [durations, setDurations] = useState([]);
    const [jobResults, setJobResults] = useState([]);

    useEffect(() => {
        setYears([...Array(66).keys()].map((i) => now.year - i));
        setMonths([...Array(12).keys()].map((i) => 12 - i));
        setDays([...Array(30).keys()].map((i) => 30 - i));
        updateDurations();
    }, []);

    const inputs = [
        {
            id: 1,
            name: "insurance_target",
            type: "select",
            errorMessage: ". نسبت خود را وارد کنید!!",
            label: "نسبت",
            required: true,
            options: ["خودم", "همسر", "فرزند", "پدر", "مادر", "خواهر", "برادر"],
        },
        {
            id: 2,
            name: "birth_year",
            type: "select",
            errorMessage: ". سال تولد خود را وارد کنید !!",
            label: "سال تولد",
            required: true,
            options: years,
        },
        {
            id: 3,
            name: "birth_month",
            type: "select",
            errorMessage: ". ماه تولد خود را وارد کنید !!",
            label: "ماه تولد",
            required: true,
            options: months,
        },
        {
            id: 4,
            name: "birth_day",
            type: "select",
            errorMessage: ". روز تولد خود را وارد کنید !!",
            label: "روز تولد",
            required: true,
            options: days,
        },
        {
            id: 5,
            name: "life_ins_duration",
            type: "select",
            errorMessage: ". مدت بیمه نامه را وارد کنید !!",
            label: "مدت بیمه نامه",
            required: true,
            options: durations,
        },
        {
            id: 6,
            name: "first_job_level",
            type: "input",
            errorMessage: ". شغل خود را انتخاب کنید !!",
            label: "عنوان شغل",
            placeholder: "عنوان شغل",
            required: true,
            options: jobResults,
        },
        {
            id: 7,
            name: "payment_method",
            type: "select",
            errorMessage: ". ابتدا مبلغ پرداختی را انتخاب نمایید !!",
            label: "روش پرداخت",
            required: true,
            options: [
                {
                    key: 1,
                    value: "۱ قسط سالانه"
                },
                {
                    key: 2,
                    value: "۲ قسط شش ماهه"
                },
                {
                    key: 4,
                    value: "۴ قسط سه ماهه"
                },
                {
                    key: 12,
                    value: "۱۲ قسط ماهانه"
                },
                {
                    key: 1,
                    value: "۱ قسط سالانه"
                },
            ],
        },
        {
            id: 8,
            name: "annual_payment",
            type: "input",
            errorMessage: ". مبلغ پرداختی برای سال اول را وارد کنید !!",
            label: "مبلغ پرداختی سال اول",
            required: true,
        },
        {
            id: 9,
            name: "divided_payment",
            type: "input",
            label: "مبلغ پرداختی قسط اول",
            readOnly:true
        },
        /*
        ,{
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
        */
    ];

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        handleChange(e);
    };

    const handleChange = (e) => {
        switch (e.target.name) {
            case "insurance_target":
                handleInsuranceTarget(e);
                break;
            case "birth_year":
                handleBirth(e);
                break;
            case "birth_month":
                handleBirth(e);
                break;
            case "birth_day":
                handleBirth(e);
                break;
            case "payment_method":
                handlePaymentMethod(e);
                break;
            case "annual_payment":
                handleAnnualPayment(e);
                break;
            case "first_job_level":
                handleFirstJobLevel(e);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("فرم ثبت شد");
    };

    const updateAge = (e) => {
        age.current =
            now.year -
            (e.target.name == "birth_year"
                ? e.target.value
                    ? e.target.value
                    : now.year
                : values["birth_year"]
                ? values["birth_year"]
                : now.yaer) -
            (now.month <
            (e.target.name == "birth_month"
                ? e.target.value
                    ? e.target.value
                    : now.month
                : values["birth_month"]
                ? values["birth_month"]
                : now.month)
                ? 1
                : 0) -
            (now.month ==
                (e.target.name == "birth_month"
                    ? e.target.value
                        ? e.target.value
                        : now.month
                    : values["birth_month"]
                    ? values["birth_month"]
                    : now.month) &&
            now.day <
                (e.target.name == "birth_day"
                    ? e.target.value
                        ? e.target.value
                        : now.day
                    : values["birth_day"]
                    ? values["birth_day"]
                    : now.day)
                ? 1
                : 0);
        updateDurations();
    };

    const updateDurations = (e) => {
        age.current >= 59
            ? setDurations(
                  [...Array(66 - age.current).keys()].map((i) => 5 + i)
              )
            : age.current >= 49
            ? setDurations(
                  [...Array(77 - age.current).keys()].map((i) => 5 + i)
              )
            : setDurations([...Array(26).keys()].map((i) => 5 + i));
    };

    const handleInsuranceTarget = (e) => {
        setErrors({ ...errors, birth_year: "" });
        if (e.target.value == "خودم") {
            if (age.current < 18) {
                setValues({ ...values, birth_year: "" });
                setErrors({
                    ...errors,
                    birth_year:
                        ". سن شما کمتر از 18 سال است. نمی توانید خود را بیمه کنید !!",
                });
                setDurations([]);
            }
        }
    };

    const handleBirth = (e) => {
        setErrors({ ...errors, [e.target.name]: "" });
        updateAge(e);
        if (age.current > 64) {
            setValues({ ...values, [e.target.name]: "" });
            setErrors({
                ...errors,
                [e.target.name]: ". حداکثر سن 64 سال است !!",
            });
            setDurations([]);
        } else if (age.current < 18) {
            if (values["insurance_target"] == "خودم") {
                setValues({ ...values, [e.target.name]: "" });
                setErrors({
                    ...errors,
                    [e.target.name]:
                        ". سن شما کمتر از 18 سال است. نمی توانید خود را بیمه کنید !!",
                });
                setDurations([]);
            }
        }
    };

    const handlePaymentMethod = (e) => {
        setErrors({ ...errors, annual_payment: "" });
        if (e.target.value == "12") {
            if (
                (values["annual_payment"]
                    ? values["annual_payment"].replace(/,/g, "")
                    : 0) < 6000000
            ) {
                setValues({ ...values, annual_payment: "" });
                setErrors({
                    ...errors,
                    annual_payment:
                        ". برای پرداخت ماهانه مبلغ باید بیشتر از 000'000'6 ریال باشد !!",
                });
            }
        } else {
            if (
                (values["annual_payment"]
                    ? values["annual_payment"].replace(/,/g, "")
                    : 0) < 4000000
            ) {
                setValues({ ...values, annual_payment: "" });
                setErrors({
                    ...errors,
                    annual_payment: ". حداقل مبلغ 000'000'4 ریال می باشد !!",
                });
            }
        }
    };

    const handleAnnualPayment = (e) => {
        setErrors({ ...errors, [e.target.name]: "" });
        if (values["payment_method"] == "12") {
            if (e.target.value.replace(/,/g, "") < 6000000) {
                // setValues({ ...values, payment_method: "" });
                values["payment_method"] = "";
                setErrors({
                    ...errors,
                    [e.target.name]:
                        ". برای پرداخت ماهانه مبلغ باید بیشتر از 000'000'6 ریال باشد !!",
                });
            }
        } else {
            if (e.target.value.replace(/,/g, "") < 4000000) {
                // setValues({ ...values, payment_method: "" });
                values["payment_method"] = "";
                setErrors({
                    ...errors,
                    [e.target.name]: ". حداقل مبلغ 000'000'4 ریال می باشد !!",
                });
            }
        }
        setValues({
            ...values,
            [e.target.name]: parseInt(e.target.value.replace(/,/g, ""))
                ? parseInt(e.target.value.replace(/,/g, "")).toLocaleString()
                : 0,
        });
    };

    const handleFirstJobLevel = (e) => {
        setValues({ ...values, first_job_level_id: "" });
        setJobResults(
            e.target.value.length > 2
                ? Jobs.filter((value) => {
                      return value.Caption.toLowerCase().includes(
                          e.target.value.toLowerCase()
                      );
                  })
                : []
        );
    };

    const onClickJobResults = (e) => {
        setValues({ ...values,
            first_job_level_id: e.target.value,
            first_job_level: e.target.innerHTML
        });
        setJobResults([]);
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
                        onClick={
                            input.name == "first_job_level"
                                ? onClickJobResults
                                : null
                        }
                    />
                ))}
                <button className="life-compare-button">ثبت نام</button>
            </form>
        </div>
    );
}

export default LifeCompare;
