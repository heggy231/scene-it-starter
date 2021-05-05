const fetchData = url => {
  axios.get(url)
  .then(response => renderCard(response.data));
};

const fallBackImg = imageURL => {
  // imageURL.onload = () => {
  //   container.appendChild(image)
  // }
  
  // imageURL.onerror = () => {
  //   container.appendChild(placeholder)
  // }

  window.addEventListener("error", e => {return e;}, true)

  if (!imageURL) {
    return './no_image.png'
  } else if (
    imageURL &&
    window.addEventListener("error", e => {return e;}, true) &&
    (e.type === "error" && e.target === img)){
    return './no_image.png'
  }
}

const renderCard = data => {
  const cards = document.getElementById('cards');

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  // https://medium.com/javascript-scene/nested-ternaries-are-great-361bddd0f340
  const someArr = data.map((item, index) => {
    const card = document.createElement('div'); // <div >
    const img = document.createElement('img'); // <img src="imgurl" clss> <=== object not a string
    img.src = item.imageURL;
    img.setAttribute('class', 'card-img-top');
    console.log('img: ', img);
    card.innerHTML = `
      <div class="movie">
          <div class="card" style="width: 18rem;">
            <div id="image-now-${index}">
            </div>
            <div class="card-body">
                <span class="badge badge-secondary">${item.date}</span>
                <h5 class="card-title">${item.title}</h5>
                <button class="btn btn-primary add-movie" onclick="saveToWatchlist('tt0468569')"></button>
            </div>
          </div>
      </div>
    `;
    cards.appendChild(card);
    const imagNow = document.getElementById(`image-now-${index}`);
    img.onerror = () => {
      img.src = './no_image.png';
      imagNow.appendChild(img);
    }
    img.onload = () => {
      imagNow.appendChild(img);
    }
    console.log('card: ', card);
  });
};

const button = document.getElementById("button");
button.addEventListener('click', function() {
  fetchData("./mock/data.json");
});

