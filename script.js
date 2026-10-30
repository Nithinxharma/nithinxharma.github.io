const nav = document.getElementById('mainNav');
const menuToggle = document.getElementById('menuToggle');
const navLinks = [...(nav?.querySelectorAll('a[href^="#"]') || [])];
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navLinks.forEach(link => link.addEventListener('click', () => {
  nav?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
}));
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const progress = document.getElementById('scrollProgress');
const updateProgress = () => {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress, { passive: true });
updateProgress();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
} else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

// Keep the navigation oriented to the chapter currently on screen.
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-28% 0px -62% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}

// Public GitHub data only. No token or private repository access is used.
async function loadGitHub() {
  const status = document.getElementById('githubStatus');
  const repoList = document.getElementById('repoList');
  if (!status || !repoList) return;
  try {
    const [profileResponse, reposResponse, eventsResponse] = await Promise.all([
      fetch('https://api.github.com/users/Nithinxharma'),
      fetch('https://api.github.com/users/Nithinxharma/repos?sort=updated&per_page=6'),
      fetch('https://api.github.com/users/Nithinxharma/events/public?per_page=10')
    ]);
    if (!profileResponse.ok || !reposResponse.ok) throw new Error('GitHub API unavailable or rate limited');
    const profile = await profileResponse.json();
    const repos = await reposResponse.json();
    const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
    setText('githubName', profile.name || profile.login || 'Nithinxharma');
    setText('githubBio', profile.bio || 'Public developer profile on GitHub.');
    setText('repoCount', profile.public_repos ?? '—');
    setText('followers', profile.followers ?? '—');
    setText('following', profile.following ?? '—');
    if (profile.avatar_url) {
      const img = document.createElement('img'); img.src = profile.avatar_url; img.alt = 'GitHub avatar';
      const avatar = document.getElementById('githubAvatar'); avatar?.replaceChildren(img);
    }
    repoList.replaceChildren();
    if (!Array.isArray(repos) || !repos.length) {
      const p = document.createElement('p'); p.textContent = 'No public repositories were returned by GitHub.'; repoList.append(p);
    } else repos.slice(0, 6).forEach(repo => {
      const item = document.createElement('article'); item.className = 'repo-item';
      const link = document.createElement('a'); link.href = repo.html_url; link.target = '_blank'; link.rel = 'noopener'; link.textContent = repo.name;
      const desc = document.createElement('p'); desc.textContent = repo.description || 'No public description provided.';
      const meta = document.createElement('div'); meta.className = 'repo-meta'; meta.textContent = `${repo.language || 'LANGUAGE N/A'} · ★ ${repo.stargazers_count} · forks ${repo.forks_count}`;
      item.append(link, desc, meta); repoList.append(item);
    });
    if (eventsResponse.ok) {
      const events = await eventsResponse.json();
      const event = Array.isArray(events) ? events.find(e => ['PushEvent','CreateEvent','PullRequestEvent','IssuesEvent'].includes(e.type)) : null;
      setText('activityText', event ? `Latest surfaced public activity: ${event.type.replace('Event','')} on ${event.repo?.name || 'a repository'}.` : 'No recent public activity was returned by GitHub.');
    }
    status.textContent = 'LIVE PUBLIC DATA';
  } catch (error) {
    status.textContent = 'API UNAVAILABLE';
    repoList.replaceChildren();
    const p = document.createElement('p'); p.textContent = 'GitHub data could not be loaded right now. Visit github.com/Nithinxharma directly.'; repoList.append(p);
    const bio = document.getElementById('githubBio'); if (bio) bio.textContent = 'Live profile details load when the GitHub API is available.';
    const activity = document.getElementById('activityText'); if (activity) activity.textContent = 'Public activity could not be fetched. The page will try again on the next visit.';
  }
}
loadGitHub();
