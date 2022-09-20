window.onload = function () {
   getToDoStorage("#todo", "unComplete", toDoList);
   getToDoStorage("#completed", "completed", completedList);
   styleCompleted();
   console.log(toDoList);
   console.log(completedList);
 };
 // arr default
 let toDoList = [];
 let completedList = [];
 
 // onclick event handler
 document.querySelector("#addItem").onclick = () => {
   let inputToDo = document.querySelector("#newTask");
   let id = Date.now() - setTimeout(() => {}, 0);
   if (!inputToDo.value) {
     alert("Ô thông tin không được để trống !!!");
     return;
   }
   toDoList.push({ name: inputToDo.value, id: id });
   inputToDo.value = "";
   console.log(toDoList);
   renderList("#todo", toDoList);
   saveToDoStorage(toDoList, "unComplete");
 };
 
 const buttonFilter = document.querySelectorAll("#two, #three")
 for (const button of buttonFilter) {
   button.addEventListener('click', function() {
     toDoList.reverse();
   console.log(toDoList);
   renderList("#todo", toDoList);
   })
 }
 
 // function libraries
 function renderList(toDoSelector, arr) {
   let result = "";
   for (let index = 0; index < arr.length; index++) {
     let conTroThis = arr[index];
     result += `<li id="${conTroThis.id}">
           <p>${conTroThis.name}</p>                 
           <div class="buttons">
           <button onclick="delList('${conTroThis.name}')"> 
           <i class="far fa-trash-alt"></i>
           </button>
           <button onclick="completeClick('${conTroThis.id}')">
           <i class="fas fa-check-circle"></i>
           </button>
           </div>
       </li> `;
   }
   document.querySelector(toDoSelector).innerHTML = result;
 }
 
 // function renderListCompleted(toDoSelector, arr) {
 //   let result = "";
 //   for (let index = 0; index < arr.length; index++) {
 //     let conTroThis = arr[index];
 //     result += `<li id="${conTroThis.id}">
 //           <p>${conTroThis.name}</p>                 
 //           <div class="buttons">
 //           <button onclick="delListCompleted('${conTroThis.id}')"> 
 //           <i class="far fa-trash-alt"></i>
 //           </button>
 //           <button>
 //           <i class="fas fa-check-circle"></i>
 //           </button>
 //           </div>
 //       </li> `;
 //   }
 //   document.querySelector(toDoSelector).innerHTML = result;
 // }
 
 function saveToDoStorage(arr, nameStorage) {
   localStorage.setItem(nameStorage, JSON.stringify(arr));
 }
 
 function getToDoStorage(toDoSelector, nameStorage, arr) {
   let ListJSON = localStorage.getItem(nameStorage);
   if (ListJSON === null) return;
   let ListLocal = JSON.parse(ListJSON);
   arr = mapdata(ListLocal);
   renderList(toDoSelector, arr);
 }
 
 function mapdata(arrListLocal) {
   let result = [];
   for(let todo of arrListLocal)
   {
     result.push(todo);
   }
   return result;
 }
 
 window.delList = (idClick) => {
   // Sử dụng arrow function để khỏi undefined
   if (confirm("Bạn có thực sự muốn xóa nó không?")) {
     toDoList = toDoList.filter((conTroThis) => conTroThis.name !== idClick);
     renderList("#todo", toDoList);
     saveToDoStorage(toDoList, "unComplete");
   }
 };
 
 // window.delListCompleted = (idClick) => {
 //   // Sử dụng arrow function để khỏi undefined
 //   if (confirm("Bạn có thực sự muốn xóa nó không?")) {
 //     completedList = completedList.filter((conTroThis) => conTroThis.id !== idClick);
 //     renderListCompleted("#completed", completedList);
 //     saveToDoStorage(completedList, "completed");
 //   }
 // };
 
 window.completeClick = (idclick) => {
   const UlNode = document.querySelector("ul.todo#completed");
   let LiNode = document.getElementById(idclick);
   renderListCompleted("#completed", completedList);
   UlNode.insertBefore(LiNode, UlNode.children[0]);
   let ListValue = document.querySelectorAll("#completed li p")[0].innerText;
   let id = Date.now() - setTimeout(() => {}, 0);
   completedList.push({ name: ListValue, id:id });
   saveToDoStorage(completedList, "completed");
   // delList(idclick); 
   styleCompleted()
   // location.reload();
 };
 
 function styleCompleted() {
   let myNodelist = document.querySelectorAll('#completed li button:nth-child(2)');
   if(myNodelist.length == 0){
     return;
   }
   for (let i = 0; i < myNodelist.length; i++) {
     myNodelist[i].className = 'complete';
   }
 }

 window.changeStatus=(index)=>{
   let statusId = toDoList.find((toDo)=>toDo.id ===index);
   let input = statusId[0].name;
   completedList.unshift({
      name:input,
      status:true,
   })
   completedList.splice(index,1);
   renderCompleted();
 }
function renderCompleted (){
   let html = ``;
   danhSachDone.map((value, index) => {
        html += `
      <li>
            <span>${value.name}</span>
            <div class="buttons">
               <button class="remove">
                  <i class="fa-solid fa-trash-can"></i>
               </button>
               <button class="complete">
                  <i class="fa-regular fa-circle-check fas"></i>
               </button>
            </div>
      </li>
      `;
    });
    document.querySelector("#completed").innerHTML = html;


}
