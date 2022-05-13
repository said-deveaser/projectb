export const select = <Sw, Value>(checkedEl: Sw, cases:[Sw,Value][]):Value|undefined => {
  return cases.find(caseItem => caseItem[0] === checkedEl)?.[1]
}


const dateStringify = (date: Date) => {
  if (isNaN(date.getFullYear())) {
    throw `dateStringify(${date}) - Invalid Date`
  }
  const year = date.getFullYear().toString()
  let month = (date.getMonth()+1).toString()

  if (month.length !== 2) month = '0' + month
  let dayDate = date.getDate().toString()
  if (dayDate.length !== 2) dayDate = '0' + dayDate
  return `${dayDate}.${month}.${year}`
}
const dateParse = (stringDate: string) => {
  const [dateStr, monthStr, yearStr] = stringDate.trim().split('.')
  if (!dateStr || !monthStr || !yearStr) {
    throw `dateParse(${stringDate}) - Invalid DateString`
  }
  const date = parseInt(dateStr),
    month = parseInt(monthStr) - 1,
    year = parseInt(yearStr)
  if (isNaN(date) || isNaN(month) || isNaN(year)) {
    throw `dateParse(${stringDate}) - Invalid DateString`
  }
  const dateObj = new Date(year, month, date)
  if (dateObj.getFullYear() !== year || dateObj.getMonth() !== month || dateObj.getDate() !== date) {
    throw `dateParse(${stringDate}) - Invalid DateString`
  }
  return dateObj
}

export const DateHelper = {
  stringify: dateStringify,
  parse: dateParse,
}
