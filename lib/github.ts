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

    // Find the featured project (first in PRIORITY_REPOS)
    const featuredRepoName = PRIORITY_REPOS[0]; // 'gettree'
    const featuredRepo = repos.find(
      (repo) => !repo.fork && repo.name === featuredRepoName
    );

    if (!featuredRepo) {
      return [];
    }

    // Enhance with banner URL
    const bannerUrl = await checkBannerExists(
      featuredRepo.full_name,
      featuredRepo.default_branch
    );

    const enhancedRepo: EnhancedRepo = {
      ...featuredRepo,
      bannerUrl,
      priority: true,
    };

    return [enhancedRepo];
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
  // Generate consistent neutral gradient based on repo name
  const hash = seed.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const colors = [
    'from-slate-700 to-slate-800',
    'from-slate-600 to-slate-700',
    'from-slate-800 to-slate-900',
    'from-slate-700 to-slate-900',
    'from-slate-600 to-slate-800',
    'from-slate-800 to-slate-700',
  ];
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
