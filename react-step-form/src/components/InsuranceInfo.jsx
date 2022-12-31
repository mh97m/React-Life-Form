import React from "react";

function OtherInfo({ formData, setFormData }) {
  const now = new Date();
  const durations = [];
  if (now.getFullYear() - parseInt(formData['birth_year']) >= 59) {
    for (let i = 0; i < (64 - now.getFullYear() + parseInt(formData['birth_year']) + 1); i++) {
      durations.push(i + 5);
    }
  } else {
    for (let i = 0; i < (64 - now.getFullYear() + parseInt(formData['birth_year']) + 11) && i < 26; i++) {
      durations.push(i + 5);
    }
  }

  return (
    <div className="insurance-info-container">
      <select
        name="life_ins_duration"
        value={formData.life_ins_duration}
        onChange={(e) => {
          setFormData({ ...formData, life_ins_duration: e.target.value });
        }}
        className="life-ins-duration">
        <option>مدت بیمه نامه</option>
        {
          durations.map((opt, index) => {
            return (
              <option value={opt}>{opt}</option>
            )
          })
        }
      </select>
      <select
        name="payment_method"
        value={formData.payment_method}
        onChange={(e) => {
          setFormData({ ...formData, payment_method: e.target.value });
        }}
        className="payment-method">
        <option>نحوه پرداخت</option>
        <option value="1">۱ قسط سالانه</option>
        <option value="2">۲ قسط شش ماهه</option>
        <option value="4">۴ قسط سه ماهه</option>
        <option value="12">۱۲ قسط ماهانه</option>
      </select>
      <input
        type="text"
        placeholder="مبلغ پرداختی سال اول (ریال)"
        value={formData.annual_payment}
        onChange={(e) => {
          setFormData({ ...formData, annual_payment: e.target.value });
        }}
      />
    </div>
  );
}

export default OtherInfo;
