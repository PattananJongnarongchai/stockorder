import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartItem } from "@/pages/dashboard/types"; // Adjust the import path

interface CheckoutBarProps {
  cartItems: CartItem[];
  tax: number;
  onIncreaseQuantity: (productName: string) => void;
  onDecreaseQuantity: (productName: string) => void;
  onRemoveItem: (productName: string) => void;
  onCheckout: () => void;
  onClearCart: () => void; // Add this prop to handle cart clearing
}

export const CheckoutBar: React.FC<CheckoutBarProps> = ({
  cartItems,
  tax,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  onCheckout,
  onClearCart, // Use the new prop
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleCheckout = () => {
    setOpenDialog(true);
  };

  const handleConfirmCheckout = () => {
    setOpenDialog(false);
    onCheckout();
    onClearCart(); // Clear the cart after checkout
    setSnackbarMessage("Checkout successful");
    setOpenSnackbar(true);
  };

  const handleCancelCheckout = () => {
    setOpenDialog(false);
  };

  const calculateTotal = (items: CartItem[]): number => {
    return items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  };

  const totalAmount = calculateTotal(cartItems);
  const taxAmount = (totalAmount * tax) / 100;
  const finalTotal = totalAmount + taxAmount;

  return (
    <>
      <Card
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Cart Items
          </Typography>
          <List dense>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${item.product.name} x ${item.quantity}`}
                    secondary={`$${(item.product.price * item.quantity).toFixed(
                      2
                    )}`}
                  />
                  <IconButton
                    onClick={() => onIncreaseQuantity(item.product.name)}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => onDecreaseQuantity(item.product.name)}
                    disabled={item.quantity === 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={() => onRemoveItem(item.product.name)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No products in the cart." />
              </ListItem>
            )}
          </List>
        </CardContent>
        <Box sx={{ padding: 2 }}>
          <Typography variant="body1">
            Tax ({tax}%): ${taxAmount.toFixed(2)}
          </Typography>
          <Typography variant="h6">Total: ${finalTotal.toFixed(2)}</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, width: "100%" }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Box>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog open={openDialog} onClose={handleCancelCheckout}>
        <DialogTitle>Confirm Checkout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have the following items in your cart:
          </DialogContentText>
          <List dense>
            {cartItems.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${item.product.name} x ${item.quantity}`}
                  secondary={`$${(item.product.price * item.quantity).toFixed(
                    2
                  )}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Total: ${finalTotal.toFixed(2)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelCheckout} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmCheckout} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CheckoutBar;
