export const select = <Sw, Value>(checkedEl: Sw, cases:[Sw,Value][]):Value|undefined => {
  return cases.find(caseItem => caseItem[0] === checkedEl)?.[1]
}
