import { redirect } from 'next/navigation';
import '../../app/globals.css';

export default async function CallbackPage({searchParams,}:{searchParams:{ code?: string | undefined};}){
  const params = await searchParams;
  const code = params.code;

  if (!code){
    redirect('/login');
  }
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code,
      redirect_uri: process.env.OAUTH_REDIRECT_URI,
    }),
  });

  const tokenData = await tokenRes.json();
  const userRes= await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });
  const user= await userRes.json();
  return (
    <div className="container">
      <div className="card">
        <h1>User Info</h1>
        <img src={user.avatar_url} alt="Avatar" className="avatar"/>
        <p><strong>Username:</strong> {user.login}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email ?? 'Not available'}</p>
      </div>
    </div>
  );
}
