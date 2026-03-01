function Navbar({ name, role }) {
  return (
    <nav>
      <h2>{name}</h2>
      <p>{role}</p>
      <ul>
        <li>About</li>
        <li>Skills</li>
        <li>Projects</li>
      </ul>
    </nav>
  );
}

export default Navbar;
