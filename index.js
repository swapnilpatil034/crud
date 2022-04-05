const express = require('express');
require('./db/config');
const User = require('./db/User');

const app = express();
app.use(express.json());
// user registration
app.post("/register",async(req, resp)=>{
    let user = new User(req.body);
    let result = await user.save();
resp.send(result);
});
//get user database
app.get("/user",async (req,resp)=>{
    let user = await User.find();
    resp.send(user);
})
// update user name
app.put("/user/:id",async(req,resp)=>{
    let result = await User.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    )
    resp.send(result)
})
app.delete("/user/:id", async (req, resp) => {

    let result = await User.deleteOne({ _id: req.params.id });
    resp.send(result);
})
app.listen(6000);