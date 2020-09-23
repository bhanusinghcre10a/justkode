const usr = document.querySelector('.profile');

exports.renderuser = user => {
  const markup = `
      <div class="card mb-3" style="max-width: 540px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="/images/logim-pic.png" class="card-img" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body ">
            <h5 class="card-title t1">${user.name}</h5>
            <p class="card-text t1">${user.about}</p>
            <p class="card-text t1">${user.email}</p>
            <p class="card-text t1">${user.branch}</p>
          </div>
        </div>
      </div>
    
    </div>
    `;
  usr.insertAdjacentHTML('beforeend', markup);
};
