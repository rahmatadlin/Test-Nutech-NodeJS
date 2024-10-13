-- Table to store users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,         -- Unique identifier for each user
  first_name VARCHAR(100) NOT NULL,         -- User's first name, cannot be null
  last_name VARCHAR(100) NOT NULL,          -- User's last name, cannot be null
  email VARCHAR(100) NOT NULL UNIQUE,       -- User's email, must be unique and cannot be null
  password VARCHAR(255) NOT NULL,           -- User's password, cannot be null
  balance BIGINT DEFAULT 0,                 -- User's balance, using BIGINT for larger values; defaults to 0
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp of when the record was created
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Timestamp for when the record was last updated
);

-- Table to store banners
CREATE TABLE banners (
  id INT AUTO_INCREMENT PRIMARY KEY,              -- Unique identifier for each banner
  banner_name VARCHAR(255) NOT NULL,              -- Name of the banner
  banner_image VARCHAR(255) NOT NULL,             -- URL of the banner image
  description VARCHAR(255) NOT NULL,              -- Short description of the banner
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the record is created
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp when the record is last updated
);

-- Table to store services
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,         -- Auto-incrementing ID for each service
  service_code VARCHAR(50) NOT NULL,         -- Unique code for the service (e.g., "PLN", "PULSA")
  service_name VARCHAR(100) NOT NULL,        -- Name of the service (e.g., "Listrik", "Pulsa")
  service_icon VARCHAR(255) NOT NULL,        -- URL to the service icon (e.g., image link)
  service_tariff INT NOT NULL,               -- Tariff for the service using INT
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp for when the service was created
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp for the last update
);


-- Table to store transactions
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for each transaction
    user_id INT NOT NULL,                 -- Foreign key referencing the users table (ID of the user making the transaction)
    service_id INT NOT NULL,              -- Foreign key referencing the services table (ID of the service being transacted)
    invoice_number VARCHAR(50) NOT NULL,  -- Invoice number for the transaction
    transaction_type ENUM('PAYMENT', 'TOPUP') NOT NULL,  -- Type of transaction, can be either PAYMENT or TOPUP
    total_amount INT NOT NULL,            -- Total amount for the transaction
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,      -- Timestamp for when the transaction was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Timestamp for when the transaction was last updated
    FOREIGN KEY (user_id) REFERENCES users(id),          -- Foreign key constraint to ensure user_id exists in the users table
    FOREIGN KEY (service_id) REFERENCES services(id)     -- Foreign key constraint to ensure service_id exists in the services table
);


