import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import { useAppStore } from "../../appStore";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  deleteExperience,
  getExperienceById,
  getExperienceList,
} from "../../../../data/Api";
import EditExperience from "./EditExperience";
import AddExperience from "./AddExperience";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ExperienceList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const setRows = useAppStore((state) => state.setRows);
  const rows = useAppStore((state) => state.rows);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState("");
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchExperienceData = async () => {
    try {
      const data = await getExperienceList();
      setRows(data.data);
    } catch (error) {
      console.error("Error fetching user datasssss:", error);
    }
  };
  const fetchExperienceById = async (id) => {
    try {
      const singleResponse = await getExperienceById(id);
      setEditData(singleResponse.data);
      handleEditOpen();
    } catch (error) {
      console.error("Error fetching user datasssss:", error);
    }
  };
  useEffect(() => {
    fetchExperienceData();
  }, []);

  const handleDeleteExperience = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };
  const handleEditExperience = async (id) => {
    await fetchExperienceById(id);
  };
  const deleteApi = async (id) => {
    await deleteExperience(id);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    fetchExperienceData();
  };
  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      // setRows([]);
      fetchExperienceData();
    }
  };

  return (
    <>
      {rows.length > 0 && (
        <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Experience List
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              // disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.company || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Company" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              onClick={handleOpen}
            >
              Add
            </Button>
          </Stack>
          <Box height={10} />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px", fontWeight: "bold" }}
                  >
                    View{" "}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px", fontWeight: "bold" }}
                  >
                    Company{" "}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px", fontWeight: "bold" }}
                  >
                    Date{" "}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px", fontWeight: "bold" }}
                  >
                    Role{" "}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px", fontWeight: "bold" }}
                  >
                    Skills{" "}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px", fontWeight: "bold" }}
                  >
                    Action{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell align="left">
                          <VisibilityIcon />{" "}
                        </TableCell>
                        <TableCell align="left">{row.company}</TableCell>
                        <TableCell align="left">{row.date}</TableCell>
                        <TableCell align="left">{row.role}</TableCell>
                        <TableCell align="left">
                          {row && row.skills ? row.skills.join(", ") : ""}
                        </TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              onClick={() => handleEditExperience(row._id)}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                handleDeleteExperience(row._id);
                              }}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}{" "}
      <div>
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddExperience closeEvent={handleClose} />
          </Box>
        </Modal>
        <Modal
          open={editOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditExperience closeEvent={handleEditClose} data={editData} />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ExperienceList;
