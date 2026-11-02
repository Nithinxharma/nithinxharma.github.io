(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const nav = $('#mainNav');
  const toggle = $('#menuToggle');
  toggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open') ?? false;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  // Quiet scroll progress; no parallax, pinned scenes, copied demo code or external libraries.
  const progress = $('#scrollProgress');
  let ticking = false;
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateProgress); ticking = true; }
  }, { passive: true });
  updateProgress();

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('visible'));

  // GitHub public API integration; gracefully degrades when offline or rate-limited.
  async function loadGitHub() {
    const status = $('#githubStatus'), repoList = $('#repoList');
    if (!status || !repoList) return;
    try {
      const [profileRes, reposRes, eventsRes] = await Promise.all([
        fetch('https://api.github.com/users/Nithinxharma'),
        fetch('https://api.github.com/users/Nithinxharma/repos?sort=updated&per_page=6'),
        fetch('https://api.github.com/users/Nithinxharma/events/public?per_page=10')
      ]);
      if (!profileRes.ok || !reposRes.ok) throw new Error('GitHub API unavailable');
      const profile = await profileRes.json();
      const repos = await reposRes.json();
      const name = $('#githubName'), bio = $('#githubBio');
      if (name) name.textContent = profile.name || profile.login || 'Nithinxharma';
      if (bio) bio.textContent = profile.bio || 'Developer profile on GitHub.';
      [['#repoCount', profile.public_repos], ['#followers', profile.followers], ['#following', profile.following]].forEach(([sel, value]) => { const el = $(sel); if (el) el.textContent = value ?? '—'; });
      const avatar = $('#githubAvatar');
      if (avatar && profile.avatar_url) { const img = document.createElement('img'); img.src = profile.avatar_url; img.alt = 'GitHub profile avatar'; avatar.replaceChildren(img); }
      repoList.replaceChildren();
      if (!Array.isArray(repos) || repos.length === 0) {
        const empty = document.createElement('p'); empty.className = 'muted'; empty.textContent = 'No public repositories were returned.'; repoList.append(empty);
      } else repos.slice(0, 6).forEach(repo => {
        const item = document.createElement('article'); item.className = 'repo-item';
        const link = document.createElement('a'); link.href = repo.html_url; link.target = '_blank'; link.rel = 'noopener'; link.textContent = repo.name;
        const description = document.createElement('p'); description.textContent = repo.description || 'No public description provided.';
        const meta = document.createElement('div'); meta.className = 'repo-meta'; meta.textContent = `${repo.language || 'Language n/a'} · ★ ${repo.stargazers_count} · Forks ${repo.forks_count}`;
        item.append(link, description, meta); repoList.append(item);
      });
      if (eventsRes.ok) {
        const events = await eventsRes.json();
        const event = Array.isArray(events) ? events.find(e => ['PushEvent','CreateEvent','PullRequestEvent','IssuesEvent'].includes(e.type)) : null;
        const activity = $('#activityText');
        if (activity) activity.textContent = event ? `Latest surfaced public activity: ${event.type.replace('Event','')} on ${event.repo?.name || 'a repository'}.` : 'No recent public activity was returned by GitHub.';
      }
      status.textContent = 'PUBLIC DATA';
    } catch (_) {
      status.textContent = 'UNAVAILABLE';
      repoList.replaceChildren();
      const message = document.createElement('p'); message.className = 'muted'; message.textContent = 'GitHub data is unavailable right now. Visit the public profile directly.';
      const link = document.createElement('a'); link.href = 'https://github.com/Nithinxharma'; link.target = '_blank'; link.rel = 'noopener'; link.textContent = ' github.com/Nithinxharma';
      message.append(link); repoList.append(message);
      const bio = $('#githubBio'); if (bio) bio.textContent = 'Live profile details load when the GitHub API is available.';
      const activity = $('#activityText'); if (activity) activity.textContent = 'Public activity could not be fetched. Try again later.';
    }
  }
  loadGitHub();
})();
