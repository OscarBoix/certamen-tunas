import { useEffect, useState } from "react";
import Papa from "papaparse";

interface Actividad {
  fecha: string;
  inicio: string;
  fin: string;
  nombre: string;
  descripcion: string;
  ubicacion: string;
}

export default function ActividadesInicio() {
  const [actividades, setActividades] = useState<Actividad[]>([]);

  useEffect(() => {
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQmd83PHyjyaKcDvfltQapYH0q2G2yChRtgsCMncjzgyATtGWSGEN4bwQ4TRI2OxV1P6v7FQm3RjMdL/pub?output=csv")
      .then((res) => res.text())
      .then((csvText) => {
        const result = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        setActividades(result.data as Actividad[]);
      });
  }, []);

  return (
    <div>
      <h1>Calendario</h1>

      {[
        { fecha: "07/11/25", dia: "Viernes 7" },
        { fecha: "08/11/25", dia: "Sábado 8" },
        { fecha: "09/11/25", dia: "Domingo 9" },
      ].map(({ fecha, dia }) => {
        const actividadesDelDia = actividades.filter(act => act.fecha === fecha);

        return (
          <div key={fecha}>
            <h2>{dia}</h2>
            {actividadesDelDia.length > 0 ? (
              actividadesDelDia.map((act, i) => (
                <div key={i}>
                    {act.inicio} {act.fin !== "-" ? `- ${act.fin}` : ""} | {act.nombre}
                  {act.descripcion && <p>{act.descripcion}</p>}
                  <p><em>{act.ubicacion}</em></p>
                </div>
              ))
            ) : (
              <p>No hay actividades programadas.</p>
            )}
          </div>
        );
      })}
    </div>
  );

}
