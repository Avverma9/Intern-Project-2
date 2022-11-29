const jwt =  require('jsonwebtoken')

//=================================================authentication========================================================//
const authenticate = function (req, res, next) {
    try {

        let token = req.headers["x-api-key"]
        if (!token) {
            return res.status(400).send({ status: false, message: "no token found" })
        }
        jwt.verify(token, "Blog@Management", function (err, decodedToken) {
            if (err) {
                return res.status(401).send({ status: false, message: err.message })
            }
            req.decodedToken = decodedToken
            console.log(decodedToken)
            next();
        })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
//====================================================Authorization==================================================================//
const authorization = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        let decodedtoken = jwt.verify(token, "Blog@Management")

        let check = req.params.bookId
        if (check) {

            let checkUserId = await bookModel.find({ _id: check }).select({ userId: 1, _id: 0 })
            let userId = checkUserId.map(x => x.userId)
            let id = decodedtoken.userId
            if (id != userId) return res.status(403).send({ status: false, msg: "You are not authorised to perform this task" })
        }
        else {
            check = req.body.userId
            let id = decodedtoken.userId
            console.log(check)

            if (id != check) return res.status(403).send({ status: false, msg: 'You are not authorised to perform this task' })
        }
        next();
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}
module.exports={authenticate,authorization}

