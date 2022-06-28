import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import styles from "../styles/Home.module.css";
import { formatMoney } from "../utils/helps";

const getCoins = async () => {
  return axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&per_page=20");
};

function Home(props) {


  const { data, isLoading, isFetching } = useQuery("coins", getCoins, {
    select: (state) => {
      const { data } = state;
      return {
        data,
      };
    },
  });


  if (isFetching || isLoading) {
    return null;
  }
  const coinData = data?.data;


  return (
    <div className={styles.container}>
      <Head>
        <title>Wallet Feature Store | LINE</title>
        <meta name="description" content="Line Wallet Feature Store" />
        <link rel="icon" href="/line.ico" />
      </Head>

      <Container>
        <hr />
        <Table bordered hover >
          <thead>
            <tr>
              <td>순위</td>
              <td>코인</td>
              <td>로고</td>
              <td>현재가격</td>
              <td>등락률</td>
              <td>시가 총액</td>
            </tr>
          </thead>
          <tbody>
            {coinData.map((item, idx) => {
              return <tr key={item.symbol} >
                <td className="text-center">
                  <Link href={`/coin/${item.symbol}`}>
                    <a className="text-dark text-decoration-none" >
                      {idx + 1}
                    </a>
                  </Link>
                </td>
                <td className="text-center" >
                  <Link href={`/coin/${item.symbol}`}>
                    <a className="text-dark text-decoration-none" >
                      {item.name} /
                      <span className="text-info" >
                      {item.symbol}
                      </span>
                    </a>
                  </Link>
                </td>
                <td className="text-center" >
                  <Link href={`/coin/${item.symbol}`}>
                    <a className="text-white text-decoration-none" >
                      <Image src={item.image} width={30} height={30} alt={item.name} />
                    </a>
                  </Link>
                </td>
                <td className="text-center" >{formatMoney(item.current_price)}</td>
                <td className={`text-center ${item.price_change_percentage_24h > 0 ? "text-primary" : "text-danger"}`} >{item.price_change_percentage_24h.toFixed(2)} % </td>
                <td className="text-right" >{formatMoney(item.market_cap)}</td>
              </tr>
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
export const getServerSideProps = async()=>{
  const response = await fetch("https://newsapi.org/v2/everything?q=tesla&from=2022-05-28&sortBy=publishedAt&apiKey=4b853a32ce9a4f76a526e126e9c0494c");
  const data = await response.json()
  console.log(response,"1")
  return {
    props: {
      data
    },
  }
}
export default Home;