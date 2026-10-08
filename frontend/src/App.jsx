import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Add from './pages/Add';
import Actions from './pages/Actions';
import Memory from './pages/Memory';
import Settings from './pages/Settings';
import {
  auth,
  login,
  logout,
  onAuthStateChanged,
  firebaseConfigured
} from './firebase';
import {
  getActions,
  getDashboard,
  updateAction
} from './services/api';
import { LogIn, ShieldCheck } from 'lucide-react';

const titles = {
  home: 'Home',
  chat: 'Ask Actra',
  add: 'Add to Actra',
  actions: 'Actions',
  memory: 'Memory',
  settings: 'Settings'
};

function SignIn() {
  return (
    <div className="login">
      <div className="login-card">
        <div className="brand-mark">
          <img src="/actra-logo.jpg" alt="ACTRA" />
        </div>

        <h1>ACTRA</h1>

        <p>
          Your AI life action agent. Sign in to keep actions, memory and
          integrations securely synced.
        </p>

        {!firebaseConfigured && (
          <div className="result-card error">
            <ShieldCheck />
            <div>
              Firebase client configuration is missing. Copy{' '}
              <b>frontend/.env.example</b> to <b>.env</b> and fill your
              Firebase Web App values.
            </div>
          </div>
        )}

        <button
          className="primary"
          disabled={!firebaseConfigured}
          onClick={login}
        >
          <LogIn size={18} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [actions, setActions] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, setUser);
  }, []);

  async function refresh() {
    try {
      const [a, d] = await Promise.all([
        getActions(),
        getDashboard()
      ]);

      setActions(a);
      setDashboard(d);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    if (user) refresh();
  }, [user]);

  if (!user) return <SignIn />;

  async function status(id, status) {
    await updateAction(id, { status });
    refresh();
  }

  function content() {
    if (page === 'home') {
      return (
        <Home
          dashboard={dashboard}
          actions={actions}
          setPage={setPage}
          onStatus={status}
        />
      );
    }

    if (page === 'chat') return <Chat />;

    if (page === 'add') {
      return <Add onDone={refresh} />;
    }

    if (page === 'actions') {
      return <Actions actions={actions} onStatus={status} />;
    }

    if (page === 'memory') {
      return <Memory dashboard={dashboard} />;
    }

    return <Settings user={user} onLogout={logout} />;
  }

  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} />

      <main className="main">
        <Topbar
          title={titles[page]}
          onAdd={() => setPage('add')}
          user={user}
        />

        {error && (
          <div className="backend-warning">
            {error}
          </div>
        )}

        {content()}
      </main>
    </div>
  );
}