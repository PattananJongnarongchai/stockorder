import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  IconButton,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { Product, Category } from "@/components/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { SelectChangeEvent } from "@mui/material/Select";

const ManageDishes: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newProduct, setNewProduct] = useState<any>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    category_id: selectedCategory ? selectedCategory.id : "",
    image: null,
  });
  const [editProduct, setEditProduct] = useState<any>(null);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, []);

  const fetchCategoriesAndProducts = async () => {
    try {
      const categoriesResponse = await axios.get(
        "http://localhost:3001/api/categories"
      );
      setCategories(categoriesResponse.data);

      const productsResponse = await axios.get(
        "http://localhost:3001/api/products"
      );
      setProducts(productsResponse.data.products);
    } catch (error) {
      console.error("Error fetching categories and products:", error);
    }
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleAddProduct = () => {
    setEditProduct(null);
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      description: "",
      category_id: selectedCategory ? selectedCategory.id : "",
      image: null,
    });
    setOpenProductDialog(true);
  };

  const handleAddCategory = () => {
    setOpenCategoryDialog(true);
  };

  const handleProductDialogClose = () => {
    setOpenProductDialog(false);
    setValidationError("");
  };

  const handleCategoryDialogClose = () => {
    setOpenCategoryDialog(false);
  };

  const handleProductInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      const file = files[0];
      if (file.type === "image/jpeg") {
        setNewProduct({ ...newProduct, image: file });
        setValidationError("");
      } else {
        setValidationError("Only .jpg files are allowed!");
      }
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleProductSelectChange = (e: SelectChangeEvent<any>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleProductSubmit = async () => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.stock ||
      !newProduct.category_id
    ) {
      setValidationError("Please fill out all fields");
      return;
    }

    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    try {
      const response = await axios.post(
        "http://localhost:3001/api/products",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProducts([...products, response.data]);
      setOpenProductDialog(false);
      setSeverity("success");
      setSnackbarMessage("Product added successfully");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error adding product:", error);
      setSeverity("error");
      setSnackbarMessage("Error adding product");
      setOpenSnackbar(true);
    }
  };

  const handleCategorySubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/categories",
        newCategory
      );
      setCategories([...categories, response.data]);
      setOpenCategoryDialog(false);
      setSeverity("success");
      setSnackbarMessage("Category added successfully");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error adding category:", error);
      setSeverity("error");
      setSnackbarMessage("Error adding category");
      setOpenSnackbar(true);
    }
  };

  const handleProductEdit = (product: Product) => {
    setEditProduct(product);
    setNewProduct({
      ...product,
      image: null,
    });
    setOpenProductDialog(true);
  };

  const handleProductUpdate = async (id: number) => {
    const formData = new FormData();
    Object.entries(editProduct).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    try {
      const response = await axios.put(
        `http://localhost:3001/api/products/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProducts(
        products.map((product) => (product.id === id ? response.data : product))
      );
      setOpenProductDialog(false);
      setSeverity("success");
      setSnackbarMessage("Product updated successfully");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating product:", error);
      setSeverity("error");
      setSnackbarMessage("Error updating product");
      setOpenSnackbar(true);
    }
  };

  const handleProductDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      setSeverity("success");
      setSnackbarMessage("Product deleted successfully");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting product:", error);
      setSeverity("error");
      setSnackbarMessage("Error deleting product");
      setOpenSnackbar(true);
    }
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
        border: "1px solid #ddd",
        borderRadius: 2,
        padding: 2,
        height: "90vh",
      }}
    >
      <Box
        sx={{
          width: "20%",
          border: "1px solid #ddd",
          borderRadius: 2,
          padding: 2,
          overflowY: "auto",
        }}
      >
        <Typography variant="contained" gutterBottom>
          ประเภทสินค้า
        </Typography>
        <List>
          {categories.map((category) => (
            <ListItem
              button
              key={category.id}
              onClick={() => handleCategorySelect(category)}
            >
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
          <ListItem button onClick={() => setSelectedCategory(null)}>
            <ListItemText primary="All" />
          </ListItem>
        </List>
        <Button variant="contained" color="primary" onClick={handleAddCategory}>
          เพิ่มประเภทสินค้า
        </Button>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          border: "1px solid #ddd",
          borderRadius: 2,
          padding: 2,
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h6">
            {selectedCategory ? selectedCategory.name : "สินค้าทั้งหมด"}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                height: "100%",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 3,
                },
              }}
              onClick={handleAddProduct}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <AddCircleOutlineIcon sx={{ fontSize: 50 }} />
                <Typography variant="h6">เพิ่มสินค้าใหม่</Typography>
              </CardContent>
            </Card>
          </Grid>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={2.4}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:3001${product.image}`}
                  alt={product.name}
                  sx={{ height: 200, objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${parseFloat(product.price as any).toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stock: {product.stock}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 2,
                    }}
                  >
                    <IconButton
                      onClick={() => handleProductEdit(product)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleProductDelete(product.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog
        open={openProductDialog}
        onClose={handleProductDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editProduct ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            variant="standard"
            value={newProduct.name}
            onChange={handleProductInputChange}
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            fullWidth
            variant="standard"
            value={newProduct.price}
            onChange={handleProductInputChange}
          />
          <TextField
            margin="dense"
            label="Stock"
            name="stock"
            fullWidth
            variant="standard"
            value={newProduct.stock}
            onChange={handleProductInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            variant="standard"
            value={newProduct.description}
            onChange={handleProductInputChange}
          />
          <FormControl fullWidth variant="standard" sx={{ marginY: 2 }}>
            <InputLabel>ประเภทสินค้า</InputLabel>
            <Select
              name="category_id"
              value={newProduct.category_id}
              onChange={handleProductSelectChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" component="label">
            อัพโหลดรูปภาพ
            <input
              type="file"
              hidden
              name="image"
              onChange={handleProductInputChange}
            />
          </Button>
          {validationError && (
            <Typography color="error" variant="body2">
              {validationError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProductDialogClose}>ยกเลิก</Button>
          <Button
            onClick={
              editProduct
                ? () => handleProductUpdate(editProduct.id)
                : handleProductSubmit
            }
          >
            {editProduct ? "แก้ไข" : "เพิ่ม"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openCategoryDialog}
        onClose={handleCategoryDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>เพิ่มประเภทสินค้าใหม่</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Category Name"
            name="name"
            fullWidth
            variant="standard"
            onChange={handleCategoryChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCategoryDialogClose}>ยกเลิก</Button>
          <Button onClick={handleCategorySubmit}>เพิ่ม</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ManageDishes;
