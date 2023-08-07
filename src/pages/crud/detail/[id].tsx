import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { detailPost } from "../../../../services/apiPosts";

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

  const fetchData = async (id: number) => {
    const listData = await detailPost(id);
    //dibuat agar dibaca di luar function
    setDataFetch(listData);
  };
  useEffect(() => {
    fetchData(id as number);
  }, [id]);
  console.log(dataFetch);
}
