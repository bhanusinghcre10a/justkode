const blogss = document.querySelector('.head1');

const renderblogs = (bl1, bl2, bl3) => {
  const markup = `
    <div class="row">
    <div class="col-1-of-3">
            <div class="card">
                <div class="card__side card__side-front card__side-front-1">
                    <div class="card__heading">
                        <span class="card__heading-span card__heading-span-1">
                        ${bl1.data.title}
                        </span>
                    </div>
                <div class="card__details">
                    <ul>
                        <li>${bl1.data.type}</li>
                        <li>${bl1.data.by}</li>
                    </ul>
                </div>
            </div>
                <div class="card__side card__side-back card__side-back-1">
                    <div class="card__cta">
                        <div class="card__price-box">
                            <a href="${bl1.data.url}" class="btn btn--white">see full article</a>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div class="col-1-of-3">
            <div class="card">
                <div class="card__side card__side-front card__side-front-2">
                    <div class="card__heading">
                        <span class="card__heading-span card__heading-span-1">
                        ${bl2.data.title}
                        </span>
                    </div>
                <div class="card__details">
                    <ul>
                        <li>${bl2.data.type}</li>
                        <li>${bl2.data.by}</li>
                    </ul>
                </div>
            </div>
                <div class="card__side card__side-back card__side-back-2">
                    <div class="card__cta">
                        <div class="card__price-box">
                            <a href="${bl2.data.url}" class="btn btn--white">see full article</a>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div class="col-1-of-3">
            <div class="card">
                <div class="card__side card__side-front card__side-front-3">
                    <div class="card__heading">
                        <span class="card__heading-span card__heading-span-1">
                        ${bl3.data.title}
                        </span>
                    </div>
                <div class="card__details">
                    <ul>
                        <li>${bl3.data.type}</li>
                        <li>${bl3.data.by}</li>
                    </ul>
                </div>
            </div>
                <div class="card__side card__side-back card__side-back-3">
                    <div class="card__cta">
                        <div class="card__price-box">
                            <a href="${bl3.data.url}" class="btn btn--white">see full article</a>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </div>
    `;
  blogss.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${
  type === 'prev' ? page - 1 : page + 1
}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${
              type === 'prev' ? 'left' : 'right'
            }"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  let button;
  if (page === 1 && pages > 1) {
    // Only button to go to next page
    button = createButton(page, 'next');
  } else if (page < pages) {
    // Both buttons
    button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
  } else if (page === pages && pages > 1) {
    // Only button to go to prev page
    button = createButton(page, 'prev');
  }

  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (blogs1, blogs2, blogs3) => {
  // render results of currente page

  renderblogs(blogs1, blogs2, blogs3);

  // render pagination buttons
  //renderButtons(page, recipes.length, resPerPage);
};
