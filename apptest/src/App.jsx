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
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import "./App.css";

const validationSchema = Yup.object({
  firstname: Yup.string().required("First name is required."),
  lastname: Yup.string().required("Last name is required."),
  gender: Yup.string().required("Gender is required."),
  score: Yup.number()
    .typeError("Score must be a number.")
    .required("Score is required.")
    .min(0, "Minimum is 0")
    .max(100, "Maximum is 100"),
});

const genderOptions = [
  { value: "  ", label: "" }, // Empty option
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
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
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
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
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
            <Form
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                width: "50%",
                alignItems: "center",
              }}
            >
              <TextField
                name="firstname"
                label="First name"
                fullWidth
                margin="normal"
                error={Boolean(<ErrorMessage name="firstname" />)}
                helperText={<ErrorMessage name="firstname" />}
                sx={{
                  width: "100%",
                  bgcolor: "#f0f0f0",
                  borderBottom: "1px solid #f1f0f0",
                }}
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
                sx={{
                  marginLeft: "20px",
                  width: "100%",
                  bgcolor: "#f0f0f0",
                  borderBottom: "1px solid #f1f0f0",
                }}
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
                sx={{
                  width: "100%",
                  bgcolor: "#f0f0f0",
                  minWidth: "auto",
                  borderBottom: "1px solid #f1f0f0",
                }}
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
                sx={{
                  marginLeft: "20px",
                  width: "100%",
                  bgcolor: "#f0f0f0",
                  borderBottom: "1px solid #f1f0f0",
                }}
                value={values.score}
                onChange={handleChange}
              />
              <div
                style={{
                  paddingBottom: "30px",
                  paddingTop: "10px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "20px",
                    marginRight: "-105%",
                  }}
                >
                  <Button
                    style={{ margin: "0 10px" }}
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {editIndex >= 0 ? "Edit" : "Add"}
                  </Button>
                  <Button
                    style={{ margin: "0 10px" }}
                    type="button"
                    onClick={() => {
                      resetForm();
                      setEditIndex(-1);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Form>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#8da8d8" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#ffffff", borderRight: "1px solid #f1f0f0", width: "8%", textAlign: "center" }}>No.</TableCell>
                    <TableCell sx={{ color: "#ffffff", borderRight: "1px solid #f1f0f0", width: "5%" }}></TableCell>
                    <TableCell sx={{ color: "#ffffff", borderRight: "1px solid #f1f0f0" }}>First name</TableCell>
                    <TableCell sx={{ color: "#ffffff", borderRight: "1px solid #f1f0f0" }}>Last name</TableCell>
                    <TableCell sx={{ color: "#ffffff", borderRight: "1px solid #f1f0f0", textAlign: "center" }}>Gender</TableCell>
                    <TableCell sx={{ color: "#ffffff", borderRight: "1px solid #f1f0f0", textAlign: "center" }}>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#ffffff" : "#f0f4ff",
                        '&:hover': { backgroundColor: '#ececec' },
                      }}>
                      <TableCell style={{ borderBottom: "1px solid #f1f0f0", borderRight: "1px solid #f1f0f0", textAlign: "center" }}>{index + 1}</TableCell>
                      <TableCell style={{ borderBottom: "1px solid #f1f0f0", borderRight: "1px solid #f1f0f0" }}>
                        <IconButton
                          onClick={() => handleEdit(index, setValues)}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell style={{ borderBottom: "1px solid #f1f0f0", borderRight: "1px solid #f1f0f0" }}>{row.firstname}</TableCell>
                      <TableCell style={{ borderBottom: "1px solid #f1f0f0", borderRight: "1px solid #f1f0f0" }}>{row.lastname}</TableCell>
                      <TableCell style={{ borderBottom: "1px solid #f1f0f0", borderRight: "1px solid #f1f0f0", textAlign: "center" }}>
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
                      <TableCell style={{ borderBottom: "1px solid #f1f0f0", borderRight: "1px solid #f1f0f0", textAlign: "center" }}>{parseFloat(row.score).toFixed(2)}</TableCell>
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
