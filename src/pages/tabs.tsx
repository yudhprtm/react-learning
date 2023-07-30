import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import FetchData from "./fetch-data";
import BasicTable from "./dataTable";
import EditIcon from '@mui/icons-material/Edit';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type Inputs = {
  value_1: number;
  value_2: number;
  value_3: number;
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CustomTabs() {
  const [value, setValue] = useState(0);
  const [text, setText] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (dataInput: Inputs) => {
    setText(`${dataInput.value_1} ${dataInput.value_2} ${dataInput.value_3}`);
  }

  const reset = () => {
    resetField("value_1");
    resetField("value_2");
    resetField("value_3");
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Value 1"
              variant="standard"
              defaultValue="test"
              {...register("value_1")}
              error={errors.value_1 ? true : false}
            />
            <Typography variant="inherit" color="red">
              {errors.value_1?.message}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Value 2"
              variant="standard"
              {...register("value_2", {
                required: { value: true, message: "Wajib dipilih" },
              })}
              error={errors.value_2 ? true : false}
            />
            <Typography variant="inherit" color="red">
              {errors.value_2?.message}
            </Typography>
          </Box>
          <Box>
            <Button type="submit" variant="contained">
              Submit
            </Button>
            &emsp;
            <Button onClick={() => reset()} variant="outlined">
              Reset
            </Button>
          </Box>
        </form>
        {text && (
          <Box>
            <Typography variant="h1">{text}</Typography>
          </Box>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BasicTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Value 1"
              variant="standard"
              defaultValue="test"
              {...register("value_1")}
              error={errors.value_1 ? true : false}
            />
            <Typography variant="inherit" color="red">
              {errors.value_1?.message}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Value 2"
              variant="standard"
              {...register("value_2", {
                required: { value: true, message: "Wajib dipilih" },
              })}
              error={errors.value_2 ? true : false}
            />
            <Typography variant="inherit" color="red">
              {errors.value_2?.message}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Value 3"
              variant="standard"
              {...register("value_3", {
                required: { value: true, message: "Wajib dipilih" },
              })}
              error={errors.value_2 ? true : false}
            />
            <Typography variant="inherit" color="red">
              {errors.value_2?.message}
            </Typography>
          </Box>
          <Box>
            <Button type="submit" variant="contained">
              Submit
            </Button>
            &emsp;
            <Button onClick={() => reset()} variant="outlined">
              Reset
            </Button>
          </Box>
        </form>
        {text && (
          <Box>
            <Typography variant="h1">Buah yang aku suka {text}</Typography>
          </Box>
        )}
      </CustomTabPanel>
    </Box>
  );
}
