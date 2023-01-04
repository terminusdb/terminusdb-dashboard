export function stringDateTime (data) {
	// removing Z from end
	let str = data.substring(0, data.length - 1) 
	let timeStampArray=str.split("T")
	let dateArray=timeStampArray[0].split("-")
	let timeArray=timeStampArray[1].split(":")
	return {dateArray, timeArray}
}