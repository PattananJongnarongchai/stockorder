// pages/employees.tsx

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

const employees = [
  {
    id: 1,
    name: "John Doe",
    position: "Software Engineer",
    imageUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Product Manager",
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    id: 3,
    name: "Alice Johnson",
    position: "UX Designer",
    imageUrl:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
  },
  {
    id: 4,
    name: "Bob Brown",
    position: "DevOps Engineer",
    imageUrl:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
  },
  {
    id: 5,
    name: "Charlie Black",
    position: "Data Scientist",
    imageUrl:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
  },
  // Add more employees as needed
];

const EmployeeList = () => {
  const router = useRouter();

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
                  image={employee.imageUrl}
                  alt={employee.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {employee.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {employee.position}
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
