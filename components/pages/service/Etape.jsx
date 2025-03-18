const Etape = () => {
  const data = [
    {
      step: "1/",
      fr: "Préparation du coffrage",
      descriptionFr:
        "Positionner les blocs en polystyrène et les écarteurs en béton.",
    },
    {
      step: "2/",
      fr: "Ferraillage principal",
      descriptionFr:
        "Installer les armatures longitudinales et transversales, ainsi que les barres bateau.",
    },
    {
      step: "3/",
      fr: "Renforts spécifiques",
      descriptionFr:
        "Mettre en place les renforts aux poteaux et les armatures pour efforts tranchants.",
    },
    {
      step: "4/",
      fr: "Pose finale",
      descriptionFr:
        "Ajouter les treillis soudés pour la chape de compression et lier les nappes inférieures et supérieures.",
    },
  ];

  return (
    <div className="container-fluid p-4">
      <div className="table-responsive">
        <table className="table table-bordered table-striped w-100">
          <thead className="thead-dark">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Étapes</th>
              <th className="p-3">Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="p-3 fw-bold">{row.step}</td>
                <td className="p-3 fw-bold text-success">{row.fr}</td>
                <td className="p-3">{row.descriptionFr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Etape;
