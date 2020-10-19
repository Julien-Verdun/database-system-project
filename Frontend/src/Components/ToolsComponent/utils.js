export function processDate(date) {
  /*
    date is a date to the format :
    Sun Oct 18 2020 17:20:04 GMT+0200 (heure d’été d’Europe centrale)
    and the function returns a date to the format :
    "18-10-2020"
    */
  let dateProcess = date.toJSON().split("T")[0];
  return reverseDate(dateProcess);
}

export function dateToDateTimeLocal(date) {
  /*
    date is a date to the format :
    Sun Oct 18 2020 17:20:04 GMT+0200 (heure d’été d’Europe centrale)
    and the function returns a date to the format :
    "2018-10-18T17:20"
    */
  return date.toJSON().split(".")[0];
}

export function reverseDate(date) {
  /*
    date is a date to the format :
    "2020-10-18"
    and the function retuns a date to the format :
    "18-10-2020"
    */
  let dateProcess = date.split("-");
  return dateProcess[2] + "-" + dateProcess[1] + "-" + dateProcess[0];
}
