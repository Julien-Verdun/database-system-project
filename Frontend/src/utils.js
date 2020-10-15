export default function processDate(date) {
  let dateProcess = date.split("T")[0].split("-");
  return dateProcess[2] + "-" + dateProcess[1] + "-" + dateProcess[0];
}
