const users = [
    {
        id: 1,
        name: "Viktor",
        email: "viktor@gmail.com"
    },
    {
        id: 2,
        name: "Yurii",
        email: "yurii@gmail.com"
    },
    {
        id: 3,
        name: "Stas",
        email: "stas@gmail.com"
    },
    {
        id: 4,
        name: "Ostap",
        email: "ostap@gmail.com"
    },
    
]

function findUser(id){
	let err = null;
	if (!id){
		err = new Error("check id");
	}

	let index;
	const user = users.find(function(el, ind){
		if (el.id === id){
			index = ind;
			return true;
		} else {
			return false;
		}
	});

    if(!user){
        err = new Error('check user');
    }

	return {user, index, err};
}


module.exports = {
    getAllUsers: function(cb){
        cb(null,users)
    },

    getOneUser: function(id,cb){
        id = Number(id)
        const {err, user} = findUser(id)
        console.log(user)
        cb(err,user)
    },

    addUser: function(obj,cb){
        obj.id = Number(obj.id);
        let ifExist = false;
        console.log(isNaN(obj.id) )
        if(isNaN(obj.id)){
            cb(new Error('user id must be a number'));
          
        } else {
             users.push(obj);
             cb(null,"New user created")
        }
        
    },

   updateUser: function(id,user,cb){
        id = Number(id)
        const {err, index} = findUser(id);
     	users[index] = Object.assign(users[index], user);
        users[index].id = Number(users[index].id)
		cb(err);
    },

    deleteUser: function(id,cb){
        id = Number(id)
        const {err,index} = findUser(id)
        if(!err){
           users.splice(index,1)
        }
        cb(err)
    },

    chatWith: function(arr,cb){
       let filteredUsers = arr.map(function(el){
            return  users.find(function(e){
                return e.id === el
            })
        })
        cb(null,filteredUsers)
        }

}