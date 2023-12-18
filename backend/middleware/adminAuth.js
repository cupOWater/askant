const verifyAdmin = (req, res, next) => {
    const user = req.user;
    if(user){
        if(user.type === "admin"){
            return next();
        }
    }
    return res.status(401).send("Unauthorized")
}

module.exports = verifyAdmin;