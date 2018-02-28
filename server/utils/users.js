class Users{
    constructor(){
        this.users=[];
    }
    addUser(id,name,room){
        this.users.push( {id,name,room })
        return {id,name,room}
    }
    removeUser(id){
        var user = this.getUser(id);
        if(user){
            this.users =  this.users.filter( item=> item.id!=id )
        }
        return user
    }
    getUser(id){
        return this.users.filter( item=> item.id===id )[0]
    }
    getUserList(room){
        var users =  this.users.filter( item=> item.room===room )
        return users.map(  item=>  item.name )
    }
}

module.exports = {Users}