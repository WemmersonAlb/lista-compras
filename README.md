# Shopping List Application

This project is a simple shopping list application that allows users to create and manage their shopping lists. It includes features for adding products, categorizing them, and tracking the total cost against a budget.

## Project Structure

```
shopping-list
├── src
│   ├── index.html       # The main HTML structure of the application
│   ├── styles.css       # Styles for the application, ensuring responsiveness
│   └── app.js           # JavaScript logic for managing the shopping list
├── README.md            # Project documentation
└── package.json         # NPM configuration file
```

## Features

- Input fields for product name and quantity
- Dropdown menu for selecting product categories
- Button to add products to the shopping list
- Table displaying the shopping list with product details
- Budget input field with a fixed display after setting a budget
- Total cost display with color-coded thresholds based on budget
- Ability to edit and delete products from the list
- Products are sorted by category and name

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd shopping-list
   ```

3. Open `src/index.html` in your web browser to view the application.

## Usage

- Enter the product name and quantity in the respective fields.
- Select a category from the dropdown menu.
- Click the "Add Product" button to add the item to your shopping list.
- Set a budget amount and click "Fix Budget" to display the total cost.
- The total cost will change color based on the percentage of the budget used.
- Edit or delete products as needed.

## License

This project is open-source and available under the MIT License.