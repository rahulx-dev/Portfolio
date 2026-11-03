"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
}

const CACHE_KEY = "github_repos_cache";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function formatRelativeTime(dateString: string): string {
  const diff = Math.max(0, (Date.now() - new Date(dateString).getTime()) / 1000);
  const days = Math.floor(diff / 86400);

  if (days === 0) return "Updated today";
  if (days === 1) return "Updated yesterday";
  if (days < 30) return `Updated ${days} days ago`;

  const months = Math.floor(days / 30);
  if (months === 1) return "Updated 1 month ago";
  if (months < 12) return `Updated ${months} months ago`;

  const years = Math.floor(days / 365);
  return `Updated ${years} year${years > 1 ? "s" : ""} ago`;
}

export default function GitHubActivity() {
  const [repos, setRepos] = useState<Repo[] | null>(null);

  useEffect(() => {
    // Check localStorage cache first
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL && Array.isArray(data) && data.length > 0) {
          setRepos(data);
          return;
        }
      }
    } catch {
      // Ignore localStorage errors
    }

    // Fetch latest public repos
    fetch("https://api.github.com/users/rahulx-dev/repos?sort=pushed&per_page=100")
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then((data: Array<Repo & { fork: boolean }>) => {
        if (!Array.isArray(data)) return;
        const valid = data
          .filter((r) => !r.fork && r.name.toLowerCase() !== "rahulx-dev")
          .slice(0, 4)
          .map((r) => ({
            id: r.id,
            name: r.name,
            html_url: r.html_url,
            description: r.description,
            language: r.language,
            pushed_at: r.pushed_at,
          }));

        if (valid.length > 0) {
          setRepos(valid);
          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ timestamp: Date.now(), data: valid })
            );
          } catch {
            // Ignore quota errors
          }
        }
      })
      .catch(() => {
        // Silently ignore errors as requested
      });
  }, []);

  if (!repos || repos.length === 0) {
    return null;
  }

  return (
    <section className="py-24 sm:py-32 border-t border-[#262626] px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <div className="mb-6">
        <p className="font-mono-label text-xs sm:text-sm text-[#A3E635] tracking-widest mb-3">
          RECENTLY ON GITHUB
        </p>
        <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white tracking-tight leading-none uppercase">
          GITHUB
        </h2>
      </div>

      <div className="w-full h-px bg-[#262626] mb-12 sm:mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {repos.map((repo, index) => (
          <ScrollReveal key={repo.id} delay={index * 0.1}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group h-full bg-[#141414] border border-[#262626] hover:border-[#A3E635] transition-colors p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-[#A3E635] transition-colors">
                    {repo.name}
                  </h3>
                  <span className="font-mono-label text-xs text-[#737373] group-hover:text-white transition-colors">
                    ↗
                  </span>
                </div>
                <p className="font-body text-sm text-[#A3A3A3] mb-6 leading-relaxed">
                  {repo.description || "Public repository on GitHub."}
                </p>
              </div>

              <div className="pt-4 border-t border-[#262626] flex items-center justify-between font-mono-label text-xs text-[#737373]">
                <span>{repo.language || "Code"}</span>
                <span>{formatRelativeTime(repo.pushed_at)}</span>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
