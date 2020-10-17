function processDate(date) {
  let dateProcess = date.toJSON().split("T")[0].split("-");
  return dateProcess[2] + "-" + dateProcess[1] + "-" + dateProcess[0];
}

module.exports = { processDate };
