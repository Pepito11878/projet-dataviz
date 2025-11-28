import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Results {
  annee_tournage: string;
}

interface apiResponce {
  count: number;
  results: Results[];
}

async function fetchApi(): Promise<apiResponce | undefined> {
  try {
    const api = await fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=100"
    );
    return api.json();
  } catch (error) {
    console.error(error);
  }
}

async function getFilmingByYear() {
  const data = await fetchApi();
  if (!data) return {};

  const counts: Record<string, number> = {};

  data.results.forEach((item) => {
    const annee = item.annee_tournage;
    counts[annee] = (counts[annee] || 0) + 1;
  });

  return counts;
}

export function FirstGraph() {
  const [data, setData] = useState<{ annee: string; count: number }[]>([]);

  useEffect(() => {
    getFilmingByYear().then((counts) => {
      if (!counts) return;

      const formatted = Object.entries(counts).map(([annee, count]) => ({
        annee,
        count,
      }));

      formatted.sort((a, b) => Number(a.annee) - Number(b.annee));

      setData(formatted);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="annee" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
