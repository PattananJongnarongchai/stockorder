import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  TextField,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import AuthContext from "../../contexts/AuthContext";
import InfoIcon from "@mui/icons-material/Info";

interface Order {
  id: number;
  date: string;
  total_price: number;
  user_id: string;
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { isAuthenticated, token } = useContext(AuthContext);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const router = useRouter();

  const fetchOrders = (start?: string, end?: string, page = 1) => {
    if (isAuthenticated && token) {
      axios
        .get("http://localhost:3001/orders", {
          params: {
            startDate: start,
            endDate: end,
            // page,
            limit: 10,
          },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setOrders(response.data.orders);
          setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchOrders();
  }, [isAuthenticated, token]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    if (startDate && endDate) {
      const formattedStart = format(startDate, "yyyy-MM-dd");
      const formattedEnd = format(endDate, "yyyy-MM-dd");
      fetchOrders(formattedStart, formattedEnd, page);
    } else {
      fetchOrders(undefined, undefined, page);
    }
  };

  const handleSearch = () => {
    if (startDate && endDate) {
      const formattedStart = format(startDate, "yyyy-MM-dd");
      const formattedEnd = format(endDate, "yyyy-MM-dd");
      fetchOrders(formattedStart, formattedEnd, currentPage);
    }
  };

  const handleRowClick = (id: number) => {
    router.push(`/details/${id}`);
  };

  return (
    <Box className="mx-4" sx={{ padding: 2 }}>
      <Typography variant="h3" color="initial" gutterBottom>
        Stock History
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <TextField label="Search" variant="outlined" sx={{ minWidth: 200 }} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="End Date"
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.total_price}</TableCell>
                  <TableCell>{order.user_id}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleRowClick(order.id)}
                    >
                      <InfoIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default OrderHistory;
