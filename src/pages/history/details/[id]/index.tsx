"use client";

import React, { useEffect, useState } from "react";
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
} from "@mui/material";

interface OrderDetailProps {
  orderId: string;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState<any[]>([]);

  useEffect(() => {
    if (orderId) {
      axios
        .get(`http://localhost:3001/details/${orderId}`)
        .then((response) => {
          setOrderDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching order details:", error);
        });
    }
  }, [orderId]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Order Details
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
            {orderDetails.map((detail, index) => (
              <TableRow key={index}>
                <TableCell>{detail.id}</TableCell>
                <TableCell>{detail.product_id}</TableCell>
                <TableCell>{detail.quantity}</TableCell>
                <TableCell>{detail.total_price}</TableCell>
                <TableCell>{detail.date}</TableCell>
                <TableCell>{detail.order_id}</TableCell>
                <TableCell>{detail.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderDetail;
