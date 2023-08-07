import axios from "axios";

export async function createPost(dataInput: any) {
  try {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      dataInput
    );
    return res.data;
  } catch (error) {
    console.log("Error!");
  }
}

export async function detailPost(id: number) {
  try {
    const res = await axios.get(
      //cara tanpa pake plus untuk variable (id) untuk penggabungan
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return res.data;
  } catch (error) {}
}
