import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";

interface Sale {
  date: string;
  total: number;
}

interface User {
  id: number;
  username: string;
  role: string;
}

interface SalesData {
  user: User;
  sales: Sale[];
}

const SalesPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [salesData, setSalesData] = useState<SalesData | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/api/sales`, { params: { id } })
        .then((response) => {
          setSalesData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching sales data:", error);
        });
    }
  }, [id]);

  return (
    <Card style={{ maxWidth: "800px", margin: "20px auto" }}>
      <CardContent>
        {salesData && (
          <>
            <Typography variant="h4" component="div">
              Sales for {salesData.user.username}
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={salesData.sales}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SalesPage;
