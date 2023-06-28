/**
 * @function validateSearch
 * @param {string} source
 * @param {string} dest
 * @param {string} deptDate
 * @param {string} returnDate
 * @param {string} selectTrip
 * @description validate search criteria
 */
const validateSearch = (source: any, dest: any, deptDate: any, returnDate: any, selectTrip: any) => {
  let flag = true;

  if (selectTrip?.toUpperCase() === "ONE") {
    flag = source?.length === 0 || dest?.length === 0 || deptDate?.length === 0;
  } else {
    flag =
      source?.length === 0 ||
      dest?.length === 0 ||
      deptDate?.length === 0 ||
      returnDate?.length === 0;
  }

  return flag;
};

/**
 * @function thousandSeparator
 * @param {int} x
 * @description Thosand Separator
 */
const thousandSeparator = (x: any) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * @function filterBySourceDest
 * @param {object} payload
 * @param {array} response
 * @description filter flight list by source and destination
 */
const filterBySourceDest = (payload: any, response: any) => {
  let resultArr = [];
  let tempArr = [...response];

  const sourceCity = payload?.source;
  const destCity = payload?.destination;
  console.log(sourceCity);
  console.log(destCity)
  resultArr = tempArr.filter(
    (val) =>
      val?.deptCity?.toLowerCase() === sourceCity?.toLowerCase() &&
      val?.arivalCity?.toLowerCase() === destCity?.toLowerCase()
  );

  return resultArr;
};

export { validateSearch, thousandSeparator, filterBySourceDest };
