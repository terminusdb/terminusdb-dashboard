import { ID_TRIM_LENGTH } from "./components/constants"

// function to trim long document IDs
export function trimID (id) {
  let trimmedId=id
  return (trimmedId.length > ID_TRIM_LENGTH) ? trimmedId.slice(0, ID_TRIM_LENGTH - 1) + '...' : trimmedId;
}



// pure js easy function to copy a string to clipboard
export const copyToClipboard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}