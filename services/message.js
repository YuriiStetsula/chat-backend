const messages = [
    {
        id:1,
        body: "How are you?",
        senderId:1,
        receiverId:2
    },
    {
        id:2,
        body: "Everything ok, and you?",
        senderId:2,
        receiverId:1
    },
    {
        id:3,
        body: "Hi, can you help with node.js?",
        senderId:4,
        receiverId:3
    },
    {
        id:4,
        body: "Hi. Sure, ask your question",
        senderId:3,
        receiverId:4
    },
    {
        id:5,
        body: "Call me at 18:00",
        senderId:1,
        receiverId:4
    },
    {
        id:6,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", 
        senderId:2,
        receiverId:4
    },
    {
        id:7,
        body: "Ahahaha", 
        senderId:2,
        receiverId:4
    },
    {
        id:8,
        body: "qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores ", 
        senderId:2,
        receiverId:3
    },
]

function findMessage(id){
    let err = null
    let index;
    if (typeof id === "undefined"){
        err = new Error("id is undefined")
    }
    let message = messages.find(function(msg,ind){
            if(msg.id === id){
                index = ind
                return true
            }
        })

        if (typeof message ==="undefined"){
            err = new Error("message is undefined")
        }
    
    return {err,message,index}
}

module.exports = {
    getAllComents: function(cb){
        cb(null,messages)
    },

    getUserMessage: function(id,cb){
        id = Number(id)
        const {err,message} = findMessage(id)
        console.log(message)
        cb(err,message)
    },

    createMessage: function(message,cb){
        let err = null;
        if(typeof message === "undefined"){
            err = new Error("message is undefined")
        }else{
            message.id = Number(message.id)
            if(isNaN(message.id)){
              err = new Error("id must be a number")
            }else{
            message.senderId = Number(message.senderId)
            message.receiverId = Number(message.receiverId)
            messages.push(message)
            }
         
        }

        cb(err)
    },


    updateMessage: function(id,message,cb){
         id = Number(id)
         const {err,index} = findMessage(id)
         messages[index]  = Object.assign(messages[index],message)
         cb(err)
  },
    
   deleteMessage: function(id,cb){
       id = Number(id)
       let {err,index} = findMessage(id)
       messages.splice(index,1)
       cb(err)
   },

    getUsersChatWith: function(id,cb){
        let err = null;
        id = Number(id)
         let chatWith = (function(id){
            return messages.filter(function(el){
               return el.senderId === id
            })
         }(id))
          let newArr = [];
            chatWith.forEach(function(el){
            if(newArr.indexOf(el.receiverId) === -1) {
            newArr.push(el.receiverId)
        }
        })
        cb(err,newArr)
    }

}