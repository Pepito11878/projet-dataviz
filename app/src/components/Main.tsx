import { NavLink } from "react-router";

export function Main() {
  return (
    <main className="bg-[linear-gradient(to_right,#353442,#323F38)] max-w-7xl mx-auto text-center py-30 border- rounded-md text-[#BFBFBF] ">
      <h1 className="font-bold text-4xl">Dataviz Cinéma - Paris</h1>
      <p className="px-10 py-8">
        Visualisez l’activité cinématographique à travers les lieux de tournage
        à Paris: tendances par année, types de tournage, arrondissements,
        réalisateurs et plus encore.
      </p>

      <NavLink
        to="/Analyse"
        className="{({ isActive }) =>
      font-semibold px-4 py-2 rounded-lg bg-black hover:text-white mt-6 inline-block"
      >
        Explorer les analyses
      </NavLink>

      {/* <div id="cards" className="flex gap-4">
        <p className="bg-white rounded-lg ">
          Tendances annuelles Nombre de tournages par année pour repérer les
          pics d’activité.
        </p>
        <p className="bg-white rounded-lg">
          Types de tournage Long métrage, Série TV, Téléfilm… suivez l’évolution
          par type.
        </p>
        <p className="bg-white rounded-lg">
          Graph des arrondissements Répartition des tournages par arrondissement
          parisien.
        </p>
        <p className="bg-white rounded-lg">
          Top réalisateurs Classement des réalisateurs les plus présents à
          Paris.
        </p>
      </div> */}
    </main>
  );
}
