import React from 'react';
import {
  Home,
  MessageSquare,
  Plus,
  ListChecks,
  Brain,
  Settings
} from 'lucide-react';

export default function Sidebar({ page, setPage }) {
  const items = [
    ['home', 'Home', Home],
    ['chat', 'Ask Actra', MessageSquare],
    ['add', 'Add', Plus],
    ['actions', 'Actions', ListChecks],
    ['memory', 'Memory', Brain],
    ['settings', 'Settings', Settings]
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <img src="/actra-logo.jpg" alt="ACTRA" />
        </div>

        <div>
          <div className="brand-name">ACTRA</div>
          <div className="brand-sub">AI LIFE ACTION AGENT</div>
        </div>
      </div>

      <nav>
        {items.map(([id, label, Icon]) => (
          <button
            key={id}
            className={page === id ? 'nav-item active' : 'nav-item'}
            onClick={() => setPage(id)}
            title={label}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}