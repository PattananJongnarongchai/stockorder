"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableSortLabel,
  SelectChangeEvent,
} from "@mui/material";

interface Transaction {
  id: number;
  product_id: number;
  quantity: number;
  total_price: number | string;
  date: string;
  order_id: number;
  type: string;
}

type Order = "asc" | "desc";

const ProductTransactions: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterType, setFilterType] = useState<string>("");
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Transaction>("id");

  useEffect(() => {
    if (id) {
      fetchTransactions();
    }
  }, [id, filterType, order, orderBy]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/product-transactions/${id}`,
        {
          params: {
            type: filterType || undefined, // Only include type if filterType is set
          },
        }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setFilterType(event.target.value);
  };

  const handleRequestSort = (property: keyof Transaction) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedTransactions = transactions.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  const formatPrice = (price: number | string) => {
    const num = typeof price === "number" ? price : parseFloat(price);
    return isNaN(num) ? "N/A" : num.toFixed(2);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Product Transactions
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => router.back()}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === "id" ? order : false}>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? order : "asc"}
                  onClick={() => handleRequestSort("id")}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={orderBy === "product_id" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "product_id"}
                  direction={orderBy === "product_id" ? order : "asc"}
                  onClick={() => handleRequestSort("product_id")}
                >
                  Product ID
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "quantity" ? order : false}>
                <TableSortLabel
                  active={orderBy === "quantity"}
                  direction={orderBy === "quantity" ? order : "asc"}
                  onClick={() => handleRequestSort("quantity")}
                >
                  Quantity
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={orderBy === "total_price" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "total_price"}
                  direction={orderBy === "total_price" ? order : "asc"}
                  onClick={() => handleRequestSort("total_price")}
                >
                  Total Price
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "date" ? order : false}>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : "asc"}
                  onClick={() => handleRequestSort("date")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "order_id" ? order : false}>
                <TableSortLabel
                  active={orderBy === "order_id"}
                  direction={orderBy === "order_id" ? order : "asc"}
                  onClick={() => handleRequestSort("order_id")}
                >
                  Order ID
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "type" ? order : false}>
                <TableSortLabel
                  active={orderBy === "type"}
                  direction={orderBy === "type" ? order : "asc"}
                  onClick={() => handleRequestSort("type")}
                >
                  Type
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTransactions.length > 0 ? (
              sortedTransactions.map((transaction) => (
                <TableRow key={transaction.id} hover>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.product_id}</TableCell>
                  <TableCell>{transaction.quantity}</TableCell>
                  <TableCell>{formatPrice(transaction.total_price)}</TableCell>
                  <TableCell>{transaction.date.split("T")[0]}</TableCell>
                  <TableCell>{transaction.order_id}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductTransactions;
