// Inventory Management using DoublyLinkedList

class DoublyLinkedListNode {
    constructor(product) {
        this.product = product;
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
        const product = {
            id,
            name,
            costPrice,
            retailPrice,
            quantity,
            manufactureDate,
            expiryDate
        };
        const newNode = new DoublyLinkedListNode(product);

        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }

    displayProducts() {
        const products = [];
        let current = this.head;

        while (current) {
            products.push(current.product);
            current = current.next;
        }

        return products;
    }

    deleteProduct(id) {
        let current = this.head;

        while (current) {
            if (current.product.id === id) {
                if (current.prev) {
                    current.prev.next = current.next;
                } else {
                    this.head = current.next;
                }

                if (current.next) {
                    current.next.prev = current.prev;
                } else {
                    this.tail = current.prev;
                }

                return true; // Product deleted
            }

            current = current.next;
        }

        return false; // Product not found
    }
}

const inventory = new DoublyLinkedList();

// DOM manipulation
function renderProducts() {
    const products = inventory.displayProducts();
    const productTable = document.getElementById("productTable");
    productTable.innerHTML = ""; // Clear the table

    products.forEach(product => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.costPrice}</td>
            <td>${product.retailPrice}</td>
            <td>${product.quantity}</td>
            <td>${product.manufactureDate || "N/A"}</td>
            <td>${product.expiryDate || "N/A"}</td>
            <td><button onclick="deleteProduct('${product.id}')">Delete</button></td>
        `;

        productTable.appendChild(row);
    });
}

function addProduct() {
    const id = document.getElementById("productId").value;
    const name = document.getElementById("productName").value;
    const costPrice = parseFloat(document.getElementById("costPrice").value);
    const retailPrice = parseFloat(document.getElementById("retailPrice").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const manufactureDate = document.getElementById("manufactureDate").value;
    const expiryDate = document.getElementById("expiryDate").value;

    inventory.addProduct(id, name, costPrice, retailPrice, quantity, manufactureDate, expiryDate);
    renderProducts();

    // Clear input fields
    document.getElementById("productForm").reset();
}

function deleteProduct(id) {
    if (inventory.deleteProduct(id)) {
        alert("Product deleted successfully.");
    } else {
        alert("Product not found.");
    }
    renderProducts();
}

function downloadCSV() {
    const products = inventory.displayProducts();
    if (products.length === 0) {
        alert("No products available to download.");
        return;
    }

    // Convert product data to CSV format
    const csvContent = [
        ["ID", "Name", "Cost Price", "Retail Price", "Quantity", "Manufacture Date", "Expiry Date"].join(","),
        ...products.map(product =>
            [
                product.id,
                product.name,
                product.costPrice,
                product.retailPrice,
                product.quantity,
                product.manufactureDate || "",
                product.expiryDate || ""
            ].join(",")
        )
    ].join("\n");

    // Create a downloadable link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function uploadCSV(event) {
    const file = event.target.files[0];
    if (!file) {
        alert("Please select a file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const content = e.target.result;
        const rows = content.split("\n").slice(1); // Skip header row

        rows.forEach(row => {
            const [id, name, costPrice, retailPrice, quantity, manufactureDate, expiryDate] = row.split(",");
            if (id && name) {
                inventory.addProduct(
                    id.trim(),
                    name.trim(),
                    parseFloat(costPrice),
                    parseFloat(retailPrice),
                    parseInt(quantity),
                    manufactureDate.trim(),
                    expiryDate.trim()
                );
            }
        });

        renderProducts(); // Re-render products after upload
        alert("Products uploaded successfully.");
    };

    reader.readAsText(file);
}

// Attach event listeners
document.getElementById("downloadCSVButton").addEventListener("click", downloadCSV);
document.getElementById("uploadCSVInput").addEventListener("change", uploadCSV);
