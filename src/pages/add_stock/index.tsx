import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const AddButton = styled(Button)({
  backgroundColor: "#1976d2",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#1565c0",
  },
});

interface Category {
  id: string;
  name: string;
}

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // Default to current date
    name: "",
    price: "",
    stock: "",
    image: null as File | null,
    category: "",
    description: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key as keyof typeof formData] as string | Blob);
    }

    axios
      .post("http://localhost:3001/api/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Product added successfully");
        setFormData({
          date: new Date().toISOString().split("T")[0], // Reset to current date
          name: "",
          price: "",
          stock: "",
          image: null,
          category: "",
          description: "",
        });
      })
      .catch((error) => {
        console.error("There was an error adding the product!", error);
      });
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={1} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Add Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                accept="image/jpeg"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="image-upload">
                <Button variant="contained" component="span" fullWidth>
                  Upload Image
                </Button>
              </label>
              {formData.image && (
                <Typography variant="body2" color="textSecondary">
                  {formData.image.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <AddButton type="submit" fullWidth>
                Add Product
              </AddButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProduct;
