const mongoose = require('mongoose');
const User = require('../src/models/db.Users');

describe('User Model Unit Tests', () => {
    it('should throw a validation error if required fields are missing', () => {
        const user = new User();
        const err = user.validateSync();
        
        expect(err.errors.name).toBeDefined();
        expect(err.errors.email).toBeDefined();
        expect(err.errors.password).toBeDefined();
    });

    it('should create a valid user instance when all fields are provided', () => {
        const user = new User({
            name: 'Unit Test User',
            email: 'unittest@shopsmart.com',
            password: 'SecurePassword123!'
        });
        const err = user.validateSync();
        
        expect(err).toBeUndefined();
        expect(user.name).toBe('Unit Test User');
        expect(user.email).toBe('unittest@shopsmart.com');
    });
});
