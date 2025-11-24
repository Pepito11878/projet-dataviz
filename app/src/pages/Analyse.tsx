import { useEffect, useState } from "react";
import { Header } from "../components/Header";


// CECI EST UN TEST NE SURTOUT PAS PULL REQUEST CAR CE N'EST PAS CE QUI EST DEMANDER


interface Filming {
  id_lieu: string;
  annee_tournage: string;
  type_tournage: string;
  nom_tournage: string;
  nom_realisateur: string;
  nom_producteur: string;
  adresse_lieu: string;
  ardt_lieu: string;
  date_debut: string;
  date_fin: string;
  coord_x: number;
  coord_y: number;
}

interface ApiResponse {
  total_count: number;
  results: Filming[];
}

async function testApi(): Promise<ApiResponse> {
  const res = await fetch(
    "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=3"
  );

  return res.json() as Promise<ApiResponse>;
}

export default function Analyse() {

  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    testApi().then((res) => setData(res))
  }, [])

  return (
    <div>
      <Header />

      <p>
        {data ? (
          <ul>
            {data.results.map((film) => (
              <li key={film.id_lieu}>{film.nom_tournage}</li>
            ))}
          </ul>
        ) : (
          <p>Chargement...</p>
        )}
      </p>
    </div>
  );
}
