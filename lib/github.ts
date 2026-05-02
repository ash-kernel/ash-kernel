import { GitHubRepo, EnhancedRepo, ProjectDetailData } from '@/types';

const GITHUB_USERNAME = 'ash-kernel';
const PRIORITY_REPOS = ['gettree', 'spicedeck', 'Zetonic', 'exitping'];

export async function fetchGitHubRepos(): Promise<EnhancedRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const repos: GitHubRepo[] = await response.json();

    // Filter out forks and enhance with banner URLs
    const enhancedRepos: EnhancedRepo[] = await Promise.all(
      repos
        .filter((repo) => !repo.fork)
        .map(async (repo) => {
          const priority = PRIORITY_REPOS.includes(repo.name);
          const bannerUrl = await checkBannerExists(repo.full_name, repo.default_branch);
          
          return {
            ...repo,
            bannerUrl,
            priority,
          };
        })
    );

    // Sort: priority repos first, then by stars, then by update date
    return enhancedRepos.sort((a, b) => {
      if (a.priority && !b.priority) return -1;
      if (!a.priority && b.priority) return 1;
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

async function checkBannerExists(fullName: string, branch: string): Promise<string | undefined> {
  const extensions = ['png', 'jpg', 'jpeg'];
  
  for (const ext of extensions) {
    const url = `https://raw.githubusercontent.com/${fullName}/${branch}/banner.${ext}`;
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return url;
      }
    } catch {
      // Continue to next extension
    }
  }
  
  return undefined;
}

export async function fetchProjectDetail(repoName: string): Promise<ProjectDetailData | null> {
  try {
    const [repoResponse, languagesResponse] = await Promise.all([
      fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`, {
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`, {
        next: { revalidate: 3600 },
      }),
    ]);

    if (!repoResponse.ok) {
      return null;
    }

    const repo: GitHubRepo = await repoResponse.json();
    const languages = languagesResponse.ok ? await languagesResponse.json() : {};

    // Try to fetch README
    let readme: string | undefined;
    try {
      const readmeResponse = await fetch(
        `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${repo.default_branch}/README.md`
      );
      if (readmeResponse.ok) {
        readme = await readmeResponse.text();
      }
    } catch {
      // README is optional
    }

    const bannerUrl = await checkBannerExists(repo.full_name, repo.default_branch);

    return {
      ...repo,
      bannerUrl,
      readme,
      languages,
      priority: PRIORITY_REPOS.includes(repo.name),
    };
  } catch (error) {
    console.error('Error fetching project detail:', error);
    return null;
  }
}

export function generateGradient(seed: string): string {
  // Generate consistent gradient based on repo name
  const hash = seed.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const colors = [
    'from-blue-600 to-cyan-600',
    'from-purple-600 to-pink-600',
    'from-emerald-600 to-teal-600',
    'from-orange-600 to-red-600',
    'from-indigo-600 to-purple-600',
    'from-cyan-600 to-blue-600',
  ];
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
