
function getObjFirstValue(element) {
    if (element != "" && element != undefined)
        return element[Object.keys(element)[0]]
    else {
        console.log("[getObjFirstValue]ERROR: Wrong Data!")
    }
}

function getObjFirstKey(element) {
    if (element != "" && element != undefined)
        return Object.keys(element)[0]
    else {
        console.log("[getObjFirstValue]ERROR: Wrong Data!")
    }
}

export { getObjFirstValue, getObjFirstKey }