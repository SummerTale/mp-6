'use client';
import '../../app/globals.css';

export default function LoginPage(){
  const handleLogin = ()=> {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI!,
      response_type: 'code',
      scope: 'read:user user:email',
    });
    window.location.href= `https://github.com/login/oauth/authorize?${params.toString()}`;
  };
  return(
    <div className="container">
      <div className="card">
        <h1>Sign in to Continue</h1>
        <p>This demo uses GitHub OAuth to authenticate users</p>
        <button className="button" onClick={handleLogin}>
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
