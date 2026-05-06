import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';
import { server } from './mocks/server';
import { http, HttpResponse } from 'msw';

describe('App', () => {
    it('renders ShopSmart title', async () => {
        render(<App />);
        const linkElement = screen.getByText(/ShopSmart/i);
        expect(linkElement).toBeInTheDocument();
    });

    it('displays backend status when API call succeeds', async () => {
        render(<App />);

        // Wait for the status to be displayed (from the mocked handler)
        await waitFor(() => {
            expect(screen.getByText(/Status:/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/ok/i)).toBeInTheDocument();
        expect(screen.getByText(/Mocked Health Check/i)).toBeInTheDocument();
    });

    it('handles API errors gracefully', async () => {
        // Override the handler to return a 500 error for this specific test
        server.use(
            http.get('*/api/health', () => {
                return new HttpResponse(null, { status: 500 });
            })
        );

        render(<App />);

        // Since the component just logs the error and doesn't show an error message in UI (based on previous view_file),
        // we might just check that it remains in loading state or doesn't crash.
        // Looking at App.jsx:
        // .catch(err => console.error('Error fetching health check:', err));
        // It stays in "Loading backend status..." if error occurs because data is null.

        expect(screen.getByText(/Loading backend status.../i)).toBeInTheDocument();

        // Use a short timeout to ensure it stays that way (optional, but good for verification)
        await waitFor(() => {}, { timeout: 1000 });
        expect(screen.getByText(/Loading backend status.../i)).toBeInTheDocument();
    });
});
