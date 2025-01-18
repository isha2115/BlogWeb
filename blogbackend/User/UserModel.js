const { default: mongoose } = require("mongoose");

class UserModel {
    constructor(){
        this.schema = new mongoose.Schema({
            name:{type:String,required:true},
            email:{type:String,require:true},
            password:{type:String,required:true}
        })
    }
}
const user = new UserModel()
const userModel = mongoose.model("tbl_user",user.schema)
module.exports = userModel