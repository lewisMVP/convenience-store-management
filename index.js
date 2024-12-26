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
    const updatedManufactureDate = manufactureDate ? manufactureDate : existingProduct.manufactureDate;
    const updatedExpiryDate = expiryDate ? expiryDate : existingProduct.expiryDate;

    if (inventory.updateProduct(id, updatedName, updatedCostPrice, updatedRetailPrice, updatedQuantity, updatedManufactureDate, updatedExpiryDate)) {
        alert("Product updated successfully.");
    } else {
        alert("Product not found.");
    }

    renderProducts();  // Re-render product list after update
    clearInputs();  // Clear inputs after update
}

function handlePurchaseProduct() {
    const id = document.getElementById("productId").value;
    const quantity = parseInt(document.getElementById("productQuantity").value);

    const result = inventory.purchaseProduct(id, quantity);
    if (result.success) {
        alert(result.message);
    } else {
        alert(result.message);
    }
    renderProducts();  // Re-render product list after purchase
    clearInputs();  // Clear inputs after purchase
}

function searchProduct() {
    const query = document.getElementById("searchInput").value;
    const products = inventory.searchProducts(query);
    renderProducts(products);
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

document.getElementById("addProductButton").addEventListener("click", handleAddProduct);
document.getElementById("deleteProductButton").addEventListener("click", handleDeleteProduct);
document.getElementById("updateProductButton").addEventListener("click", handleUpdateProduct);
document.getElementById("purchaseProductButton").addEventListener("click", handlePurchaseProduct);
document.getElementById("searchButton").addEventListener("click", searchProduct);

