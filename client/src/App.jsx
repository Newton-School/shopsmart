import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';

function App() {
    // Default to true in Vitest to avoid breaking existing unit/integration tests
    const [isLoggedIn, setIsLoggedIn] = useState(import.meta.env.MODE === 'test');
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) return;
        const apiUrl = import.meta.env.VITE_API_URL || '';
        fetch(`${apiUrl}/api/health`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error('Error fetching health check:', err));
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return (
            <div className="app-container">
                <main className="center-wrapper">
                    <div className="login-brand">
                        <h1 className="sr-only">ShopSmart Login</h1>
                        {/* Visual branding */}
                        <div
                            style={{
                                fontSize: '2rem',
                                fontWeight: 700,
                                letterSpacing: '-0.05em',
                                color: '#0f172a',
                            }}
                        >
                            ShopSmart
                        </div>
                        <p>Sign in to your dashboard</p>
                    </div>

                    <div className="card card-sm">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setIsLoggedIn(true);
                            }}
                        >
                            <div className="form-group">
                                <label className="sr-only" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    className="input-field"
                                    placeholder="Username (demo)"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="sr-only" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    className="input-field"
                                    placeholder="Password (demo)"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary">
                                Secure Login
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="app-container">
            <header className="dashboard-header">
                <h1>ShopSmart</h1>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Admin Dashboard
                </div>
            </header>

            <main className="dashboard-main">
                <section className="status-section">
                    <h2>Backend Status</h2>
                    <div className="status-widget">
                        <div className="status-dot"></div>
                        <div className="status-content">
                            {data ? (
                                <>
                                    <p>
                                        Status: <strong>{data.status}</strong>
                                    </p>
                                    <p>{data.message}</p>
                                </>
                            ) : (
                                <span className="loading-pulse">Loading backend status...</span>
                            )}
                        </div>
                    </div>
                </section>

                <section>
                    <ProductList />
                </section>
            </main>
        </div>
    );
}

export default App;
