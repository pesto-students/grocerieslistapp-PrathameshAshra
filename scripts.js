const MIN_VALUE = 3
const registerUser = () =>{
//Check for Duplicate User
// Validate number of user, if More than 3 than slice 
//Insert in Array
let ListOfUser = getUserList()
let userModel =getRegisteredUserValue()

let isDuplicate = checkDuplicateUser(userModel.username)
if(isDuplicate){
     alert("Please try with Different Name as it already Exists")
     return 
}else{
    let isValidUserName = checkInputLength(userModel.username.length,MIN_VALUE)
if(!isValidUserName){
    return alert("Min value should be more than 3 chars")
}
let isValidPassword = checkInputLength(userModel.password.length,MIN_VALUE)
if(!isValidPassword){
    return alert("Min value should be more than 3 chars")
}
    if(ListOfUser.length > 2){
        
        ListOfUser.shift()
        removeUserDataFromEnds(false,true)
    }

    addUserToUserList(userModel)
    validateUserPassword(userModel)
}
return
}


const validateUserPassword = (userModel)=>{
//Load UserModel
//Check Values inside Model
//checkloggedinUser and update
//change view 
let isValidUser = false
if(userModel){
}else{
    userModel = getValidationUserValue()    
}
userList = getUserList()

userList.forEach(user => {
    if(user.username === userModel.username && user.password === userModel.password){
        updateloggedInUser(userModel.username)
        isValidUser = true
    }else{
    }
    
});
if(!isValidUser){
    alert("Invalid Username or Password")
}else{
    alert("Welcome Back ")
    toggleToGroceryViewUI(true)
    renderTemplate(getUserByUsername(userModel.username))
}
console.log()
}
const toggleToGroceryViewUI =(switchToGroceryView) => {
    if(switchToGroceryView){
        document.getElementById("loginView").style.display = "none";
        document.getElementById("groceryView").style.display = "block";
    }else{
        document.getElementById("loginView").style.display = "block";
        document.getElementById("groceryView").style.display = "none";
    }
    
}
const getUserList = () =>{
    return  JSON.parse(localStorage.getItem('userItems')) || [];
}

