document.addEventListener('DOMContentLoaded', function() {
    // Verify element exists
    const downloadButton = document.getElementById('csvDownload');
    if (!downloadButton) {
        console.error('Download button not found! Please check if element with id "csvDownload" exists.');
        return;
    }
    
    // Add event listener
    downloadButton.addEventListener('click', downloadCSV);

    document.getElementById("addProductButton").addEventListener("click", handleAddProduct);
    document.getElementById("deleteProductButton").addEventListener("click", handleDeleteProduct);
    document.getElementById("updateProductButton").addEventListener("click", handleUpdateProduct);
    document.getElementById("purchaseProductButton").addEventListener("click", handlePurchaseProduct);
    document.getElementById("searchButton").addEventListener("click", searchProduct);
    document.getElementById("csvUpload").addEventListener("change", handleFileUpload);
});

class ProductNode {
    constructor(id, name, costPrice, retailPrice, quantity, manufactureDate, expiryDate) {
        this.id = id;
        this.name = name;
        this.costPrice = costPrice;
        this.retailPrice = retailPrice;
        this.quantity = quantity;
        this.manufactureDate = manufactureDate;
        this.expiryDate = expiryDate;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    addProduct(id, name, costPrice, retailPrice, quantity, manufactureDate, expiryDate) {
        if (this.findProduct(id)) {
            return false; // Duplicate ID
        }
    
        const newProduct = new ProductNode(id, name, costPrice, retailPrice, quantity, manufactureDate, expiryDate);
    
        if (!this.head) {
            this.head = this.tail = newProduct;
        } else {
            newProduct.next = this.head;
            this.head.prev = newProduct;
            this.head = newProduct;
        }
        return true;
    }

    deleteProduct(id) {
        let current = this.head;

        while (current) {
            if (current.id === id) {
                if (current === this.head) {
                    this.head = current.next;
                    if (this.head) this.head.prev = null;
                } else if (current === this.tail) {
                    this.tail = current.prev;
                    this.tail.next = null;
                } else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                }
                return true;
            }
            current = current.next;
        }
        return false;
    }

