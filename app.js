document.addEventListener('DOMContentLoaded', () => {
    const budgetInput = document.getElementById('budget-input');
    const budgetButton = document.getElementById('budget-button');
    const editBudgetButton = document.getElementById('edit-budget-button');
    const clearButton = document.getElementById('clear-button');
    const productNameInput = document.getElementById('product-name-input');
    const productQuantityInput = document.getElementById('product-quantity-input');
    const productPriceInput = document.getElementById('product-price-input');
    const productCategorySelect = document.getElementById('product-category-select');
    const addProductButton = document.getElementById('add-product-button');
    const productTableBody = document.getElementById('product-table-body');
    const totalDisplay = document.getElementById('total-display');
    const budgetDisplay = document.getElementById('budget-display');
    const budgetAmount = document.getElementById('budget-amount');
    const totalAmount = document.getElementById('total-amount');

    const editModal = document.getElementById('edit-modal');
    const closeModal = document.querySelector('.close');
    const editProductName = document.getElementById('edit-product-name');
    const editProductQuantity = document.getElementById('edit-product-quantity');
    const editProductPrice = document.getElementById('edit-product-price');
    const editProductCategory = document.getElementById('edit-product-category');
    const saveEditButton = document.getElementById('save-edit-button');

    let products = [];
    let budget = 0;
    let currentEditIndex = null;

    function loadProducts() {
        const storedProducts = JSON.parse(localStorage.getItem('products'));
        if (storedProducts) {
            products = storedProducts;
            renderProducts();
        }
    }

    function loadBudget() {
        const storedBudget = parseFloat(localStorage.getItem('budget'));
        if (!isNaN(storedBudget)) {
            budget = storedBudget;
            budgetInput.style.display = 'none';
            budgetButton.style.display = 'none';
            editBudgetButton.classList.remove('hidden');
            budgetDisplay.classList.remove('hidden');
            budgetAmount.innerText = budget.toFixed(2);
        }
    }

    function saveProducts() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    function saveBudget() {
        localStorage.setItem('budget', budget.toString());
    }

    function renderProducts() {
        productTableBody.innerHTML = '';
        let total = 0;

        products.sort((a, b) => {
            if (a.category === b.category) {
                return a.name.localeCompare(b.name);
            }
            return a.category.localeCompare(b.category);
        });

        products.forEach((product, index) => {
            const totalPrice = product.price * product.quantity;
            total += totalPrice;

            const row = document.createElement('tr');
            row.classList.add(`category-${product.category}`);
            row.innerHTML = `
                <td>${product.quantity}</td>
                <td>${product.name}</td>
                <td>${product.price !== null ? product.price.toFixed(2) : 'N/A'}</td>
                <td>${product.price !== null ? totalPrice.toFixed(2) : 'N/A'}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            productTableBody.appendChild(row);

            row.querySelector('.edit-btn').addEventListener('click', () => openEditModal(index));
            row.querySelector('.delete-btn').addEventListener('click', () => deleteProduct(index));
        });

        totalAmount.innerText = `R$ ${total.toFixed(2)}`;
        updateBudgetDisplay(total);
    }

    function addProduct() {
        const name = productNameInput.value;
        const quantity = parseInt(productQuantityInput.value);
        const price = parseFloat(productPriceInput.value);
        const category = productCategorySelect.value;

        if (name && quantity) {
            products.push({ name, quantity, price: isNaN(price) ? null : price, category });
            saveProducts();
            renderProducts();
            productNameInput.value = '';
            productQuantityInput.value = '';
            productPriceInput.value = '';
        }
    }

    function openEditModal(index) {
        currentEditIndex = index;
        const product = products[index];
        editProductName.value = product.name;
        editProductQuantity.value = product.quantity;
        editProductPrice.value = product.price !== null ? product.price : '';
        editProductCategory.value = product.category;
        editModal.style.display = 'block';
    }

    function closeEditModal() {
        editModal.style.display = 'none';
    }

    function saveEditProduct() {
        const product = products[currentEditIndex];
        product.name = editProductName.value;
        product.quantity = parseInt(editProductQuantity.value);
        product.price = parseFloat(editProductPrice.value);
        product.category = editProductCategory.value;

        if (isNaN(product.price)) {
            product.price = null;
        }

        saveProducts();
        renderProducts();
        closeEditModal();
    }

    function deleteProduct(index) {
        products.splice(index, 1);
        saveProducts();
        renderProducts();
    }

    function updateBudgetDisplay(total) {
        loadBudget()
        const budgetPercentage = (total / budget) * 100;
        console.log(budgetPercentage);
        totalDisplay.className = 'budget-display';
        if (budgetPercentage <= 75) {
            totalDisplay.classList.add('budget-green');
        } else if (budgetPercentage <= 90) {
            totalDisplay.classList.add('budget-yellow');
        } else if (budgetPercentage <= 100) {
            totalDisplay.classList.add('budget-red-light');
        } else {
            totalDisplay.classList.add('budget-red-dark');
        }
    }

    budgetButton.addEventListener('click', () => {
        budget = parseFloat(budgetInput.value);
        budgetInput.style.display = 'none';
        budgetButton.style.display = 'none';
        editBudgetButton.classList.remove('hidden');
        budgetDisplay.classList.remove('hidden');
        budgetAmount.innerText = budget.toFixed(2);
        saveBudget();
    });

    editBudgetButton.addEventListener('click', () => {
        budgetInput.style.display = 'block';
        budgetButton.style.display = 'block';
        editBudgetButton.classList.add('hidden');
    });

    clearButton.addEventListener('click', () => {
        products = [];
        budget = 0;
        saveProducts();
        saveBudget();
        renderProducts();
        budgetInput.style.display = 'block';
        budgetButton.style.display = 'block';
        editBudgetButton.classList.add('hidden');
        budgetDisplay.classList.add('hidden');
        budgetAmount.innerText = '0,00';
        totalAmount.innerText = 'R$ 0,00';
        totalDisplay.className = 'budget-display';
    });

    addProductButton.addEventListener('click', addProduct);
    saveEditButton.addEventListener('click', saveEditProduct);
    closeModal.addEventListener('click', closeEditModal);
    window.onclick = function(event) {
        if (event.target == editModal) {
            closeEditModal();
        }
    };

    window.onload = () => {
        loadProducts();
        loadBudget();
    };
});