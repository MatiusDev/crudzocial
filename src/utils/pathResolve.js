export function getBasePath() {
    const isGitHubPages = window.location.hostname.endsWith('github.io');

    if (isGitHubPages) {
        const repoName = window.location.pathname.split('/')[1];
        return repoName ? `/${repoName}` : '';
    }

    return '';
}