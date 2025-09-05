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
      {[
        { fecha: "07/11/25", dia: "Viernes 7" },
        { fecha: "08/11/25", dia: "Sábado 8" },
        { fecha: "09/11/25", dia: "Domingo 9" },
      ].map(({ fecha, dia }) => {
        const actividadesDelDia = actividades.filter((act) => act.fecha === fecha);
        const has = actividadesDelDia.length > 0;
        return (
          <section key={fecha} style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ margin: '0.5rem 0' }}>{dia}</h2>
            {has ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '0.5rem 0.5rem' }}>Inicio</th>
                      <th style={{ textAlign: 'left', padding: '0.5rem 0.5rem' }}>Fin</th>
                      <th style={{ textAlign: 'left', padding: '0.5rem 0.5rem' }}>Actividad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actividadesDelDia.map((act, i) => {
                      const hora = `${act.inicio}${act.fin && act.fin !== '-' ? ` - ${act.fin}` : ''}`;
                      return (
                        <tr key={i}>
                          <td style={{ verticalAlign: 'top', padding: '0.5rem', borderTop: '1px solid #333', whiteSpace: 'nowrap' }}>{act.inicio}</td>
                          <td style={{ verticalAlign: 'top', padding: '0.5rem', borderTop: '1px solid #333', whiteSpace: 'nowrap' }}>{act.fin}</td>
                          <td style={{ verticalAlign: 'top', padding: '0.5rem', borderTop: '1px solid #333'}}>{act.nombre}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No hay actividades programadas.</p>
            )}
          </section>
        );
      })}
    </div>
  );

}
