import Card from "../../components/Card";
import Layout from "../../components/Layout";
import useSWR from "swr";
import { useRouter } from "next/router";

async function fetcher(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export default function Character() {
  const router = useRouter();
  const { idpage } = router.query;
  const URL = `https://swapi.dev/api/people/${idpage}`;

  const { data, error, isLoading } = useSWR(URL, fetcher);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error !== undefined) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout>
      <Card
        id={idpage}
        name={data.name}
        height={data.height}
        eyeColor={data.eye_color}
        birthYear={data.birth_year}
      />
    </Layout>
  );
}
