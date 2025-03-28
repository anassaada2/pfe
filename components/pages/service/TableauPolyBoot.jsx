function TableauPolyBoot() {
  const data = [
    { label: "Matériau", value: "Polystyrène expansé (PSE)" },
    { label: "Densité", value: "20 kg/m³" },
    { label: "Dimensions", value: "50 x 50 x 15 cm" },
    { label: "Poids par bloc", value: "0.732 kg" },
    { label: "Volume du bloc", value: "0.0366 m³/pièce" },
    { label: "Temps de pose", value: "32 m²/h/ouvrier" },
    { label: "Espacement entre les blocs", value: "12-14-16-18-20 cm" },
    { label: "Entraxes", value: "62-64-66-68-70 kg" },
    { label: "Résistance au poinçonnement en flexion", value: "150 daN" },
  ];
  return (
    <div className="container-fluid mt-5 ">
      <div className="table-responsive">
        <table className="table table-bordered table-striped w-100">
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="p-3 fw-bold text-success">{row.label}</td>
                <td className="p-3">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableauPolyBoot;
