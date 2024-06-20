import React from "react";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
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

const Dashboard = () => {
  return (
    <Container maxWidth="lg" className="mt-5">
      <Grid container spacing={3}>
        {/* Sales Chart */}
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Sales Chart</Typography>
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

        {/* Recent Deposits */}
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: 16, textAlign: "center" }}>
            <Typography variant="h6">Recent Deposits</Typography>
            <Typography component="p" variant="h4">
              $3,024.00
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 16 }}
            >
              View Balance
            </Button>
          </Paper>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Recent Orders</Typography>
            {/* You can add a table or list here */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
