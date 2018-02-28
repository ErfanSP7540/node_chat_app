var isRealString = (input)=>{
    
    if( typeof(input)=='string'  && input.trim().length>0){
        
        return true;
    }else{
        return false;
    }    
}

module.exports= { isRealString }