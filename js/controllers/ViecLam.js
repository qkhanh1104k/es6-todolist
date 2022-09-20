let danhSachToDo = [];

document.querySelector("#addItem").onclick = () => {
    //lấy thông tin từ input
    let input = document.querySelector("#newTask").value;
    if (input) {
      danhSachToDo.unshift({
            name: input,
            status: false,
        });
        document.querySelector("#newTask").value = "";
        console.log(danhSachToDo);
        renderToDoList(danhSachToDo);
    }
    
};
function renderToDoList(arr) {
    let html = ``;
    arr.map((value, index) => {
        html += `
      <li>
            <span>${value.name}</span>
            <div class="buttons">
               <button class="remove" onclick="delListToDo('${value.name}')">
                  <i class="fa-solid fa-trash-can"></i>
               </button>
               <button class="complete" onclick="changeStatus(${index})">
                  <i class="fa-regular fa-circle-check"></i>
               </button>
            </div>
      </li>
      `;
    });
    document.querySelector("#todo").innerHTML = html;
}
let danhSachDone = [];
window.changeStatus = (index) =>{
   danhSachToDo[index]= {
      name:danhSachToDo[index].name,
      status:!danhSachToDo[index].status
   }
   
   let statusTrue = danhSachToDo.filter((toDo)=>toDo.status === true);
   // let statusTrue = danhSachToDo.reduce((mangTrue,trangThai,index)=>{
   //    if(trangThai.status ===true){
   //       mangTrue.push(trangThai)
   //    }
   //    return mangTrue;
   // })
   console.log(statusTrue)
   let input = statusTrue[0].name;
   danhSachDone.unshift({
      name: input,
      status: true,
   })

   
   console.log(danhSachDone)

   danhSachToDo.splice(index,1);
   renderToDoList(danhSachToDo);
   renderCompleted(danhSachDone);
}
function renderCompleted (arr){
   let html = ``;
   arr.map((value, index) => {
        html += `
      <li>
            <span>${value.name}</span>
            <div class="buttons">
               <button class="remove" onclick="delListCompleted('${value.name}')">
                  <i class="fa-solid fa-trash-can"></i>
               </button>
               <button class="complete" >
                  <i class="fa-regular fa-circle-check fas"></i>
               </button>
            </div>
      </li>
      `;
    });
    document.querySelector("#completed").innerHTML = html;
}

const buttonFilter = document.querySelectorAll("#two, #three")
for (const button of buttonFilter) {
  button.addEventListener('click', function() {
    danhSachToDo.reverse();
  console.log(danhSachToDo);
  renderToDoList(danhSachToDo);
  })
}
window.delListToDo= (index)=>{
   if(confirm("Bạn có thực sự muốn xóa nó không?")){
      danhSachToDo = danhSachToDo.filter((toDo)=>toDo.name!== index);
      renderToDoList(danhSachToDo);
   }
}
window.delListCompleted= (index)=>{
   if(confirm("Bạn có thực sự muốn xóa nó không?")){
      danhSachDone = danhSachDone.filter((toDo)=>toDo.name!== index);
      renderCompleted(danhSachDone);
   }
}