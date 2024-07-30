// pages/employees/[id].tsx

import { useRouter } from "next/router";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const employeeDetails = {
  1: {
    name: "John Doe",
    position: "Software Engineer",
    imageUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    details: "Experienced in full-stack development.",
  },
  2: {
    name: "Jane Smith",
    position: "Product Manager",
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    details: "Expert in product lifecycle management.",
  },
  3: {
    name: "Alice Johnson",
    position: "UX Designer",
    imageUrl:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    details: "Passionate about user experience and design.",
  },
  4: {
    name: "Bob Brown",
    position: "DevOps Engineer",
    imageUrl:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    details: "Skilled in CI/CD and infrastructure management.",
  },
  5: {
    name: "Charlie Black",
    position: "Data Scientist",
    imageUrl:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    details: "Focused on data analysis and machine learning.",
  },
  // Add more details as needed
};

const EmployeeDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const employee = employeeDetails[id as keyof typeof employeeDetails];

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <Card style={{ maxWidth: "800px", margin: "20px auto" }}>
      <CardMedia
        component="img"
        image={employee.imageUrl}
        alt={employee.name}
        style={{ height: "400px", objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h4" component="div">
          {employee.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {employee.position}
        </Typography>
        <Typography variant="body1">{employee.details}</Typography>
      </CardContent>
    </Card>
  );
};

export default EmployeeDetails;
