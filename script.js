const toggleBtn = document.getElementById('toggleMode');
function setTheme(mode) {
  if(mode === 'light') {
    document.body.classList.add('light-mode');
    toggleBtn.innerText = '🌞';
    localStorage.setItem('theme','light');
  } else {
    document.body.classList.remove('light-mode');
    toggleBtn.innerText = '🌙';
    localStorage.setItem('theme','dark');
  }
}

if (toggleBtn){
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);
  toggleBtn.onclick = () => {
    setTheme(document.body.classList.contains('light-mode') ? 'dark' : 'light');
  };
}

const current = window.location.pathname.split('/').pop();
document.querySelectorAll('nav ul li a').forEach(link => {
  if(link.getAttribute('href') === current) link.classList.add('active');
});

const projectsSection = document.getElementById('projects-list');
if (projectsSection) {
  
  fetch('https://api.github.com/users/Mr-SK534/repos')
    .then(response => response.json())
    .then(repos => {
      projectsSection.innerHTML = "";
      repos.forEach(repo => {
        // skip forks/private for clean portfolio
        if(repo.fork || repo.private) return;
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <div class="project-title">${repo.name}</div>
          <div class="project-desc">${repo.description ? repo.description : ''}</div>
          <a href="${repo.html_url}" target="_blank">View on GitHub ↗</a>
        `;
        projectsSection.appendChild(card);
      });
      if (projectsSection.innerHTML.trim() === "") {
        projectsSection.innerHTML = "<p>No public repositories found.</p>";
      }
    })
    .catch(() => {
      projectsSection.innerHTML = "<p>Unable to load projects at the moment. Check your GitHub username or try again later.</p>";
    });
}

document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Message sent! Thank you for reaching out.');
  this.reset();
});

