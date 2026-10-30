const nav = document.getElementById("mainNav");
const menuToggle = document.getElementById("menuToggle");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const output = document.getElementById("terminalOutput");
const terminalForm = document.getElementById("terminalForm");
const terminalInput = document.getElementById("terminalInput");
const terminalCommands = {
  help: "Available commands: about, skills, experience, projects, education, github, contact, clear.",
  about: "Abhishek Sharma — independent software developer focused on Android, Linux, open source and practical automation.",
  skills: "C++, Kotlin, JavaScript, HTML, CSS, Android SDK, Jetpack Compose, XML, Git, GitHub, Gradle, Linux, Ubuntu, Debian, Termux and Firebase.",
  experience: "Current: Customer Care Executive, Dr ITM / Myntra Chat. Previous: RTA, Myntra Image Validation, Electrician, Paytm Customer Care, CNC Operator and Customer Sales Executive.",
  projects: "Myntra Chat Helper Extension (actively used), REX Player / MAX-PLAYER (in development), Matsya OS (under active construction).",
  education: "B.Tech CSE at ICFAI University, Jaipur — discontinued after 5th semester. RBSE 12th PCM: 69%. RBSE 10th: 88.50%.",
  github: "GitHub: https://github.com/Nithinxharma",
  contact: "Email: nithinxharma@gmail.com | LinkedIn: linkedin.com/in/abhishek-sharma-a057a1322/"
};
function addTerminalLine(command, result) {
  const line = document.createElement("p");
  line.innerHTML = `<span class="prompt">abhishek@portfolio:~$</span> <span class="typed"></span>`;
  line.querySelector(".typed").textContent = command;
  output.appendChild(line);
  const response = document.createElement("p");
  response.className = "terminal-muted";
  response.textContent = result;
  output.appendChild(response);
  output.scrollTop = output.scrollHeight;
}
function runCommand(raw) {
  const command = raw.trim().toLowerCase();
  if (!command) return;
  if (command === "clear") { output.innerHTML = ""; return; }
  addTerminalLine(command, terminalCommands[command] || `Command not found: ${command}. Type "help" to see available commands.`);
}
terminalForm?.addEventListener("submit", e => {
  e.preventDefault();
  runCommand(terminalInput.value);
  terminalInput.value = "";
});
document.querySelectorAll("[data-command]").forEach(button => button.addEventListener("click", () => runCommand(button.dataset.command)));
document.getElementById("terminalClear")?.addEventListener("click", () => output.innerHTML = "");
// Initial command result
runCommand("help");

// Public GitHub profile integration. No token is embedded; unauthenticated API rate limits apply.
async function loadGitHub() {
  const status = document.getElementById("githubStatus");
  const repoList = document.getElementById("repoList");
  try {
    const [profileResponse, reposResponse, eventsResponse] = await Promise.all([
      fetch("https://api.github.com/users/Nithinxharma"),
      fetch("https://api.github.com/users/Nithinxharma/repos?sort=updated&per_page=6"),
      fetch("https://api.github.com/users/Nithinxharma/events/public?per_page=10")
    ]);
    if (!profileResponse.ok || !reposResponse.ok) throw new Error("GitHub API is unavailable or rate-limited.");
    const profile = await profileResponse.json();
    const repos = await reposResponse.json();
    document.getElementById("githubName").textContent = profile.name || profile.login || "Nithinxharma";
    document.getElementById("githubBio").textContent = profile.bio || "Developer profile on GitHub.";
    document.getElementById("repoCount").textContent = profile.public_repos ?? "—";
    document.getElementById("followers").textContent = profile.followers ?? "—";
    document.getElementById("following").textContent = profile.following ?? "—";
    const avatar = document.getElementById("githubAvatar");
    if (profile.avatar_url) {
      const img = document.createElement("img");
      img.src = profile.avatar_url;
      img.alt = "GitHub avatar";
      avatar.textContent = "";
      avatar.appendChild(img);
    }
    repoList.innerHTML = "";
    if (!Array.isArray(repos) || repos.length === 0) {
      repoList.innerHTML = '<p class="muted">No public repositories were returned by GitHub.</p>';
    } else {
      repos.slice(0, 6).forEach(repo => {
        const item = document.createElement("article");
        item.className = "repo-item";
        const link = document.createElement("a");
        link.href = repo.html_url;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = repo.name;
        const description = document.createElement("p");
        description.textContent = repo.description || "No public description provided.";
        const meta = document.createElement("div");
        meta.className = "repo-meta";
        meta.textContent = `${repo.language || "LANGUAGE N/A"}  ·  ★ ${repo.stargazers_count}  · ⑂ ${repo.forks_count}`;
        item.append(link, description, meta);
        repoList.appendChild(item);
      });
    }
    if (eventsResponse.ok) {
      const events = await eventsResponse.json();
      const event = Array.isArray(events) ? events.find(e => ["PushEvent","CreateEvent","PullRequestEvent","IssuesEvent"].includes(e.type)) : null;
      if (event) {
        const action = event.type.replace("Event", "");
        document.getElementById("activityText").textContent = `Latest surfaced public activity: ${action} on ${event.repo?.name || "a repository"}.`;
      } else {
        document.getElementById("activityText").textContent = "No recent public activity was returned by GitHub.";
      }
    }
    status.textContent = "LIVE PUBLIC DATA";
  } catch (error) {
    status.textContent = "API UNAVAILABLE";
    repoList.innerHTML = '<p class="muted">GitHub data could not be loaded right now. Visit the public profile directly: <a href="https://github.com/Nithinxharma" target="_blank" rel="noopener">github.com/Nithinxharma</a>.</p>';
    document.getElementById("githubBio").textContent = "Live profile details load when the GitHub API is available.";
    document.getElementById("activityText").textContent = "GitHub public activity could not be fetched. This section will retry on the next page load.";
  }
}
loadGitHub();
