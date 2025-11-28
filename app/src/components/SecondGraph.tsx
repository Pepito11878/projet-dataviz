import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Result {
  type_tournage: string;
}

interface apiResponce {
  count: number;
  results: Result[];
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

async function getFilmingByType() {
  const data = await fetchApi();
  if (!data) return [];

  const counts: Record<string, number> = {};

  data.results.forEach((item) => {
    const type = item.type_tournage || "Inconnu";
    counts[type] = (counts[type] || 0) + 1;
  });

  // transformer en tableau pour Recharts
  return Object.entries(counts).map(([type, count]) => ({ type, count }));
}

export function SecondGraph() {
  const [data, setData] = useState<{ type: string; count: number }[]>([]);

  useEffect(() => {
    getFilmingByType().then((res) => {
      if (res) setData(res);
    });
  }, []);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Nombre de tournages par type</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#6A7330" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
