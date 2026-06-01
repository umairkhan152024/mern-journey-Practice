// ============================================
// FILE: src/App.jsx
// CONCEPT: Rendering lists with .map()
// ============================================
// WHAT WE ARE DOING HERE:
// Before this lesson we had 3 hardcoded cards
// like this:
//   <DoctorCard name="Dr. Ahmed" />
//   <DoctorCard name="Dr. Sara" />
//   <DoctorCard name="Dr. Bilal" />
//
// The problem: if we have 100 doctors we cannot
// write 100 lines manually. It is not scalable.
//
// The solution: store all doctors in a JavaScript
// array and use .map() to loop through them
// and return one DoctorCard for each doctor
// ============================================

// ============================================
// COMPONENT: DoctorCard
// ============================================
// This component has not changed from before
// It still receives the same 4 props:
//   name       → doctor's name (string)
//   specialty  → doctor's specialty (string)
//   fee        → consultation fee (number)
//   isAvailable → available or not (boolean)
// ============================================

function DoctorCard({ name, specialty, fee, isAvailable }) {
  // Every component returns JSX
  // JSX is HTML written inside JavaScript
  return (
    // The outer div is the card container
    // style={{ }} is how we write CSS in JSX
    // In CSS we write: border-radius
    // In JSX we write: borderRadius (camelCase)
    <div
      style={{
        border: "1px solid #ddd", // thin grey border around card
        borderRadius: "8px", // rounded corners
        padding: "16px", // space inside the card
        marginBottom: "12px", // space between cards
        fontFamily: "sans-serif", // clean font for all text
        backgroundColor: "white", // white card background
      }}
    >
      {/* DOCTOR NAME */}
      {/* {name} means: take the name prop and show it here */}
      {/* curly braces { } let us use JavaScript inside JSX */}
      <h2
        style={{
          margin: "0 0 8px", // no top margin, 8px bottom margin
          color: "#1a1a2e", // dark navy color
          fontSize: "18px", // text size
        }}
      >
        {name}
      </h2>

      {/* SPECIALTY */}
      {/* {specialty} shows whatever specialty was passed as prop */}
      <p
        style={{
          margin: "4px 0", // small spacing top and bottom
          color: "#555", // grey color for secondary text
          fontSize: "14px",
        }}
      >
        {/* we write the label "Specialty:" as plain text */}
        {/* and {specialty} as the dynamic value from props */}
        Specialty: {specialty}
      </p>

      {/* FEE */}
      {/* {fee} shows the number passed as prop */}
      {/* We write "Rs." as plain text next to it */}
      <p
        style={{
          margin: "4px 0",
          fontSize: "14px",
          fontWeight: "500", // slightly bold
        }}
      >
        Fee: Rs. {fee}
      </p>

      {/* =============================================
          CONDITIONAL RENDERING
          =============================================
          This is a ternary operator:
          condition ? "show if true" : "show if false"

          isAvailable is true  → show green badge
          isAvailable is false → show red badge

          Think of it like:
          IF isAvailable is true
            show "Available Today" in green
          ELSE
            show "Not Available" in red
          ============================================= */}
      {isAvailable ? (
        // isAvailable is TRUE — render green badge
        <span
          style={{
            display: "inline-block", // sits on same line as text
            marginTop: "10px", // space above badge
            padding: "4px 12px", // space inside badge
            backgroundColor: "#e1f5ee", // light green background
            color: "#0f6e56", // dark green text
            borderRadius: "20px", // pill shape
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          Available Today
        </span>
      ) : (
        // isAvailable is FALSE — render red badge
        <span
          style={{
            display: "inline-block",
            marginTop: "10px",
            padding: "4px 12px",
            backgroundColor: "#fcebeb", // light red background
            color: "#a32d2d", // dark red text
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          Not Available
        </span>
      )}
      {/* end of conditional rendering */}
    </div>
    // end of card div
  );
}
// end of DoctorCard component

// ============================================
// COMPONENT: App
// ============================================
// App is the parent component
// It contains all the data and renders DoctorCard
// for each doctor using .map()
// ============================================

function App() {
  // =============================================
  // THE DOCTORS ARRAY
  // =============================================
  // This is a regular JavaScript array
  // Each item inside is an object { }
  // Each object represents one doctor
  // Each object has these properties:
  //   id          → unique number for each doctor
  //                 React needs this for the key prop
  //   name        → doctor's full name
  //   specialty   → what they specialize in
  //   fee         → consultation fee in rupees
  //   isAvailable → true means available, false means not
  // =============================================
  const doctors = [
    // Doctor 1
    {
      id: 1, // unique id — always required
      name: "Dr. Ahmed Khan", // string value
      specialty: "Cardiologist", // string value
      fee: 2000, // number value — no quotes
      isAvailable: true, // boolean — no quotes
    },

    // Doctor 2
    {
      id: 2,
      name: "Dr. Sara Malik",
      specialty: "Dentist",
      fee: 1500,
      isAvailable: false, // false → will show red badge
    },

    // Doctor 3
    {
      id: 3,
      name: "Dr. Bilal Akhtar",
      specialty: "Skin Specialist",
      fee: 1800,
      isAvailable: true,
    },

    // Doctor 4
    {
      id: 4,
      name: "Dr. Fatima Noor",
      specialty: "Gynecologist",
      fee: 2500,
      isAvailable: true,
    },

    // Doctor 5
    {
      id: 5,
      name: "Dr. Usman Ali",
      specialty: "Neurologist",
      fee: 3000,
      isAvailable: false, // false → will show red badge
    },
  ];
  // end of doctors array

  return (
    // Page wrapper div
    // maxWidth: "500px" → card never gets too wide
    // margin: "40px auto" → centered on the page
    //   40px top and bottom space
    //   auto left and right → centers horizontally
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "0 16px", // small padding on mobile
      }}
    >
      {/* PAGE TITLE */}
      <h1
        style={{
          color: "#1a1a2e",
          marginBottom: "24px",
          fontFamily: "sans-serif",
        }}
      >
        ZENOVA Clinic
      </h1>

      {/* =============================================
          .map() — THE KEY CONCEPT OF THIS LESSON
          =============================================
          doctors.map((doctor) => ( ... ))

          WHAT map() DOES:
          It goes through EVERY item in the doctors array
          one by one, and for each item it returns JSX

          BREAKDOWN:
          doctors         → the array we defined above
          .map()          → JavaScript array method
          (doctor)        → current item in the loop
                            first loop:  doctor = doctors[0]
                            second loop: doctor = doctors[1]
                            and so on...
          => (...)        → arrow function, returns JSX

          SO FOR EACH DOCTOR OBJECT:
          we return one <DoctorCard /> component
          and pass the doctor's data as props

          KEY PROP:
          key={doctor.id} is REQUIRED when using .map()
          React uses key to know which card is which
          so it can update only the changed card
          without re-rendering the entire list
          always use a unique value like id
          never use the array index as key
          ============================================= */}
      {doctors.map((doctor) => (
        // For each doctor in the array
        // we return one DoctorCard component

        <DoctorCard
          key={doctor.id} // required — unique identifier
          name={doctor.name} // pass name from doctor object
          specialty={doctor.specialty} // pass specialty
          fee={doctor.fee} // pass fee
          isAvailable={doctor.isAvailable} // pass availability
        />
      ))}
      {/* end of .map() */}
    </div>
    // end of page wrapper
  );
}
// end of App component

// Export App so main.jsx can use it
// main.jsx is the entry point of the app
// it puts App component onto the actual HTML page
export default App;
