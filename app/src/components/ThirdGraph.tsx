import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ---------- Types API ----------
interface Result {
  annee_tournage?: string;
  type_tournage?: string;
}

interface ApiResponse {
  results: Result[];
}

// ---------- Fetch API ----------
async function FetchFilming(): Promise<Result[]> {
  const response = await fetch(
    "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=5000"
  );
  const json: ApiResponse = await response.json();
  return json.results;
}

// ---------- Trouve les 5 types les plus fréquents ----------
function GetTop5Types(results: Result[]): string[] {
  const counts: Record<string, number> = {};

  for (const item of results) {
    const type = item.type_tournage;
    if (!type) continue;

    counts[type] = (counts[type] || 0) + 1;
  }

  // Classe par ordre décroissant et prend les 5 premiers
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([type]) => type);
}

// ---------- Transforme en dataset pour Recharts ----------
function BuildChartData(results: Result[], top5: string[]) {
  const map: Record<string, Record<string, number>> = {};

  for (const item of results) {
    const year = item.annee_tournage;
    const type = item.type_tournage;

    if (!year || !type) continue;

    if (!map[year]) map[year] = {};

    const category = top5.includes(type) ? type : "Autres";

    if (!map[year][category]) map[year][category] = 0;
    map[year][category]++;
  }

  // Convertit l’objet en tableau trié par année
  return Object.keys(map)
    .sort()
    .map((year) => ({
      year,
      ...map[year],
    }));
}

// ---------- Composant principal ----------
export default function StackedAreaTypesParAnnee() {
  const [data, setData] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchFilming()
      .then((results) => {
        const top5 = GetTop5Types(results);

        const finalData = BuildChartData(results, top5);

        setCategories([...top5, "Autres"]);
        setData(finalData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <ResponsiveContainer width="100%" height={450}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />

        {categories.map((category) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            stackId="1"
            fillOpacity={0.6}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