const addUserToUserList = (userModel)=>{
   let oldUserList =  getUserList()
   console.log(userModel,"add")
   oldUserList.push(userModel)
   localStorage.setItem('userItems',JSON.stringify(oldUserList))
   return oldUserList
}
const updateloggedInUser = (username) =>{
    localStorage.removeItem('loggedInBy')
    localStorage.setItem('loggedInBy',JSON.stringify(username))

}
const updateUser = (userModel) =>{
   let oldData=  getUserList()
   oldData.forEach((element)=>{
       if(element.username === userModel.username){
        element.item = userModel.item
    }
   })
    localStorage.removeItem('userItems')
    localStorage.setItem('userItems',JSON.stringify(oldData))

}
const checkDuplicateUser =  (username) =>{
    let isDuplicate = false
    let ListOfUser = getUserList()
    ListOfUser.forEach( user => {
        if(user.username ===username){
            isDuplicate = true
        }
    });
    console.log(isDuplicate)
    return isDuplicate
} 
const loggedInUser = ()=>{
    return JSON.parse(localStorage.getItem('loggedInBy')) || "";
}
const removeUserDataFromEnds = (end,start) =>{
if(end === true){
let oldUserList = JSON.parse(localStorage.getItem('userItems')) || [];
oldUserList.pop()
localStorage.setItem('userItems',JSON.stringify(oldUserList))

}else if (start===true){
    let oldUserList = JSON.parse(localStorage.getItem('userItems')) || [];
    oldUserList.shift()
    localStorage.setItem('userItems',JSON.stringify(oldUserList))}
}
const getRegisteredUserValue =()=> {
    userModel = {
        "username":document.getElementById("register_username").value,
        "password":document.getElementById("register_password").value,
        "item":[]
    }
    return  userModel
}
const getValidationUserValue =()=> {
    userModel = {
        "username":document.getElementById("validation_username").value,
        "password":document.getElementById("validation_Password").value,
        
    }
    return  userModel
}
const getUserCartInput =()=> {
    return  document.getElementById("groceryContainer").value;
}
const addToCart = ()=>{
    // get value of Input
    // validate if loggedin User
    // get all user data to loop over and find Exisiting Records
    //check duplicate items, 
    // push
    // reflect in html
    let grocery = document.getElementById("addGrocery").value;
    let allUserData = getUserList()
    let username = loggedInUser()
    allUserData.forEach(user => {
        if(username === user.username){
            console.log(user,"LoggedIN User")
            if(user.item.length > 4){
                alert("Can't Add More Item, Delete Some to add More")
            }else{
                let isDuplicateItem = duplicateCartItem(grocery,username)
                if(!isDuplicateItem){
                    let isValidInput = checkInputLength(grocery.length,3)
                    if(!isValidInput){
                        return alert("Min value should be more than 3 chars")
                    }
                    user.item.push(grocery)
                    localStorage.setItem('userItems',JSON.stringify(allUserData))
                    let userModel = getUserByUsername(username)
                    renderTemplate(userModel)
                }else{
                    alert("Duplicate Entry")
                }


            }

        }
    });
}
const duplicateCartItem = (item,username)=>{
    let isDuplicate = false
    let userModel = getUserByUsername(username);
    userModel.item.forEach(element => {
        if(element === item){
            isDuplicate = true;
        }
    });
    console.log(isDuplicate)
    return isDuplicate
}
const getUserByUsername = (username)=>{
    let UserModel={};
    let ListOfUser = getUserList()
    ListOfUser.forEach( user => {
        if(user.username ===username){
            UserModel = user
        }
    });
    return UserModel
}
const deleteGroceryByUserName = (userModel,name)=>{
let temp = []
userModel.item.forEach(element => {
    if(element!= name){
        temp.push(element)
    }

}); 
userModel.item = temp
console.log(userModel,"UserModel After Delete")
updateUser(userModel)
renderTemplate(userModel)
}
const editFromCart = (user,element)=>{
    console.log(user,element,"EDIUT")

// Remove HTML ,show Input
//Copy from input to server
//render html
let temp = []
let newItem = prompt("Please enter new  name:", );
if (newItem == null || newItem == "") {
  return alert("No Value Selected")
} else {
    let isDuplicate = duplicateCartItem(newItem,user.username)
    console.log(isDuplicate)
    if(isDuplicate){
        return  alert("Duplicate Item Conflict, try new item")
    }
    let isValidInput = checkInputLength(newItem.length,3)
    if(!isValidInput){
        return alert("Min value should be more than 3 chars")
    }
  user.item.forEach(exisitingItem=>{
      if(exisitingItem !=element){
          temp.push(exisitingItem)
      }else{
          temp.push(newItem)
      }
  })
  user.item = temp;
  updateUser(user)
  renderTemplate(user)
}

}
const renderTemplate = (user)=>{
    console.log(user,"RENDER USER")
    const myNode = document.getElementById("groceryContainer");
    myNode.innerHTML = ''
    user.item.forEach((element,index) => {

    let myBucket = user.item
     var uniqueRow = "groceryContainer"+element
    var htmlHolder = document.createElement("div");
    htmlHolder.setAttribute("id",uniqueRow)
    htmlHolder.setAttribute("class","groceryRow")

    var card = document.createElement("div");
    card.innerHTML = myBucket[index]
    var cancel  = document.createElement("button");
    cancel.innerHTML = "delete"
    cancel.setAttribute("id",element)
    cancel.setAttribute("class","btn btn-danger")
    card.setAttribute("id",element)
    cancel.onclick = function () {
        deleteGroceryByUserName(user,element)
    };
    var edit  = document.createElement("button");
    edit.innerHTML = "edit"
    edit.setAttribute("id",element+"edit")
    edit.setAttribute("id",element+'edit')
    edit.setAttribute("class","btn btn-warning")
    edit.onclick = function () {
        editFromCart(user,element)
    };
    document.getElementById("groceryContainer").appendChild(htmlHolder);   
    document.getElementById(uniqueRow).appendChild(card);   
    document.getElementById(uniqueRow).appendChild(cancel);   
    document.getElementById(uniqueRow).appendChild(edit  );   
});
}
const checkInputLength = (inputLength,minValue) =>{
    console.log(inputLength, minValue)
return inputLength> minValue
}


