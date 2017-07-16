let express = require("express"),
    router  = express.Router();
    messageAPI = require("../services/message");

router.get("/message",function(req,res){
    messageAPI.getAllComents(function(err,data){
        res.json(data)
    })
})

router.get("/message/:id",function(req,res){
  messageAPI.getUserMessage(req.params.id,function(err,data){
        if(err){
            console.log(err)
            res.end()
        }else{
            res.json(data)
        }
    })
})

router.post("/message",function(req,res){
    messageAPI.createMessage(req.body,function(err,data){
        if(err){
            console.log(err)
            res.status(400)
            res.end()
        }else(
            res.json(data)
        )
    })
})

router.put("/message/:id",function(req,res){
    messageAPI.updateMessage(req.params.id,req.body,function(err,data){
        if(err){
            console.log(err)
            res.status(400)
            res.end()
        }else{
            res.send(data)
        }
    })
})

router.delete("/message/:id",function(req,res){
    messageAPI.deleteMessage(req.params.id,function(err,data){
        if(err){
            console.log(err)
            res.status(400)
            res.end()
        }else{
            res.send("ok")
        }
    })
})

module.exports = router;