import {
  Grid,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  Typography,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { getListData } from "../../../services/apiData";
import { Style } from "@mui/icons-material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function index() {
  const [arr, setArr] = useState([]);

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toAddPage = () => {
    router.push("/crud/add");
  };

  const toDetail = (id: number) => {
    router.push("crud/detail/" + id);
  };

  const fetchData = async () => {
    const listData = await getListData();
    setArr(listData);
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <Grid>
      <Button variant="contained" onClick={() => toAddPage()}>
        <AddIcon /> Add
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arr.map((res: any) => (
              <TableRow
                // di res kalau ada id, ditampilin, kalau gk ada gk akan error karna pakai tanda tanya. klo gk pake, bakal error
                key={res?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {res?.id}
                </TableCell>
                <TableCell>{res?.title}</TableCell>{" "}
                <TableCell>{res?.body}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => toDetail(res?.id)}>
                    Detail
                  </Button>
                  <Button variant="contained" onClick={handleOpen}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography>Yakin ga?</Typography>
          </Box>
          <Box>
            <Button variant="contained">Ya</Button>

            <Button variant="contained">Tidak</Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
}
