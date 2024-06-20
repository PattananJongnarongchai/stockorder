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
  Typography,
  TableContainer,
} from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const inventoryCutData = [
  { date: "2023-06-17", stockBefore: 100, stockAfter: 80 },
  { date: "2023-06-18", stockBefore: 80, stockAfter: 70 },
  // Add more data as needed
];

const InventoryCutPage = () => {
  const [inventoryCutEntries, setInventoryCutEntries] =
    useState(inventoryCutData);
  const [formData, setFormData] = useState({
    date: "",
    stockBefore: "",
    stockAfter: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInventoryCutEntries([...inventoryCutEntries, formData]);
    setFormData({ date: "", stockBefore: "", stockAfter: "" });
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Inventory Cut</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Stock Before"
                    type="number"
                    name="stockBefore"
                    value={formData.stockBefore}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Stock After"
                    type="number"
                    name="stockAfter"
                    value={formData.stockAfter}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Add Entry
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Inventory Cut History</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Stock Before</TableCell>
                    <TableCell>Stock After</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventoryCutEntries.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.stockBefore}</TableCell>
                      <TableCell>{entry.stockAfter}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InventoryCutPage;
