





function getObjectClass(obj){
   if (typeof obj != "object" || obj === null) return false;
   else return /(\w+)\(/.exec(obj.constructor.toString())[1];
};


