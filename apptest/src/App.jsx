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
  { value: "", label: <div style={{color:"#fff"}}>.</div> }, // Empty option
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
        padding: "auto",
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
        {({ isSubmitting, resetForm, setValues, values, handleChange, touched, errors }) => (
          <>
            <Form
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                width: "100%",
                alignItems: "center",
                background: "#f4f3f3",
              }}
            >
              <TextField style= { {marginLeft:"220px"}}
                name="firstname"
                label="First name*"
                fullWidth
                margin="normal"
                error={touched.firstname && Boolean(errors.firstname)}
                helperText={touched.firstname ? errors.firstname : ""}
                value={values.firstname}
                onChange={handleChange}
                InputProps={{ 
                  style: { background: "#fff", width: "60%",borderRadius:"10px"},
                  sx: { width: "100%" }
                }}
              />

              <TextField style= { {marginLeft:"30px"}}
                name="lastname"
                label="Last name*"
                fullWidth
                margin="normal"
                error={touched.lastname && Boolean(errors.lastname)}
                helperText={touched.lastname ? errors.lastname : ""}
                value={values.lastname}
                onChange={handleChange}
                InputProps={{ 
                  style: { background: "#fff", width: "60%" ,borderRadius:"10px"},
                  sx: { width: "100%" }
                }}
              />

              <TextField style={ {marginLeft:"220px"}}
                name="gender"
                select
                label="Gender*"
                fullWidth
                margin="normal"
                error={touched.gender && Boolean(errors.gender)}
                helperText={touched.gender ? errors.gender : ""}
                value={values.gender}
                onChange={handleChange}
                InputProps={{ 
                  style: { background: "#fff",  width: "60%" ,borderRadius:"10px" },
                  sx: { width: "100%" }
                }}
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField style= { {marginLeft:"30px"}}
                name="score"
                label="Score*"
                fullWidth
                margin="normal"
                error={touched.score && Boolean(errors.score)}
                helperText={touched.score ? errors.score : ""}
                value={values.score}
                onChange={handleChange}
                InputProps={{ 
                  style: { background: "#fff",  width: "60%" ,borderRadius:"10px" },
                  sx: { width: "100%" }
                }}
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
                    style={{ margin: "0 10px", width:"100px",boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.1)", }}
                   
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                  
                      color: "#ffffff", // เปลี่ยนสีตัวอักษร
                    }}
                  >
                    {editIndex >= 0 ? "Edit" : "Add"}
                  </Button >
                  <Button 
                    style={{ margin: "0 20px", width:"100px",boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.1)", }}
                    type="button"
                    onClick={() => {
                      resetForm();
                      setEditIndex(-1);
                    }}
                    sx={{
                      
                      width:"100px",
                      backgroundColor: "#fff", // เปลี่ยนสีพื้นหลัง
                      color: "#000", // เปลี่ยนสีตัวอักษร
                       border: "0.05px solid #d0d0d0",
                       boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        backgroundColor: "#efefef", // เปลี่ยนสีเมื่อเมาส์โฮเวอร์
                          
                      },
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
                    <TableCell
                      sx={{
                        color: "#ffffff",
                        borderRight: "1px solid #f1f0f0",
                        width: "8%",
                        textAlign: "center",
                      }}
                    >
                      No.
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#ffffff",
                        borderRight: "1px solid #f1f0f0",
                        width: "5%",
                      }}
                    ></TableCell>
                    <TableCell
                      sx={{
                        color: "#ffffff",
                        borderRight: "1px solid #f1f0f0",
                      }}
                    >
                      First name
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#ffffff",
                        borderRight: "1px solid #f1f0f0",
                      }}
                    >
                      Last name
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#ffffff",
                        borderRight: "1px solid #f1f0f0",
                        textAlign: "center",
                      }}
                    >
                      Gender
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#ffffff",
                        borderRight: "1px solid #f1f0f0",
                        textAlign: "center",
                      }}
                    >
                      Score
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#e9e9e9",
                        "&:hover": { backgroundColor: "#ececec" },
                      }}
                    >
                      <TableCell
                        style={{
                          borderBottom: "1px solid #f1f0f0",
                          borderRight: "1px solid #f1f0f0",
                          textAlign: "center",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #f1f0f0",
                          borderRight: "1px solid #f1f0f0",
                        }}
                      >
                        <IconButton
                          onClick={() => handleEdit(index, setValues)}
                          sx={{ color: "Black" }}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #f1f0f0",
                          borderRight: "1px solid #f1f0f0",
                        }}
                      >
                        {row.firstname}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #f1f0f0",
                          borderRight: "1px solid #f1f0f0",
                        }}
                      >
                        {row.lastname}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #f1f0f0",
                          borderRight: "1px solid #f1f0f0",
                          textAlign: "center",
                        }}
                      >
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
                      <TableCell
                        style={{
                          borderBottom: "1px solid #f1f0f0",
                          borderRight: "1px solid #f1f0f0",
                          textAlign: "center",
                        }}
                      >
                        {parseFloat(row.score).toFixed(2)}
                      </TableCell>
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
