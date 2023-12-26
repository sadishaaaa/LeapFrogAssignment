CREATE TABLE IF NOT EXISTS Products(
    ProductId SERIAL PRIMARY KEY,
    ProductName VARCHAR(50) UNIQUE NOT NULL,
    SupplierId INT NOT NULL,
    CategoryId INT NOT NULL,
    Unit VARCHAR(20) NOT NULL,
    Price NUMERIC NOT NULL,
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId),
    FOREIGN KEY (SupplierId) REFERENCES Suppliers(SupplierId)
);