"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
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
} from "@mui/material";

interface Transaction {
  id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  date: string;
  order_id: number;
  type: string;
}

const ProductDetail: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/product-transactions/${productId}`
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Product Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.product_id}</TableCell>
                  <TableCell>{transaction.quantity}</TableCell>
                  <TableCell>{transaction.total_price}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
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

export default ProductDetail;