    updateProduct(id, name, costPrice, retailPrice, quantity, manufactureDate, expiryDate) {
        let current = this.head;

        while (current) {
            if (current.id === id) {
                if (name) current.name = name;
                if (costPrice !== null && !isNaN(costPrice)) current.costPrice = costPrice;
                if (retailPrice !== null && !isNaN(retailPrice)) current.retailPrice = retailPrice;
                if (quantity !== null && !isNaN(quantity)) current.quantity = quantity;
                if (manufactureDate) current.manufactureDate = manufactureDate;
                if (expiryDate) current.expiryDate = expiryDate;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    purchaseProduct(id, quantity) {
        let current = this.head;

        while (current) {
            if (current.id === id) {
                if (current.quantity >= quantity) {
                    current.quantity -= quantity;
                    return { success: true, message: `Purchased ${quantity} of ${current.name}.` };
                } else {
                    return { success: false, message: `Insufficient stock for ${current.name}.` };
                }
            }
            current = current.next;
        }
        return { success: false, message: "Product not found." };
    }

    findProduct(id) {
        let current = this.head;
        while (current) {
            if (current.id === id) return current;
            current = current.next;
        }
        return null;
    }

    displayProducts() {
        const products = [];
        let current = this.head;

        while (current) {
            products.push({
                id: current.id,
                name: current.name,
                costPrice: current.costPrice,
                retailPrice: current.retailPrice,
                quantity: current.quantity,
                manufactureDate: current.manufactureDate,
                expiryDate: current.expiryDate
            });
            current = current.next;
        }
        return products;
    }

    searchProducts(query) {
        const result = [];
        let current = this.head;

        while (current) {
            if (current.id.includes(query) || current.name.toLowerCase().includes(query.toLowerCase()) || current.quantity.toString().includes(query) || current.costPrice.toString().includes(query) || current.retailPrice.toString().includes(query)) {
                result.push({
                    id: current.id,
                    name: current.name,
                    quantity: current.quantity,
                    retailPrice: current.retailPrice,
                    manufactureDate: current.manufactureDate,
                    expiryDate: current.expiryDate,
                    costPrice: current.costPrice // Ensure costPrice is included
                });
            }
            current = current.next;
        }
        return result;
    }

    getAllProducts() {
        return this.displayProducts();
    }
}

const inventory = new DoublyLinkedList();

function renderProducts(products = inventory.displayProducts()) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(product => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="border p-2">${product.id}</td>
            <td class="border p-2">${product.name}</td>
            <td class="border p-2">${product.costPrice !== undefined ? product.costPrice : "N/A"}</td>
            <td class="border p-2">${product.retailPrice !== undefined ? product.retailPrice : "N/A"}</td>
            <td class="border p-2">${product.manufactureDate || "N/A"}</td>
            <td class="border p-2">${product.expiryDate || "N/A"}</td>
            <td class="border p-2">${product.quantity !== undefined ? product.quantity : "N/A"}</td>
        `;

        productList.appendChild(row);
    });
}

function validateInputs(id, name, costPrice, retailPrice, quantity) {
    if (!id || !name || isNaN(costPrice) || isNaN(retailPrice) || isNaN(quantity) || costPrice < 0 || retailPrice < 0 || quantity < 0) {
        const errorDiv = document.getElementById("formError");
        errorDiv.classList.remove("hidden");
        return false;
    }
    document.getElementById("formError").classList.add("hidden");
    return true;
}

function handleAddProduct() {
    const id = document.getElementById("productId").value;
    const name = document.getElementById("productName").value;
    const costPrice = parseFloat(document.getElementById("productCostPrice").value);
    const retailPrice = parseFloat(document.getElementById("productRetailPrice").value);
    const quantity = parseInt(document.getElementById("productQuantity").value);
    const manufactureDate = document.getElementById("productManufactureDate").value;
    const expiryDate = document.getElementById("productExpiryDate").value;

    if (!validateInputs(id, name, costPrice, retailPrice, quantity)) return;

    if (inventory.addProduct(id, name, costPrice, retailPrice, quantity, manufactureDate, expiryDate)) {
        renderProducts();  // Update product list after adding
        alert("Product added successfully.");
        clearInputs();
    } else {
        alert("Product ID already exists.");
    }
}

function handleDeleteProduct() {
    const id = document.getElementById("productId").value;

    if (inventory.deleteProduct(id)) {
        alert("Product deleted successfully.");
    } else {
        alert(`No product found with ID: ${id}`);
    }
    renderProducts();  // Re-render product list after deletion
    clearInputs();  // Clear inputs after deletion
}

function handleUpdateProduct() {
    const id = document.getElementById("productId").value;
    const name = document.getElementById("productName").value;
    const costPrice = parseFloat(document.getElementById("productCostPrice").value);
    const retailPrice = parseFloat(document.getElementById("productRetailPrice").value);
    const quantity = parseInt(document.getElementById("productQuantity").value);
    const manufactureDate = document.getElementById("productManufactureDate").value;
    const expiryDate = document.getElementById("productExpiryDate").value;

    if (!id) {
        alert("Please enter a valid product ID.");
        return;
    }

    const existingProduct = inventory.findProduct(id);

    if (!existingProduct) {
        alert(`No product found with ID: ${id}`);
        return;
    }

    const updatedName = name ? name : existingProduct.name;
    const updatedCostPrice = isNaN(costPrice) ? existingProduct.costPrice : costPrice;
    const updatedRetailPrice = isNaN(retailPrice) ? existingProduct.retailPrice : retailPrice;
    const updatedQuantity = isNaN(quantity) ? existingProduct.quantity : quantity;
    const updatedManufactureDate = manufactureDate || existingProduct.manufactureDate;
    const updatedExpiryDate = expiryDate || existingProduct.expiryDate;

    if (inventory.updateProduct(id, updatedName, updatedCostPrice, updatedRetailPrice, updatedQuantity, updatedManufactureDate, updatedExpiryDate)) {
        renderProducts();
        alert("Product updated successfully.");
        clearInputs();
    } else {
        alert("Error updating product.");
    }
}

function handlePurchaseProduct() {
    const id = document.getElementById("productId").value;
    const quantity = parseInt(document.getElementById("productQuantity").value);

    if (!id || isNaN(quantity) || quantity <= 0) {
        alert("Please enter valid product ID and quantity.");
        return;
    }

    const result = inventory.purchaseProduct(id, quantity);

    alert(result.message);
    renderProducts();
    clearInputs();
}

function searchProduct() {
    const query = document.getElementById("searchInput").value;

    if (!query) {
        renderProducts();
    } else {
        const results = inventory.searchProducts(query);
        renderProducts(results);
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const content = event.target.result;
        try {
            // Clear existing inventory
            inventory.head = null;
            inventory.tail = null;

            const lines = content.split('\n');
            lines.forEach(line => {
                const [id, name, costPrice, retailPrice, quantity, manufactureDate, expiryDate] = line.split(',');

                if (id && name && !isNaN(costPrice) && !isNaN(retailPrice) && !isNaN(quantity)) {
                    inventory.addProduct(id.trim(), name.trim(), parseFloat(costPrice.trim()), parseFloat(retailPrice.trim()), parseInt(quantity.trim()), manufactureDate.trim(), expiryDate.trim());
                }
            });
            renderProducts();  // Re-render after upload
            alert('File uploaded successfully.');
        } catch (error) {
            console.error('Error reading file:', error);
            alert('Error processing file.');
        }
    };
    reader.readAsText(file);
}


function downloadCSV() {
    const products = inventory.getAllProducts();
    let csvContent = "ID,Name,Cost Price,Retail Price,Quantity,Manufacture Date,Expiry Date\n";

    products.forEach(product => {
        csvContent += `${product.id},${product.name},${product.costPrice},${product.retailPrice},${product.quantity},${product.manufactureDate},${product.expiryDate}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "inventory.csv";
    link.click();
}

function clearInputs() {
    document.getElementById("productId").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("productCostPrice").value = "";
    document.getElementById("productRetailPrice").value = "";
    document.getElementById("productQuantity").value = "";
    document.getElementById("productManufactureDate").value = "";
    document.getElementById("productExpiryDate").value = "";
}
