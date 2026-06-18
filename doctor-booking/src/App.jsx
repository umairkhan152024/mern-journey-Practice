import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const doctors = [
  { id: 1, name: "Dr. Ahmed Khan", specialty: "Cardiologist", fee: 2000 },
  { id: 2, name: "Dr. Sara Malik", specialty: "Dentist", fee: 1500 },
  { id: 3, name: "Dr. Bilal Akhtar", specialty: "Skin Specialist", fee: 1800 },
];

function DoctorList() {
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        fontFamily: "sans-serif",
        padding: "0 16px",
      }}
    >
      <h1 style={{ color: "#1a1a2e", marginBottom: "24px" }}>Our Doctors</h1>
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          style={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "12px",
          }}
        >
          <h2 style={{ margin: "0 0 6px", color: "#1a1a2e", fontSize: "16px" }}>
            {doctor.name}
          </h2>
          <p style={{ margin: "4px 0", color: "#555", fontSize: "14px" }}>
            {doctor.specialty}
          </p>
          <Link
            to={`/doctors/${doctor.id}`}
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "6px 16px",
              backgroundColor: "#1a1a2e",
              color: "white",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "13px",
            }}
          >
            View Profile
          </Link>
        </div>
      ))}
    </div>
  );
}

function DoctorProfile() {
  const { id } = useParams();

  // Number(id) converts "1" string to 1 number
  // because doctor.id is number but URL param is string
  // 1 === "1" is false — so we must convert
  const doctor = doctors.find((d) => d.id === Number(id));

  if (!doctor) {
    return (
      <div
        style={{
          maxWidth: "400px",
          margin: "40px auto",
          fontFamily: "sans-serif",
          padding: "0 16px",
        }}
      >
        <h2 style={{ color: "#a32d2d" }}>Doctor not found</h2>
        <Link to="/doctors" style={{ color: "#1a1a2e" }}>
          ← Back to doctors
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        fontFamily: "sans-serif",
        padding: "0 16px",
      }}
    >
      <Link
        to="/doctors"
        style={{ color: "#555", textDecoration: "none", fontSize: "14px" }}
      >
        ← Back
      </Link>
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "24px",
          marginTop: "16px",
        }}
      >
        <h1 style={{ margin: "0 0 8px", color: "#1a1a2e" }}>{doctor.name}</h1>
        <p style={{ margin: "6px 0", color: "#555", fontSize: "15px" }}>
          Specialty: {doctor.specialty}
        </p>
        <p style={{ margin: "6px 0", fontSize: "15px", fontWeight: "500" }}>
          Fee: Rs. {doctor.fee}
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
