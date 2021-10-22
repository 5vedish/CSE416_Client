import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Home: NextPage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const res = await axios.get('https://cse416-demo-api.herokuapp.com/');
      setData(res.data);
      console.log(res);
    })();
  }, []);
  
  return (
    <div>
      <Head>
        <title>CSE 416 Test App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to Qiz!
        </h1>

        <p>
          <code>{data}</code>
        </p>
      </main>
    </div>
  )
}

export default Home
