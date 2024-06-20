import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
  Typography,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const AddButton = styled(Button)({
  backgroundColor: "#1976d2", // This matches the color in your screenshot
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#1565c0",
  },
});

const StockManagement = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    number: "",
    items: "",
    warehouse: "",
    supplier: "",
    bookedOn: "",
    bookedBy: "",
    sent: false,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries([...entries, formData]);
    setFormData({
      // Reset form
      date: "",
      number: "",
      items: "",
      warehouse: "",
      supplier: "",
      bookedOn: "",
      bookedBy: "",
      sent: false,
      description: "",
    });
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={1} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Add Stock
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Number"
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Items"
                type="text"
                name="items"
                value={formData.items}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Warehouse"
                type="text"
                name="warehouse"
                value={formData.warehouse}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Supplier"
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Booked On"
                type="text"
                name="bookedOn"
                value={formData.bookedOn}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Booked By"
                type="text"
                name="bookedBy"
                value={formData.bookedBy}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Description"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center">
                <Checkbox
                  checked={formData.sent}
                  onChange={handleChange}
                  name="sent"
                  color="primary"
                />
                <Typography variant="body1">Sent</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <AddButton type="submit" fullWidth>
                Add Entry
              </AddButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Paper elevation={1} style={{ marginTop: "20px", padding: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Warehouse</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Booked On</TableCell>
              <TableCell>Booked By</TableCell>
              <TableCell>Sent</TableCell>
              <TableCell>Description</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.number}</TableCell>
                <TableCell>{entry.items}</TableCell>
                <TableCell>{entry.warehouse}</TableCell>
                <TableCell>{entry.supplier}</TableCell>
                <TableCell>{entry.bookedOn}</TableCell>
                <TableCell>{entry.bookedBy}</TableCell>
                <TableCell>{entry.sent ? "Yes" : "No"}</TableCell>
                <TableCell>{entry.description}</TableCell>
                <TableCell> {/* Add action buttons here */}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default StockManagement;
