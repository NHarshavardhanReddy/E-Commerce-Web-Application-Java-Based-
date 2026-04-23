// Mock users for demo purposes
const mockUsers = [
  {
    _id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: '$2a$10$H8GZBgL1Y3U0T8FhC0xvK.u5xZBQF7f.ZJnJp5KxfAjJWc9JhX9Ri', // password: password123
    isAdmin: false,
  },
  {
    _id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$H8GZBgL1Y3U0T8FhC0xvK.u5xZBQF7f.ZJnJp5KxfAjJWc9JhX9Ri', // password: password123
    isAdmin: true,
  },
];

module.exports = mockUsers;