import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { createPost } from "../../../services/apiPosts";

//tipe data
type Inputs = {
  title: string;
  body: string;
};

export default function add() {
  //dibuat variable
  const router = useRouter();
  console.log(router.pathname);
  //atribut dari react hook form
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (dataInput: Inputs) => {
    const res = await createPost(dataInput);
    if (res) {
      router.push("/crud");
    } else {
      console.log("Gagal create post");
    }
  };

  const reset = () => {
    //bawaan react hook form resetField
    resetField("title");
    resetField("body");
  };

  const back = () => {
    //router bawaan next js (useRouter)
    router.push("/crud");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      {/* register your input into the hook by invoking the "register" function */}
      <Box sx={{ marginBottom: 2, width: "100%" }}>
        <TextField
          type="text"
          label="Title"
          variant="standard"
          {...register("title", {
            //validasi dari react hook form
            required: { value: true, message: "Wajib dipilih" },
          })}
          // validasi dari mui
          error={errors.title ? true : false}
          fullWidth
        />
        <Typography variant="inherit" color="red">
          {/* message dari react hook form */}
          {errors.title?.message}
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          type="text"
          label="Body"
          variant="standard"
          {...register("body", {
            required: { value: true, message: "Wajib dipilih" },
          })}
          error={errors.body ? true : false}
          rows={5}
          fullWidth
        />
        <Typography variant="inherit" color="red">
          {/* kalau ada error di body, muncul message */}
          {errors.body?.message}
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
        &emsp;
        <Button onClick={() => back()} variant="outlined">
          Back
        </Button>
      </Box>
    </form>
  );
}
