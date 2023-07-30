import React, { useEffect, useState } from 'react'

export default function FetchData() {
    const [dataFetch, setDataFetch] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
          .then((response) => response.json())
          .then((data) => setDataFetch(data));
    })
    console.log(dataFetch);

  return dataFetch.slice(0, 5).map((res: any) => (
    <div key={res?.id}>
      {res?.id}, {res?.title}
    </div>
  ));
}