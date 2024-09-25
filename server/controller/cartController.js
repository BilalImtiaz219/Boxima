import Cart from '../models/cart.js';

// Add or update an item in the cart
export const addOrUpdateCartItem = async (req, res) => {
  const { userID, productID, quantity } = req.body;

  try {
    // Find the cart by userID
    let cart = await Cart.findOne({ userID });
    

    // If cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({
        userID,
        items: [{ productID, quantity }]
      });
    } else {
      // Find if the product already exists in the cart
      const existingItemIndex = cart.items.findIndex(item => item.productID === productID);

      if (existingItemIndex > -1) {
        // If the product exists, update the quantity
        cart.items[existingItemIndex].quantity = quantity;
      } else {
        // If the product doesn't exist, add it to the cart
        cart.items.push({ productID, quantity });
      }
    }

    // Save the cart
    await cart.save();
    res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
};

// Get all carts
export const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find({});
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching carts', error });
  }
};

// Get a cart by userID
export const getCartByUserID = async (req, res) => {
  const { userID } = req.params;

  try {
    const cart = await Cart.findOne({ userID });
    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
};

// Update an existing cart by id
export const updateCartById = async (req, res) => {
  const { cartID } = req.params; // Extract cartID from request params
  const { items } = req.body; // Extract items from the request body

  try {
    // Find the cart by its _id
    const cart = await Cart.findById(cartID);
    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }

    // Update cart items
    items.forEach(item => {
      const existingItemIndex = cart.items.findIndex(i => i.productID === item.productID);
      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity = item.quantity;
      } else {
        cart.items.push(item);
      }
    });

    // Save the updated cart
    await cart.save();
    res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
};


// Delete a cart by id
export const deleteCart = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the cart by its _id and remove it
    const cart = await Cart.findByIdAndDelete(id);
    
    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cart', error });
  }
};

// Remove an item from the cart
export const removeCartItem = async (req, res) => {
  const { userID, itemID } = req.body;

  try {
    // Find the cart by userID
    let cart = await Cart.findOne({ userID });

    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }

    // Find the item by itemID (_id in the items array) and remove it
    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemID);

    if (itemIndex === -1) {
      return res.status(400).json({ message: 'Item not found in cart' });
    }

    // Remove the item from the items array
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();
    res.status(200).json({ message: 'Item removed successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};