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
    flag = source?.length === 0 || dest?.length === 0 || deptDate?.length === 0 || new Date(deptDate) < new Date();
  } else {
    flag =
      source?.length === 0 ||
      dest?.length === 0 ||
      deptDate?.length === 0 ||
      returnDate?.length === 0 || 
      new Date(returnDate)> new Date(deptDate);
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

export { validateSearch, thousandSeparator };
