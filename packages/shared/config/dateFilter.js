let oneDayBack = new Date();
oneDayBack = oneDayBack.setDate(oneDayBack.getDate() - 1);
let oneWeekBack = new Date();
oneWeekBack = oneWeekBack.setDate(oneWeekBack.getDate() - 7);
let oneMonthBack = new Date();
oneMonthBack = oneMonthBack.setMonth(oneMonthBack.getMonth() - 1);

export default {
  oneDayBack: oneDayBack,
  oneWeekBack: oneWeekBack,
  oneMonthBack: oneMonthBack
};
