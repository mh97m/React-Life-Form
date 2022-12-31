export const questions = [
  {
    section: 1,
    items: [
      {
        label: 'نسبت',
        type: 'select',
        value: 'insurance_target',
        options: ['خودم', 'همسر', 'فرزند', 'پدر', 'مادر', 'خواهر', 'برادر']
      },
      {
        label: 'سال تولد',
        type: 'select',
        value: 'birth_year',
        options: []
      },
      {
        label: 'ماه تولد',
        type: 'select',
        value: 'birth_month',
        options: ['12','11','10','9','8','7','6','5','4','3','2','1']
      },
      {
        label: 'روز تولد',
        type: 'select',
        value: 'birth_day',
        options: ['30','29','28','27','26','25','24','23','22','21','20','19','18','17','16','15','14','13','12','11','10','9','8','7','6','5','4','3','2','1']
      }
    ]
  },
  {
    section: 2,
    items: [
      {
        label: 'Street Address',
        type: 'text',
        value: 'street'
      },
      {
        label: 'City',
        type: 'text',
        value: 'city'
      },
      {
        label: 'State',
        type: 'select',
        value: 'state',
        options: ['State 1', 'State 2']
      }
    ]
  },
  {
    section: 3,
    items: [
      {
        label: 'If you are ready to submit please press `Submit`',
        type: 'information'
      }
    ]
  }
]
