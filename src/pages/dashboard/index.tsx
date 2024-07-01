"use client";
import React, { useState, useEffect, useContext } from "react";
import { Container, Grid, Typography, Chip, Box } from "@mui/material";
import axios from "axios";
import ProductCard from "@/components/productcard/ProductCard";
import CheckoutBar from "@/components/checkoutbar";
import { Product, Category, CartItem } from "./types";
import AuthContext from "../../contexts/AuthContext";

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    // Fetch categories from backend
    axios
      .get("http://localhost:3001/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch products from backend
    axios
      .get("http://localhost:3001/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

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

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("No items in the cart.");
      return;
    }

    axios
      .post(
        "http://localhost:3001/checkout",
        { cartItems: cart },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert("Checkout successful.");
        setCart([]);
      })
      .catch((error) => {
        console.error("There was an error during checkout!", error);
        alert("Checkout failed.");
      });
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
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
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
          tax={0}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
          onCheckout={handleCheckout}
        />
      </Box>
    </Container>
  );
};

export default Dashboard;
