

function Navbar() {
  return (
    <nav className="nav">
      <h1 className="logo">My App</h1>
      <ul className="nav-links">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    alert("Form submitted successfully!");
  }

  return (
    <div>
      <Navbar />

      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="form-title">Create Account</h1>

        <label>Name</label>
        <input type="text" required />

        <label>Email</label>
        <input type="email" required />

        <label>Password</label>
        <input type="password" required />

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
