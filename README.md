# Convenience Store Management system with Upload and Download function
![image](https://github.com/user-attachments/assets/e6785fad-c676-4cf3-8d45-438270f70247)
![image](https://github.com/user-attachments/assets/00786495-a291-4c05-9b89-3a59aadbd98f)

A simple and efficient web-based management system for convenience stores, built with vanilla HTML, CSS, and JavaScript.

## 📋 Overview

This convenience store management system provides essential tools for managing inventory operations. It features a clean, user-friendly interface with product management capabilities including adding, updating, deleting, and purchasing products.

## ✨ Features

- **Product Management**
  - Add new products with detailed information
  - Update existing product details
  - Delete products from inventory
  - Search products by ID or name

- **Inventory Tracking**
  - Track product quantities
  - Monitor cost and retail prices
  - Manage manufacture and expiry dates
  - Purchase products (quantity deduction)

- **Data Management**
  - Export inventory data to CSV
  - Import products from CSV files
  - Local storage persistence
  - Real-time product search

- **User Interface**
  - Responsive design with Tailwind CSS
  - Clean form-based product entry
  - Interactive product table
  - Background image styling

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server installation required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lewisMVP/convenience-store-management.git
cd convenience-store-management
```

2. Open the project:
```bash
# Simply open index.html in your web browser
# Or use a local server for better experience:
python -m http.server 8000
# Then navigate to http://localhost:8000
```

## 🛠️ Usage

### Adding Products
1. Fill in all product details in the form:
   - Product ID (unique identifier)
   - Product Name
   - Cost Price
   - Retail Price
   - Quantity
   - Manufacture Date
   - Expiry Date
2. Click "Add Product" to save

### Managing Inventory
- **Update Product**: Fill form with existing product ID and new details, click "Update Product"
- **Delete Product**: Enter product ID and click "Delete Product"
- **Purchase Product**: Enter product ID and quantity, click "Purchase Product"
- **Search**: Use the search bar to find products by ID or name

### Data Import/Export
- **Export**: Click "Download CSV" to export current inventory
- **Import**: Click "Upload CSV" to import products from a CSV file

## 📁 Project Structure

```
convenience-store-management/
├── index.html          # Main application page
├── index.js           # Core JavaScript functionality
├── logpg.html         # Login page
├── logpg.css          # Login page styles
├── logpg.js           # Login page functionality
├── bg.jpg             # Background image
├── logo.png           # Application logo
├── flowchart.png      # System flowchart
└── README.md          # This file
```

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Structure and markup
- **CSS3** - Styling (via Tailwind CSS CDN)
- **Vanilla JavaScript** - Core functionality
- **Local Storage** - Data persistence
- **Font Awesome** - Icons

### Key JavaScript Functions
- `handleAddProduct()` - Add new products
- `handleUpdateProduct()` - Update existing products
- `handleDeleteProduct()` - Remove products
- `handlePurchaseProduct()` - Process sales
- `searchProduct()` - Real-time search
- `downloadCSV()` - Export data
- `handleFileUpload()` - Import data

## 📊 Data Structure

Products are stored with the following attributes:
- **ID**: Unique product identifier
- **Name**: Product name
- **Cost Price**: Purchase cost
- **Retail Price**: Selling price
- **Quantity**: Stock quantity
- **Manufacture Date**: Production date
- **Expiry Date**: Expiration date

## 🌐 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔄 Future Enhancements

- Backend integration for multi-user support
- Advanced reporting and analytics
- Barcode scanning functionality
- Point of sale (POS) integration
- Employee management features

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: lewisMVP

---

**Note**: This application uses local storage for data persistence. Data will be saved in your browser but won't sync across different devices or browsers.
