import unittest
from app import app, MOCK_TOKENS  # adjust import if app file has a different name

class APITestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self.admin_token = MOCK_TOKENS['admin']
        self.user_token = MOCK_TOKENS['user']
        self.headers_admin = {'Authorization': self.admin_token}
        self.headers_user = {'Authorization': self.user_token}

    def test_login_admin(self):
        response = self.client.post('/api/login', json={'role': 'admin'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('token', response.get_json())

    def test_get_users_admin(self):
        response = self.client.get('/api/users', headers=self.headers_admin)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.get_json(), list)

    def test_get_users_user_forbidden(self):
        response = self.client.get('/api/users', headers=self.headers_user)
        self.assertEqual(response.status_code, 403)

    def test_create_user_as_admin(self):
        new_user = {'username': 'testuser', 'role': 'user'}
        response = self.client.post('/api/user', json=new_user, headers=self.headers_admin)
        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(data['username'], 'testuser')
        self.assertEqual(data['role'], 'user')

    def test_create_user_as_user_forbidden(self):
        new_user = {'username': 'unauthuser', 'role': 'user'}
        response = self.client.post('/api/user', json=new_user, headers=self.headers_user)
        self.assertEqual(response.status_code, 403)

    def test_get_houses(self):
        response = self.client.get('/api/houses', headers=self.headers_user)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.get_json(), list)

    def test_get_single_house(self):
        response = self.client.get('/api/house/1', headers=self.headers_user)
        self.assertEqual(response.status_code, 200)
        self.assertIn('address', response.get_json())

    def test_create_house(self):
        new_house = {
            "address": "456 Elm St",
            "num_rooms": 4,
            "price": 350000.0
        }
        response = self.client.post('/api/house', json=new_house, headers=self.headers_user)
        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(data['address'], new_house['address'])
