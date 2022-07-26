
export const handleWidthChange = (sz, setWidth) => {
    const maxWidth = 1000;
    const padding = 225;
    const paneWidth = maxWidth - sz - padding;
    setWidth({ width: paneWidth + "px" });
}

export const timeConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp)
    var months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    var year = a.getFullYear()
    var month = months[a.getMonth()]
    var date = a.getDate()
    var hour = a.getHours()
    var min = a.getMinutes()
    var sec = a.getSeconds()
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
    return time
}

