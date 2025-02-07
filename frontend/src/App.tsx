import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

function App() {
  const { loginWithRedirect, user, getAccessTokenSilently, logout, isAuthenticated } = useAuth0();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchToken = async () => {
        try {
          const accessToken = await getAccessTokenSilently();
          setToken(accessToken);
          console.log(user)
          console.log("Access Token:", accessToken);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      };
      fetchToken();
    }
  }, [isAuthenticated, getAccessTokenSilently, user]);

  return (
    <div className="container">
      {isAuthenticated && user ? (
        <div className="profile-card">
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
          {user.picture && <img src={user.picture} alt={user.name} className="avatar" />}
          {token && <p className="token">Token: {token.substring(0, 20)}...</p>}
          <button className="btn logout" onClick={() => logout()}>Log Out</button>
        </div>
      ) : (
        <button className="btn login" onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </div>
  );
}

export default App;

