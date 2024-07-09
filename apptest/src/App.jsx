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
  FormControl,
  InputLabel,
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
  { value: "", label: <div style={{ color: "#fff" }}>.</div> }, // Empty option
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
        {({
          isSubmitting,
          resetForm,
          setValues,
          values,
          handleChange,
          touched,
          errors,
        }) => (
          <>
            <Form
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px", // เพิ่ม gap ระหว่างแต่ละช่อง input
                width: "100%",
                alignItems: "center",
                background: "#F0F4FF",
              }}
            >
              <div>
                <FormControl style={{ width: "60%", marginLeft:"220px"}} margin="normal">
                  <InputLabel style={{ marginTop: "-20px" }} htmlFor="score">
                    First name<span style={{ color: "#FC6B7E" }}>*</span>
                  </InputLabel>

                  <TextField
                    id="firstname"
                    name="firstname"
                    fullWidth
                    margin="normal"
                    error={touched.firstname && Boolean(errors.firstname)}
                    helperText={touched.firstname ? errors.firstname : ""}
                    value={values.firstname}
                    onChange={handleChange}
                    InputProps={{
                      style: { background: "#fff", borderRadius: "10px" },
                    }}
                  />
                </FormControl>
              </div>

              <div>
                <FormControl style={{ width: "60%" }} margin="normal">
                  <InputLabel style={{ marginTop: "-20px" }} htmlFor="score">
                    Last name<span style={{ color: "#FC6B7E" }}>*</span>
                  </InputLabel>

                  <TextField
                    id="lastname"
                    name="lastname"
                    fullWidth
                    margin="normal"
                    error={touched.lastname && Boolean(errors.lastname)}
                    helperText={touched.lastname ? errors.lastname : ""}
                    value={values.lastname}
                    onChange={handleChange}
                    InputProps={{
                      style: { background: "#fff", borderRadius: "10px" },
                    }}
                  />
                </FormControl>
              </div>

              <div>
                <FormControl style={{ width: "60%", marginLeft:"220px" }} margin="normal">
                  <InputLabel style={{ marginTop: "-20px" }} htmlFor="score">
                    Gender<span style={{ color: "#FC6B7E" }}>*</span>
                  </InputLabel>

                  <TextField
                    id="gender"
                    name="gender"
                    select
                    fullWidth
                    margin="normal"
                    error={touched.gender && Boolean(errors.gender)}
                    helperText={touched.gender ? errors.gender : ""}
                    value={values.gender}
                    onChange={handleChange}
                    InputProps={{
                      style: { background: "#fff", borderRadius: "10px" },
                    }}
                  >
                    {genderOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </div>

              <div>
                <FormControl style={{  width: "60%" }} margin="normal">
                  <InputLabel style={{ marginTop: "-20px" }} htmlFor="score">
                    Score<span style={{ color: "#FC6B7E" }}>*</span>
                  </InputLabel>

                  <TextField
                    id="score"
                    name="score"
                    fullWidth
                    margin="normal"
                    error={touched.score && Boolean(errors.score)}
                    helperText={touched.score ? errors.score : ""}
                    value={values.score}
                    onChange={handleChange}
                    InputProps={{
                      style: { background: "#fff", borderRadius: "10px" },
                    }}
                  />
                </FormControl>
              </div>

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
                  <div style={{marginTop:"-30px", display:"flex", justifyContent:"center",marginRight:"1%"}}>
                  <Button
                    style={{ margin: "0 10px", width: "100px", boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2)",height:"50px ", borderRadius:"10px"}}
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {editIndex >= 0 ? "Edit" : "Add"}
                  </Button>
                  <Button
                    style={{ margin: "0 20px", width: "100px" ,color:"#000",background:"#fff", boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2) ",borderRadius:"10px"}}
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
              </div>
            </Form>

            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#8DA8D8" }}>
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
                          index % 2 === 0 ? "#ffffff" : "#F0F4FF",
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
