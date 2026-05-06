import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('*/api/health', () => {
        return HttpResponse.json({
            status: 'ok',
            message: 'Mocked Health Check',
            timestamp: new Date().toISOString(),
        });
    }),
    http.get('*/api/products', () => {
        return HttpResponse.json([
            { id: 1, name: 'Mocked Headphones', price: 99.99, category: 'Electronics' },
            { id: 2, name: 'Mocked Shoes', price: 59.99, category: 'Sports' },
        ]);
    }),
];
