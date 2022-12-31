import React from "react";

function PersonalInfo({ formData, setFormData }) {
  const now = new Date();
  const years = [];
  const months = [];
  const days = [];
  for (let i = now.getFullYear(); i > now.getFullYear() - 66; i--) {
    years.push(i);
  }
  for (let i = 12; i > 0; i--) {
    months.push(i);
  }
  for (let i = formData['birth_month'] > 6 ? 30 : 31; i > 0; i--) {
    days.push(i);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleInsuranceTarget = (e) => {
    handleChange(e);
    if (e.target.value == 'خودم') {
      if (now.getFullYear() - formData['birth_year'] < 18) {
        setFormData({ ...formData, birth_year: '' });
      } else if (now.getFullYear() - formData['birth_year'] == 18) {
        if (formData['birth_month'] > now.getMonth()) {
          setFormData({ ...formData, birth_year: '' });
        } else if (formData['birth_month'] == now.getMonth() && formData['birth_day'] > now.getDay()) {
          setFormData({ ...formData, birth_year: '' });
        }
      }
    }
  }

  const handleBirthYear = (e) => {
    handleChange(e);
    if (now.getFullYear() - e.target.value > 64) {
      setFormData({ ...formData, birth_year: '' });
    } else if (now.getFullYear() - e.target.value == 64){
      if (formData['birth_month'] > now.getMonth() + 1) {
        setFormData({ ...formData, birth_year: '' });
      } else if (formData['birth_month'] == now.getMonth() && formData['birth_day'] > now.getDay()) {
        setFormData({ ...formData, birth_year: '' });
      }
    } else if (now.getFullYear() - e.target.value < 18){
      if (formData['insurance_target'] == 'خودم') {
        setFormData({ ...formData, birth_year: '' });
      }
    } else if (now.getFullYear() - e.target.value == 18){
      if (formData['insurance_target'] == 'خودم') {
        if (formData['birth_month'] > now.getMonth()) {
          setFormData({ ...formData, birth_year: '' });
        } else if (formData['birth_month'] == now.getMonth() && formData['birth_day'] > now.getDay()) {
          setFormData({ ...formData, birth_year: '' });
        }
      }
    }
  }
  const handleBirthMonth = (e) => {
    handleChange(e);
    if (now.getFullYear() - formData['birth_year'] > 64) {
      setFormData({ ...formData, birth_year: '' });
    } else if (now.getFullYear() - formData['birth_year'] == 64){
      if (e.target.value > now.getMonth() + 1) {
        setFormData({ ...formData, birth_year: '' });
      } else if (e.target.value == now.getMonth() + 1 && formData['birth_day'] > now.getDay()) {
        setFormData({ ...formData, birth_year: '' });
      }
    }
  }
  const handleBirthDay = (e) => {
    handleChange(e);
    if (now.getFullYear() - formData['birth_year'] > 64) {
      setFormData({ ...formData, birth_year: '' });
    } else if (now.getFullYear() - formData['birth_year'] == 64){
      if (formData['birth_month'] > now.getMonth() + 1) {
        setFormData({ ...formData, birth_year: '' });
      } else if (formData['birth_month'] == now.getMonth() + 1 && e.target.value > now.getDay()) {
        setFormData({ ...formData, birth_year: '' });
      }
    }
  }

  return (
    <div className="personal-info-container">
      <select
        name="insurance_target"
        value={formData.insurance_target}
        onChange={handleInsuranceTarget}
        className="insurance-target">
        <option>نسبت</option>
        <option value="خودم">خودم</option>
        <option value="همسر">همسر</option>
        <option value="پدر">پدر</option>
        <option value="مادر">مادر</option>
        <option value="خواهر">خواهر</option>
        <option value="برادر">برادر</option>
        <option value="فرزند">فرزند</option>
      </select>
      <div className="birth">
        <select
          name="birth_year"
          value={formData.birth_year}
          onChange={handleBirthYear}
          className="birth-year">
          <option>سال تولد</option>
          {
            years.map((opt, index) => {
              return (
                <option value={opt}>{opt}</option>
              )
            })
          }
        </select>
        <select
          name="birth_month"
          value={formData.birth_month}
          onChange={handleBirthMonth}
          className="birth-month">
          <option>ماه تولد</option>
          {
            months.map((opt, index) => {
              return (
                <option value={opt}>{opt}</option>
              )
            })
          }
        </select>
        <select
          name="birth_day"
          value={formData.birth_day}
          onChange={handleBirthDay}
          className="birth-day">
          <option>روز تولد</option>
          {
            days.map((opt, index) => {
              return (
                <option value={opt}>{opt}</option>
              )
            })
          }
        </select>
      </div>
    </div>
  );
}

export default PersonalInfo;
