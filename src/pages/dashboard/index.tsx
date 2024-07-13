"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Grid,
  Typography,
  Chip,
  Box,
  Button,
  Pagination,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import ProductCard from "@/components/productcard/ProductCard";
import CheckoutBar from "@/components/checkoutbar/"; // Adjust the import path
import { Product, Category, CartItem } from "../../components/types";
import AuthContext from "../../contexts/AuthContext";

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const token = authContext?.token;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(7); // Example tax rate

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [startDate, endDate, page]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/products", {
        params: {
          startDate: startDate
            ? startDate.toISOString().split("T")[0]
            : undefined,
          endDate: endDate ? endDate.toISOString().split("T")[0] : undefined,
          page,
          limit: 10,
        },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find(
        (item) => item.product.name === product.name
      );
      if (itemExists) {
        return prevCart.map((item) =>
          item.product.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleIncreaseQuantity = (productName: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.name === productName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (productName: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.name === productName && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (productName: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.name !== productName)
    );
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("No items in the cart.");
      return;
    }

    axios
      .post(
        "http://localhost:3001/api/checkout",
        { cartItems: cart },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const { total, taxAmount, subtotal, taxRate } = response.data;
        setSubtotal(subtotal);
        setTaxAmount(taxAmount);
        setTotal(total);
        setTaxRate(taxRate); // Store taxRate
        handleClearCart();
        setSnackbarMessage(
          `Checkout successful. Total: $${total.toFixed(
            2
          )}, Tax: $${taxAmount.toFixed(2)}, Subtotal: $${subtotal.toFixed(2)}`
        );
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error("There was an error during checkout!", error);
        if (error.response && error.response.status === 403) {
          alert(
            "You are not authorized to perform this action. Please log in again."
          );
        } else {
          alert("Checkout failed.");
        }
      });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const filteredProducts: Product[] = selectedCategory
    ? products.filter((product) => product.category_id === selectedCategory.id)
    : products;

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        gap: 2,
        justifyContent: "space-between",
        padding: 2,
        height: "90vh",
      }}
    >
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .scrollableDiv::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .scrollableDiv {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}
      </style>
      <Box
        className="scrollableDiv"
        sx={{
          width: "70%",
          height: "100%",
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: 2,
          padding: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          All Products
        </Typography>
        <div style={{ margin: "20px 0" }}>
          {categories.map((category) => (
            <Chip
              key={category.id}
              label={category.name}
              onClick={() => handleCategorySelect(category)}
              color={selectedCategory === category ? "primary" : "default"}
              style={{ marginRight: 10 }}
            />
          ))}
          <Chip
            label="All"
            onClick={() => setSelectedCategory(null)}
            color={!selectedCategory ? "primary" : "default"}
          />
        </div>
        <Grid container spacing={2} justifyContent="flex-start">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </Grid>
            ))
          ) : (
            <Typography>No products found.</Typography>
          )}
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{ display: "flex", justifyContent: "center" }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "30%",
          border: "1px solid #ddd",
          borderRadius: 2,
          padding: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CheckoutBar
          cartItems={cart}
          taxRate={taxRate}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
          onClearCart={handleClearCart}
        />
      </Box>
    </Container>
  );
};

export default Dashboard;
function setSnackbarMessage(arg0: string) {
  throw new Error("Function not implemented.");
}

function setOpenSnackbar(arg0: boolean) {
  throw new Error("Function not implemented.");
}

