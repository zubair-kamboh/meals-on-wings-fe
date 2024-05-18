INSERT INTO `meals_on_wings_db`.`restaurant_details` (`rest_name`, `rest_loc`, `rest_email`, `rest_password`) VALUES
('McDonald\'s', '123 Bourke St, Melbourne', 'mcdonalds@example.com', 'password123'),
('KFC', '456 Swanston St, Melbourne', 'kfc@example.com', 'kfc123'),
('Subway', '789 Collins St, Melbourne', 'subway@example.com', 'subway456'),
('Hungry Jack\'s', '101 Flinders Ln, Melbourne', 'hungryjacks@example.com', 'hungry123'),
('Domino\'s Pizza', '222 Elizabeth St, Melbourne', 'dominos@example.com', 'dominos789');


INSERT INTO `meals_on_wings_db`.`restaurant_menu` (`rest_id`, `fd_id`, `fd_name`, `fd_image`, `fd_price`, `fd_weight`, `fd_desc`, `fd_status`) VALUES
(1, 1, 'Big Mac', 'big_mac.jpg', 5.99, 250.00, 'Classic burger with two beef patties', 'available'),
(1, 2, 'McChicken', 'mcchicken.jpg', 4.50, 180.00, 'Crispy chicken burger with lettuce', 'available'),
(1, 3, 'French Fries (Large)', 'fries_large.jpg', 3.00, 300.00, 'Large portion of golden fries', 'available');


-- Dummy data for KFC
INSERT INTO `meals_on_wings_db`.`restaurant_menu` (`rest_id`, `fd_id`, `fd_name`, `fd_image`, `fd_price`, `fd_weight`, `fd_desc`, `fd_status`) VALUES
(2, 1, 'Original Recipe Chicken', 'original_chicken.jpg', 8.99, 300.00, 'Signature KFC fried chicken', 'available'),
(2, 2, 'Twister Wrap', 'twister_wrap.
jpg', 6.50, 220.00, 'Grilled or crispy chicken wrap', 'available'),
(2, 3, 'Popcorn Chicken (Medium)', 'popcorn_chicken_medium.jpg', 4.00, 150.00, 'Crunchy bite-sized chicken pieces', 'available');

-- Dummy data for Subway
INSERT INTO `meals_on_wings_db`.`restaurant_menu` (`rest_id`, `fd_id`, `fd_name`, `fd_image`, `fd_price`, `fd_weight`, `fd_desc`, `fd_status`) VALUES
(3, 1, 'Italian B.M.T. Sandwich', 'bmt_sandwich.jpg', 7.99, 400.00, 'Sub filled with spicy Italian meats', 'available'),
(3, 2, 'Roast Beef Salad', 'roast_beef_salad.jpg', 6.00, 350.00, 'Fresh salad with roast beef slices', 'available'),
(3, 3, 'Cookies (Small)', 'cookies_small.jpg', 2.50, 100.00, 'Chocolate chip cookies', 'available');

-- Dummy data for Hungry Jack's
INSERT INTO `meals_on_wings_db`.`restaurant_menu` (`rest_id`, `fd_id`, `fd_name`, `fd_image`, `fd_price`, `fd_weight`, `fd_desc`, `fd_status`) VALUES
(4, 1, 'Whopper', 'whopper.jpg', 6.99, 350.00, 'Flame-grilled beef burger', 'available'),
(4, 2, 'Chicken Royale', 'chicken_royale.jpg', 5.50, 200.00, 'Crispy chicken burger', 'available'),
(4, 3, 'Onion Rings (Large)', 'onion_rings_large.jpg', 4.00, 400.00, 'Golden fried onion rings', 'available');

-- Dummy data for Domino's Pizza
INSERT INTO `meals_on_wings_db`.`restaurant_menu` (`rest_id`, `fd_id`, `fd_name`, `fd_image`, `fd_price`, `fd_weight`, `fd_desc`, `fd_status`) VALUES
(5, 1, 'Pepperoni Pizza (Large)', 'pepperoni_pizza_large.jpg', 12.99, 1000.00, 'Classic pizza with pepperoni topping', 'available'),
(5, 2, 'Garlic Bread', 'garlic_bread.jpg', 4.99, 200.00, 'Buttery garlic breadsticks', 'available'),
(5, 3, 'Chocolate Lava Cake', 'chocolate_lava_cake.jpg', 3.99, 150.00, 'Warm chocolate cake with gooey center', 'available');