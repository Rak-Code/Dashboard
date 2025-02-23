// Fetch and display users
function fetchUsers() {
    fetch('http://localhost:8080/api/users')
        .then(response => response.json())
        .then(users => {
            const userTableBody = document.querySelector('#userTable tbody');
            userTableBody.innerHTML = ''; // Clear existing rows

            users.forEach(user => {
                const row = `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="editUser(${user.id})">Edit</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                        </td>
                    </tr>
                `;
                userTableBody.insertAdjacentHTML('beforeend', row);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Fetch and display products
function fetchProducts() {
    fetch('http://localhost:8080/api/products')
        .then(response => response.json())
        .then(products => {
            const productTableBody = document.querySelector('#productTable tbody');
            productTableBody.innerHTML = ''; // Clear existing rows

            products.forEach(product => {
                const row = `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>$${product.price}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="editProduct(${product.id})">Edit</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                        </td>
                    </tr>
                `;
                productTableBody.insertAdjacentHTML('beforeend', row);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Add User
document.getElementById('addUserBtn').addEventListener('click', () => {
    const username = prompt('Enter username:');
    const email = prompt('Enter email:');
    const password = prompt('Enter password:');

    if (username && email && password) {
        fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, confirmPassword: password }),
        })
        .then(response => {
            if (response.ok) {
                alert('User added successfully!');
                fetchUsers(); // Refresh user list
            } else {
                alert('Failed to add user.');
            }
        })
        .catch(error => console.error('Error adding user:', error));
    }
});

// Add Product
document.getElementById('addProductBtn').addEventListener('click', () => {
    const name = prompt('Enter product name:');
    const price = parseFloat(prompt('Enter product price:'));

    if (name && price) {
        fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price }),
        })
        .then(response => {
            if (response.ok) {
                alert('Product added successfully!');
                fetchProducts(); // Refresh product list
            } else {
                alert('Failed to add product.');
            }
        })
        .catch(error => console.error('Error adding product:', error));
    }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token'); // Clear token (if using JWT)
    window.location.href = 'index.html'; // Redirect to login page
});

// Initial fetch
fetchUsers();
fetchProducts();