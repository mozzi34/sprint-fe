type Month = number | string;
type Day = number | string;

export default function DateFormat({ createDate }: any) {
  let date: Date = createDate.createdAt.toDateString();

  let year = date.getFullYear();
  let month: Month = date.getMonth() + 1;
  let day: Day = date.getDate();

  if (month <= 10) {
    month = '0' + month;
  }

  if (day <= 10) {
    day = '0' + day;
  }

  let resultDate = `${year}.${month}.${day}`;

  return resultDate;
}
