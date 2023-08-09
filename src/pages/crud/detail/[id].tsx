import {
  Box,
  Button,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { detailPost, updatePost } from "../../../../services/apiPosts";

//tipe data
type Inputs = {
  title: string;
  body: string;
};

export default function edit() {
  //dibuat variable
  const router = useRouter();
  //   liat di console log cek id nya ada berapa, ada di query kan
  const id = router.query.id as number | undefined;
  //useEffect buat reload, kenapa taro setelah koma karena id itu variable, ada di index contohnya
  useEffect(() => {}, [id]);
  const [dataFetch, setDataFetch] = useState<any>();

  //atribut dari react hook form
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const back = () => {
    router.push("/crud");
  };

  const onSubmit = async (dataInput: Inputs) => {
    const res = await updatePost(id as number, dataInput);
    if (res) {
      router.push("/crud");
    } else {
      console.log("Gagal create post");
    }
  };

  const fetchData = async (id: number) => {
    const listData = await detailPost(id);
    //dibuat agar dibaca di luar function
    setDataFetch(listData);
  };
  useEffect(() => {
    fetchData(id as number);
  }, [dataFetch, id]);
  console.log(dataFetch);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      {/* register your input into the hook by invoking the "register" function */}
      <Box sx={{ marginBottom: 2, width: "100%" }}>
        <InputLabel>Test</InputLabel>
        <Input
          type="text"
          {...register("title", {
            //validasi dari react hook form
            required: { value: true, message: "Wajib dipilih" },
          })}
          value={dataFetch?.title}
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
        <Input
          type="text"
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
        <Button onClick={() => back()} variant="outlined">
          Back
        </Button>
      </Box>
    </form>
  );
}
