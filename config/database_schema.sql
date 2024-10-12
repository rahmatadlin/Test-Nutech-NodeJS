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


-- Table to store transactions
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,                            -- Unique identifier for each transaction
  user_id INT NOT NULL,                                        -- Foreign key referencing the user who made the transaction
  amount BIGINT NOT NULL,                                     -- Amount involved in the transaction as a BIGINT
  transaction_type ENUM('pulsa', 'voucher game', 'paket internet', 'token listrik') NOT NULL,  -- Type of transaction
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,             -- Timestamp of when the transaction was created
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Foreign key constraint to ensure referential integrity; deletes related transactions when a user is deleted
);
