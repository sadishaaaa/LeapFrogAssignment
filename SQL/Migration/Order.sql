CREATE TABLE IF NOT EXISTS Orders(
OrderId SERIAL PRIMARY KEY,
CustomerId INT NOT NULL,
EmployeeId INT NOT NULL,
OrderDate Date NOT NULL,
ShipperId INT NOT NULL,
FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId),
FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeId),
FOREIGN KEY (ShipperId) REFERENCES Shippers(ShipperId)
)
