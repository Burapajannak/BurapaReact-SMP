import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import './App.css';

const validationSchema = Yup.object({
  firstname: Yup.string().required("First name is required."),
  lastname: Yup.string().required("Last name is required."),
  gender: Yup.string().required("Gender is required."),
  score: Yup.number()
    .typeError("Score must be a number.")
    .required("Score is required.")
    .min(0, "Minimum is 0.")
    .max(100, "Maximum is 100."),
});

const genderOptions = [
  { value: "F", label: "Female" },
  { value: "M", label: "Male" },
  { value: "U", label: "Unknown" },
];

const App = () => {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    // Fetch data from sample-data.json
    fetch("sample-data.json")
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleAdd = (values, { resetForm }) => {
    const newData = [...data];
    if (editIndex >= 0) {
      newData[editIndex] = values;
      setEditIndex(-1);
    } else {
      newData.push(values);
    }
    setData(newData);
    resetForm();
  };

  const handleEdit = (index, setValues) => {
    const item = data[index];
    setValues({
      firstname: item.firstname,
      lastname: item.lastname,
      gender: item.gender,
      score: item.score,
    });
    setEditIndex(index);
  };

  return (
    <Container style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          gender: "",
          score: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleAdd}
        enableReinitialize
      >
        {({ isSubmitting, resetForm, setValues, values, handleChange }) => (
          <>
            <Form style={{ display: "grid", gridTemplateColumns: "1fr 1fr", width: "50%", alignItems: "center" }}>
              <TextField
                name="firstname"
                label="First name"
                fullWidth
                margin="normal"
                error={Boolean(<ErrorMessage name="firstname" />)}
                helperText={<ErrorMessage name="firstname" />}
                sx={{ width: "100%", bgcolor: "#f0f0f0" }}
                value={values.firstname}
                onChange={handleChange}
              />
              <TextField
                name="lastname"
                label="Last name"
                fullWidth
                margin="normal"
                error={Boolean(<ErrorMessage name="lastname" />)}
                helperText={<ErrorMessage name="lastname" />}
                sx={{ marginLeft: "20px", width: "100%", bgcolor: "#f0f0f0" }}
                value={values.lastname}
                onChange={handleChange}
              />
              <TextField
                name="gender"
                select
                label="Gender"
                fullWidth
                margin="normal"
                error={Boolean(<ErrorMessage name="gender" />)}
                helperText={<ErrorMessage name="gender" />}
                sx={{ width: "100%", bgcolor: "#f0f0f0" }}
                value={values.gender}
                onChange={handleChange}
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="score"
                label="Score"
                fullWidth
                margin="normal"
                error={Boolean(<ErrorMessage name="score" />)}
                helperText={<ErrorMessage name="score" />}
                sx={{ marginLeft: "20px", width: "100%", bgcolor: "#f0f0f0" }}
                value={values.score}
                onChange={handleChange}
              />
              <div style={{ paddingBottom: "30px", paddingTop: "10px", width: "205%", display: "flex", justifyContent: "center", margin: "0 auto" }}>
                <Button
                  style={{ display: "flex", justifyContent: "center", margin: "0 auto", marginRight: "20px" }}
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  {editIndex >= 0 ? "Edit" : "Add"}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setEditIndex(-1);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell></TableCell>
                    <TableCell>First name</TableCell>
                    <TableCell>Last name</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(index, setValues)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>{row.firstname}</TableCell>
                      <TableCell>{row.lastname}</TableCell>
                      <TableCell>
                        <Tooltip
                          title={
                            row.gender === "F"
                              ? "Female"
                              : row.gender === "M"
                                ? "Male"
                                : "Unknown"
                          }
                        >
                          <span>{row.gender}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{parseFloat(row.score).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default App;
