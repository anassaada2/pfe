import styles from "./heroDash.module.scss";
// app/components/TableComponent.jsx
export default function TableComponent() {
  const data = [
    {
      id: 1,
      name: "Alice",
      email: "alice@email.com",
      phone: "+33 6 12 34 56 78",
    },
    { id: 2, name: "Bob", email: "bob@email.com", phone: "+33 7 23 45 67 89" },
    {
      id: 3,
      name: "Charlie",
      email: "charlie@email.com",
      phone: "+33 6 98 76 54 32",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.titleText}>Last views </h2>
      </div>
      <div className="table-container shadow-sm rounded p-3 bg-white">
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead className="table-light">
              <tr className="d-flex">
                <th className="col-2">ID</th>
                <th className="col-3">Name</th>
                <th className="col-4">Email</th>
                <th className="col-3">Phone</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="d-flex">
                  <td className="col-2">{row.id}</td>
                  <td className="col-3">{row.name}</td>
                  <td className="col-4">{row.email}</td>
                  <td className="col-3">{row.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
