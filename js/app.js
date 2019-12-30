//Document Elements
const preloadScreen = document.querySelector('#preload')
const timeText = document.querySelector('#timeText')
const newsfeed = document.querySelector('#newsfeed');
const sourceSelector = document.querySelector('#sourceSelector')

//API Keys
const news_apikey = 'cdb8297c15424cee91218df37c49f5e0'
const weather_apikey = 'd904d5f1a60dbb4abd1ff88725d805b5'

//Defaults
const defaultSource = 'reddit-r-all'

$(document).ready(function(){

  //Clock
  var d = new Date();
  var time = `${d.getHours()}:${d.getMinutes()}`
  timeText.innerHTML = time
  timeText.style.opacity = "100%"
  setInterval(function () {
    var d = new Date();
    var time = `${d.getHours()}:${d.getMinutes()}`
    timeText.innerHTML = time
  }, 1000)
  $(preloadScreen).click(function() {
    $(preloadScreen).fadeOut(2000);
  })

  //News Update
  news();
})

//News Update
async function news() {
  updateNews();
  await updateSources();

  sourceSelector.value = defaultSource
  sourceSelector.addEventListener('change', e => {updateNews(e.target.value)})
}

async function updateSources() {
  const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${news_apikey}`)
  const json = await res.json();
  sourceSelector.innerHTML = json.sources.map(src => `<option value="${src.id}">${src.name}</option>`).join('\n')
}

async function updateNews(source = defaultSource) {
  const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${news_apikey}`);
  const json = await res.json();

  newsfeed.innerHTML = json.articles.map(createArticle).join('\n')
}

function createArticle(article) {
  return `
      <div class="article">
        <a href="${article.url}">
          <h2 class="article-title">${article.title}</h2>
          <img src="${article.urlToImage}" class="article-img">
          <p class="article-desc">${article.description}</p>
        </a>
      </div>
      <hr>
  `;
}

//Weather Update
