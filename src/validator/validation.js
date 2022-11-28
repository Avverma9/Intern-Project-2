const valid = function (data){
    if(typeof(data)===undefined || typeof(data)===null) { return false}
    if(typeof (data) ==="string" && data.trim().length>0) {return true}
}
const validISBN = function(ISBN){
    return /^(97(8|9))?\d{9}(\d|X)$/.test(ISBN);
}
const validEmail=function(email){
    // const emailRegex=/\S+@\S+\.\S+/
     const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-][a-z]{1,4}$/
    return emailRegex.test(email)
}
const validMobile=function(mobile){
    const mobileRegex=/^\d{10}$/
    return mobileRegex.test(mobile)
}

module.exports = {valid,validEmail,validISBN,validMobile}