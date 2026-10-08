import React from 'react';
import {
  Sparkles,
  CalendarDays,
  Flame,
  CheckCircle2,
  ArrowUpRight,
  Plus,
  Clock,
  ListChecks
} from 'lucide-react';

export default function Home({
  dashboard = {},
  actions = [],
  setPage,
  onStatus
}) {
  const todayActions =
    dashboard?.today ??
    dashboard?.todayActions ??
    actions.filter((a) => {
      if (!a?.dueDate) return false;

      const today = new Date().toISOString().slice(0, 10);
      return String(a.dueDate).slice(0, 10) === today;
    });

  const urgentActions =
    dashboard?.urgent ??
    dashboard?.urgentActions ??
    actions.filter(
      (a) =>
        a?.priority === 'urgent' ||
        a?.priority === 'high' ||
        a?.urgent === true
    );

  const completed =
    dashboard?.completed ??
    dashboard?.completedCount ??
    actions.filter(
      (a) =>
        String(a?.status || '').toLowerCase() === 'done' ||
        String(a?.status || '').toLowerCase() === 'completed'
    ).length;

  const visibleActions = Array.isArray(todayActions)
    ? todayActions.slice(0, 5)
    : [];

  return (
    <section className="home-page">

      {/* Hero */}
      <div className="hero-card">

        <div className="hero-content">
          <div className="agent-label">
            <Sparkles size={16} />
            ACTRA AGENT
          </div>

          <h2>
            Turn information
            <br />
            <span>into action.</span>
          </h2>

          <p>
            Actra understands documents, screenshots, messages and
            voice notes — then helps you finish what matters.
          </p>

          <button
            className="primary hero-button"
            onClick={() => setPage?.('add')}
          >
            Give Actra something to work on
            <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="hero-image">
          <img
            src="/actra-logo.jpg"
            alt="ACTRA AI robot"
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon calendar">
            <CalendarDays size={21} />
          </div>

          <div>
            <div className="stat-label">Today</div>
            <div className="stat-value">
              {Array.isArray(todayActions)
                ? todayActions.length
                : 0}
            </div>
            <div className="stat-description">
              actions waiting
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon urgent">
            <Flame size={21} />
          </div>

          <div>
            <div className="stat-label">Urgent</div>
            <div className="stat-value">
              {Array.isArray(urgentActions)
                ? urgentActions.length
                : 0}
            </div>
            <div className="stat-description">
              need attention
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <div className="stat-label">Completed</div>
            <div className="stat-value">
              {completed}
            </div>
            <div className="stat-description">
              all time
            </div>
          </div>
        </div>

      </div>

      {/* Today's actions */}
      <div className="section-heading">
        <div>
          <div className="eyebrow">YOUR ATTENTION</div>
          <h2>Today's actions</h2>
        </div>

        <button
          className="secondary"
          onClick={() => setPage?.('actions')}
        >
          View all
          <ArrowUpRight size={17} />
        </button>
      </div>

      {visibleActions.length === 0 ? (

        <div className="empty-state">
          <ListChecks size={30} />

          <h3>You're clear.</h3>

          <p>
            Add something for Actra to handle.
          </p>

          <button
            className="primary"
            onClick={() => setPage?.('add')}
          >
            <Plus size={18} />
            Add an action
          </button>
        </div>

      ) : (

        <div className="home-actions">

          {visibleActions.map((action, index) => {

            const id =
              action?.id ??
              action?._id ??
              index;

            const title =
              action?.title ??
              action?.task ??
              action?.name ??
              'Untitled action';

            const description =
              action?.description ??
              action?.details ??
              '';

            const dueDate =
              action?.dueDate ??
              action?.deadline;

            const status =
              action?.status ??
              'pending';

            return (
              <div
                className="home-action-card"
                key={id}
              >

                <div className="action-check">
                  <CheckCircle2 size={20} />
                </div>

                <div className="home-action-main">

                  <h3>{title}</h3>

                  {description && (
                    <p>{description}</p>
                  )}

                  <div className="action-meta">

                    {dueDate && (
                      <span>
                        <Clock size={14} />
                        {String(dueDate).slice(0, 10)}
                      </span>
                    )}

                    <span>
                      {String(status)}
                    </span>

                  </div>

                </div>

                {status !== 'done' &&
                  status !== 'completed' &&
                  onStatus && (
                    <button
                      className="complete-button"
                      onClick={() =>
                        onStatus(id, 'done')
                      }
                    >
                      Complete
                    </button>
                  )}

              </div>
            );
          })}

        </div>
      )}

    </section>
  );
}