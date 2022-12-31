// import "./MultiStepForm.css";
import { useState, useEffect } from "react";
import { FormItem } from "./FormItem";

export const MultiStepForm = (props) => {
  // store index number with the answers?
  const [answers, setAnswers] = useState({ index: props.step });
  const now = new Date();
  for (let i = now.getFullYear(); i > now.getFullYear() - 64; i--) {
    props.list[0]['items'][1]['options'].push(i);
  }

  useEffect(() => {
    // check if the answers isn't empty
    if (Object.keys(answers).length > 1) {
      // update page answers
      props.onPageUpdate(answers.index, answers);
      // update page number locally
      setAnswers({ index: props.step })
    } else {
      // update page number locally
      setAnswers({ index: props.step })
    }
  }, [props.step])

  const updateAnswers = (value, category) => {
    setAnswers({ ...answers, [category]: value });
    // console.log(props.list[0]['items'][1]['options']);
    if (category == 'insurance_target') {
      if (value == 'خودم') {
        console.log(answers['birth_year']);
        setAnswers({ ...answers, ['birth_year']: null });
        console.log(answers['birth_year']);
        if (answers['birth_year'] < now.getFullYear() - 18) {
          answers['birth_year'] = null;
        } else if (answers['birth_year'] == now.getFullYear() - 18) {
          if (answers['birth_month'] > now.getMonth()) {
            answers['birth_year'] = null;
          } else if (answers['birth_month'] == now.getMonth() && answers['birth_day'] > now.getDay()) {
            answers['birth_year'] = null;
          }
        }
      }
    }

  }

  return (
    <div className="text-left">
      {
        props.list[props.step - 1].items?.map((item, index) => {
          return (
            <FormItem key={`${index}_${item.label}`} item={item} onChange={updateAnswers} answer={props.pagesAnswers[props.step] ? props.pagesAnswers[props.step][item.value] : null} />
          )
        })
      }
    </div>
  )
}
