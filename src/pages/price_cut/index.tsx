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

const priceCutData = [
  { date: "2023-06-17", priceBefore: 100, priceAfter: 90 },
  { date: "2023-06-18", priceBefore: 90, priceAfter: 85 },
  // Add more data as needed
];

const PriceCutPage = () => {
  const [priceCutEntries, setPriceCutEntries] = useState(priceCutData);
  const [formData, setFormData] = useState({
    date: "",
    priceBefore: "",
    priceAfter: "",
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
    setPriceCutEntries([...priceCutEntries, formData]);
    setFormData({ date: "", priceBefore: "", priceAfter: "" });
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Price Cut</Typography>
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
                    label="Price Before"
                    type="number"
                    name="priceBefore"
                    value={formData.priceBefore}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Price After"
                    type="number"
                    name="priceAfter"
                    value={formData.priceAfter}
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
            <Typography variant="h6">Price Cut History</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Price Before</TableCell>
                    <TableCell>Price After</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {priceCutEntries.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.priceBefore}</TableCell>
                      <TableCell>{entry.priceAfter}</TableCell>
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

export default PriceCutPage;
