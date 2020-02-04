const userss = document.querySelector('.allusers');

exports.renderusers = users => {
  let a = 0;
  let prev;
  users.forEach(element => {
    if (a % 2 != 0) {
      const markup = `
   <div class="card allusersss"  style="width: 40rem;">
   
   <img src="/images/logim-pic.png" style="height:10rem;width:10rem" class="card-img-top c1" alt="..." />
   <div class="card-body">
     <h5 class="card-title c1">User's Bio</h5>
     <p class="card-text c1">
       Some quick example text to build on the card title and make up the
       bulk of the card's content.
     </p>
   </div>
   <ul class="list-group list-group-flush">
     <li class="list-group-item b1" >${element.name}</li>
     <li class="list-group-item b1">${element.email}</li>
     <li class="list-group-item b1">${element.usertype}</li>
   </ul>
   <div class="card-body">
   <a href="#sendmsg" class="btn button-success c1">send message</a>
     <a href="#" class="card-link c1">view user's profile</a>
   </div>
  
 </div>
 <div class="card allusersss"  style="width: 40rem;">
   
   <img src="/images/logim-pic.png" style="height:10rem;width:10rem" class="card-img-top c1" alt="..." />
   <div class="card-body">
     <h5 class="card-title c1">User's Bio</h5>
     <p class="card-text c1">
       Some quick example text to build on the card title and make up the
       bulk of the card's content.
     </p>
   </div>
   <ul class="list-group list-group-flush">
     <li class="list-group-item b1" >${prev.name}</li>
     <li class="list-group-item b1">${prev.email}</li>
     <li class="list-group-item b1">${prev.usertype}</li>
   </ul>
   <div class="card-body">
   <a href="#sendmsg" class="btn button-success c1">send message</a>
   <a href="#" class="card-link c1">view user's profile</a>
   </div>
   
 </div>

 <div class="clearfix"></div>
    `;
      userss.insertAdjacentHTML('beforeend', markup);
    } else {
      prev = element;
    }

    a = a + 1;
  });
};
