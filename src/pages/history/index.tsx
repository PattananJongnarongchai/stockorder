import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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

const data = [
  { name: "Jan", uv: 400 },
  { name: "Feb", uv: 300 },
  { name: "Mar", uv: 200 },
  { name: "Apr", uv: 278 },
  { name: "May", uv: 189 },
  { name: "Jun", uv: 239 },
  { name: "Jul", uv: 349 },
  { name: "Aug", uv: 200 },
  { name: "Sep", uv: 278 },
  { name: "Oct", uv: 189 },
  { name: "Nov", uv: 239 },
  { name: "Dec", uv: 349 },
];

const historyData = [
  {
    date: "2023-06-17 13:55",
    number: "100026",
    items: 1,
    warehouse: "Store 1",
    supplier: "USA Foods",
    bookedOn: "2023-06-13 16:02",
    bookedBy: "Anderson Jones",
    sent: "Yes",
    description: "Sample description",
  },
  // Add more data as needed
];

const HistoryPage = () => {
  return (
    <Container maxWidth="lg" className="mt-5">
      <Grid container spacing={3}>
        {/* Sales History Chart */}
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Sales History</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <Tooltip />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent History Table */}
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Recent Transactions</Typography>
            <TableContainer>
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
                  {historyData.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.number}</TableCell>
                      <TableCell>{entry.items}</TableCell>
                      <TableCell>{entry.warehouse}</TableCell>
                      <TableCell>{entry.supplier}</TableCell>
                      <TableCell>{entry.bookedOn}</TableCell>
                      <TableCell>{entry.bookedBy}</TableCell>
                      <TableCell>{entry.sent}</TableCell>
                      <TableCell>{entry.description}</TableCell>
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

export default HistoryPage;
