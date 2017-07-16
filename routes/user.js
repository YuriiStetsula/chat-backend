let express      = require("express");
let router       = express.Router();
const userAPI    = require("../services/user");
const messageAPI = require("../services/message");

router.get("/user",function(req,res){
     userAPI.getAllUsers(function(err,data){
        res.json(data)
    })
})

router.get("/user/:id",function(req,res){
     userAPI.getOneUser(req.params.id,function(err,data){
        if(!err){
            res.json(data)
        } 
        else{
            console.log(err)
            res.status(400)
            res.end()
        }
    })
})

router.get("/user/:id/chat-with",function(req,res){
     messageAPI.getUsersChatWith(req.params.id,function(err,data){
        if(err){
            console.log(err)
            res.status(400)
            res.end()
        }else{
            userAPI.chatWith(data,function(err,data){
                res.json(data)
            })
        }
    })
})

router.post("/user",function(req,res){
    userAPI.addUser(req.body,function(err,data){
      if(err){
          console.log(err)
          res.status(400)
          res.end()
      }else{
          res.send(data);
      }
       
    }) 

})

router.put("/user/:id",function(req,res){
    const obj = req.body
    userAPI.updateUser(req.params.id,obj,function(err,data){
        if (!err){
			res.json(res.data);
		} else {
			res.status(400);
			res.end();
		}
    })
})

router.delete("/user/:id",function(req,res){
    userAPI.deleteUser(req.params.id,function(err,data){
        if(err){
            res.status(400)
            res.end()
        }else{
            res.json(data)
        }
    })
})

module.exports = router