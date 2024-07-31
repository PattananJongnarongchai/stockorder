import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useRouter } from "next/router";
import styles from "@/styles/EmployeeList.module.css";

interface Employee {
  id: number;
  username: string;
  role: string;
}

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/api/users")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleCardClick = (id: number) => {
    router.push(`/employees/${id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={3}>
        {employees.map((employee) => (
          <Grid item xs={12} sm={6} md={3} key={employee.id}>
            <Card className={styles.card}>
              <CardActionArea onClick={() => handleCardClick(employee.id)}>
                <CardMedia
                  component="img"
                  className={styles.media}
                  image="https://via.placeholder.com/150"
                  alt={employee.username}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {employee.username}
                  </Typography>
                  <Typography color="text.secondary">
                    {employee.role}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default EmployeeList;
