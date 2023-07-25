



/** sorts alphabetically  */
function sortBy(a, b) {
  a = a.toLowerCase()
  b = b.toLowerCase()
  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

/** sorts strings in json object alphabetically  */
export function sortAlphabetically (list, key) { 
  return list.sort(function (a, b) {
      return sortBy(a[key], b[[key]]) 
  })
}

/** orders array of jsons based on @metadata order_by array */
export function mapByOrder (array, order, key) {
  array.sort( function (a, b) {
    var A = a[key], B = b[key];
    if (order.indexOf(A) > order.indexOf(B)) {
      return 1;
    } else {
      return -1;
    }
  });
  return array;
};