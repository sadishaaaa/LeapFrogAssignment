CREATE TABLE IF NOT EXISTS Suppliers(
SupplierId SERIAL PRIMARY KEY,
SupplierName VARCHAR(50) NOT NULL,
ContactName VARCHAR(50) NOT NULL,
Address VARCHAR(50) NOT NULL,
City VARCHAR(50)NOT NULL,
PostalCode VARCHAR(50) NOT NULL,
Country VARCHAR(50)NOT NULL,
Phone VARCHAR(20)NOT NULL	
)
