
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav) {
  burger.addEventListener('click', () => nav.classList.toggle('open'));
}

async function loadNews() {
  try {
    const res = await fetch('data/news.json', {cache:'no-store'});
    const items = await res.json();
    const grid = document.getElementById('news-grid');
    if (!grid) return;

    grid.innerHTML = items.map(item => `
      <article class="card">
        ${item.image ? `<img src="${item.image}" alt="${item.title}">` : ''}
        <div class="body">
          <span class="tag">${item.tag||'Análisis'}</span>
          <h3>${item.title}</h3>
          <p>${item.summary||''}</p>
        </div>
        <div class="meta">
          <span>${item.author||'LAT Desk'}</span>
          <time datetime="${item.date}">${new Date(item.date).toLocaleDateString()}</time>
        </div>
      </article>
    `).join('');
  } catch (e) { console.error(e); }
}
loadNews();
