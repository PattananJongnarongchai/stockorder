import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";

export default function InventoryTable() {
  const [rows, setRows] = useState([
    {
      id: 1,
      date: "6/17/23, 1:55 PM",
      number: "100026",
      items: 1,
      warehouse: "Store 1",
      supplier: "USA Foods",
      bookedOn: "6/13/23, 4:02 PM",
      bookedBy: "Anderson Jones",
      sent: true,
      description: "",
      isEditing: false,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: "",
    number: "",
    items: 0,
    warehouse: "",
    supplier: "",
    bookedOn: "",
    bookedBy: "",
    sent: false,
    description: "",
  });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewEntry({
      ...newEntry,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAdd = () => {
    setRows([...rows, { ...newEntry, id: rows.length + 1, isEditing: false }]);
    setNewEntry({
      date: "",
      number: "",
      items: 0,
      warehouse: "",
      supplier: "",
      bookedOn: "",
      bookedBy: "",
      sent: false,
      description: "",
    });
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleEditToggle = (id) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, isEditing: !row.isEditing };
      }
      return row;
    });
    setRows(newRows);
  };

  const handleChange = (id, field, value) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  return (
    <Paper style={{ margin: "16px", padding: "16px" }}>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add New Inventory Item</DialogTitle>
        <DialogContent>
          <TextField
            name="number"
            label="Number"
            fullWidth
            margin="dense"
            value={newEntry.number}
            onChange={handleInputChange}
          />
          <TextField
            name="items"
            label="Items"
            type="number"
            fullWidth
            margin="dense"
            value={newEntry.items}
            onChange={handleInputChange}
          />
          <TextField
            name="warehouse"
            label="Warehouse"
            fullWidth
            margin="dense"
            value={newEntry.warehouse}
            onChange={handleInputChange}
          />
          <TextField
            name="supplier"
            label="Supplier"
            fullWidth
            margin="dense"
            value={newEntry.supplier}
            onChange={handleInputChange}
          />
          <TextField
            name="bookedBy"
            label="Booked By"
            fullWidth
            margin="dense"
            value={newEntry.bookedBy}
            onChange={handleInputChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newEntry.sent}
                onChange={handleInputChange}
                name="sent"
              />
            }
            label="Sent"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer>
        <Table aria-label="inventory table">
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {Object.keys(row)
                  .filter((key) => key !== "id" && key !== "isEditing")
                  .map((key) => (
                    <TableCell key={key}>
                      {row.isEditing && key !== "sent" ? (
                        <TextField
                          value={row[key]}
                          onChange={(e) =>
                            handleChange(row.id, key, e.target.value)
                          }
                          type={key === "items" ? "number" : "text"}
                        />
                      ) : key === "sent" ? (
                        row[key] ? (
                          "Yes"
                        ) : (
                          "No"
                        )
                      ) : (
                        row[key]
                      )}
                    </TableCell>
                  ))}
                <TableCell>
                  {row.isEditing ? (
                    <IconButton
                      color="primary"
                      onClick={() => handleEditToggle(row.id)}
                    >
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      color="primary"
                      onClick={() => handleEditToggle(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
