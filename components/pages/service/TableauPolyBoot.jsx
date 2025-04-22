function TableauPolyBoot({ service }) {
  const specs = service[0]; // car service est un tableau avec un seul objet

  const rows = Object.entries(specs)
    .filter(([key]) => key !== "_id") // exclut l'_id si nécessaire
    .map(([label, value]) => ({ label, value }));

  return (
    <div className="container-fluid mt-5">
      <div className="table-responsive">
        <table className="table table-bordered table-striped w-100">
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="p-3 fw-bold text-success text-capitalize">
                  {row.label.replace(/([A-Z])/g, " $1")}
                </td>
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
