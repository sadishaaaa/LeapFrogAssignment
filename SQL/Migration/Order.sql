CREATE TABLE IF NOT EXISTS Orders(
OrderId SERIAL PRIMARY KEY,
CustomerId INT NOT NULL,
EmployeeId INT NOT NULL,
OrderDate Date NOT NULL,
ShipperId INT NOT NULL,
FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerId),
FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeId),
FOREIGN KEY (ShipperID) REFERENCES Shippers(ShipperId)
)
