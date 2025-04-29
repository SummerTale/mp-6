export function buildGitHubOAuthUrl() {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI!,
      response_type: 'code',
      scope: 'read:user user:email',
    });
    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }
  