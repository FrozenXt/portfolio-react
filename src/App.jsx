import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  Code,
  Briefcase,
  User,
  MessageSquare,
  ExternalLink,
  ChevronDown,
  Phone,
  MapPin,
  Download,
  Send,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [typingText, setTypingText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [colorScheme, setColorScheme] = useState("purple"); // purple, blue, green, red
  const [showAllColors, setShowAllColors] = useState(false);

  const texts = [
    "Full Stack Developer",
    "Web Designer",
    "Problem Solver",
    "Tech Enthusiast",
  ];

  const colorSchemes = {
    purple: { primary: "#6e45e2", secondary: "#88d3ce", accent: "#ff7e5f" },
    blue: { primary: "#667eea", secondary: "#764ba2", accent: "#f093fb" },
    green: { primary: "#11998e", secondary: "#38ef7d", accent: "#ffd89b" },
    red: { primary: "#eb3349", secondary: "#f45c43", accent: "#fa709a" },
    yellow: { primary: "#f6d365", secondary: "#fda085", accent: "#ffe259" },
    pink: { primary: "#ff6fd8", secondary: "#ff8eb3", accent: "#f383ff" },
  };

  const currentColors = colorSchemes[colorScheme];

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const currentText = texts[textIndex];

        if (isDeleting) {
          setTypingText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setTypingText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }

        if (!isDeleting && charIndex === currentText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && charIndex === 0) {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      },
      isDeleting ? 50 : 100,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  const projects = [
    {
      title: "AI Chess Game",
      description:
        "An advanced chess game featuring AI opponent using Minimax algorithm with Alpha-Beta pruning for optimal decision making.",
      tech: ["Python", "AI", "Minimax", "Alpha-Beta Pruning"],
      category: "ai",
      demo: "https://drive.usercontent.google.com/download?id=1U1pbtBod_hLhur5ossve0PrCHlZXY7Eg&export=download&authuser=0",
      code: "https://github.com/FrozenXt/AI-BASED-CHESS-GAME",
      image: "/chess.jpg",
    },
    {
      title: "Online Report Sharing System",
      description:
        "A secure platform for creating, sharing, and collaborating on reports with real-time editing.",
      tech: ["PHP", "MySQL", "JavaScript"],
      category: "fullstack",
      demo: "#",
      code: "https://github.com/FrozenXt/online-report-sharing-system",
      image: "/online.jpg",
    },
    {
      title: "SGPA Calculator",
      description:
        "A comprehensive calculator for students to compute their Semester Grade Point Average with performance analysis.",
      tech: ["HTML/CSS", "JavaScript", "Python"],
      category: "web",
      demo: "#",
      code: "#",
      image: "/images.jpg",
    },
    {
      title: "E-Commerce Website",
      description:
        "A full-featured online store with product catalog, shopping cart, and admin dashboard.",
      tech: ["Laravel", "MySQL", "JavaScript"],
      category: "fullstack",
      demo: "#",
      code: "https://github.com/FrozenXt/E-commerce-website-using-laravel",
      image: "/ecommerce.jpg",
    },
    {
      title: "School Website",
      description:
        "A fully responsive school website with application forms and admin management system.",
      tech: ["Laravel", "SQL", "JavaScript"],
      category: "fullstack",
      demo: "https://schoolwebsite-production-444f.up.railway.app/",
      code: "https://github.com/FrozenXt/School_website",
      image: "/school.jpeg",
    },
    {
      title: "US based Restaurant Website",
      description:
        "A responsive website for a US-based restaurant featuring online ordering and reservation systems, menu management, CRUD operations",
      tech: ["HTML/CSS", "JavaScript", "Alpine.js", "PHP", "Laravel", "MySQL"],
      category: "Fullstack",
      demo: "#",
      code: "https://github.com/FrozenXt/the-lighthouse-cafe.git",
      image: "/restaurant.jpg",
    },
  ];

  const skills = [
    { name: "HTML5", icon: "fab fa-html5", progress: 95 },
    { name: "CSS3", icon: "fab fa-css3-alt", progress: 90 },
    { name: "JavaScript", icon: "fab fa-js", progress: 85 },
    { name: "React", icon: "fab fa-react", progress: 70 },
    { name: "Python", icon: "fab fa-python", progress: 70 },
    { name: "Laravel", icon: "fab fa-laravel", progress: 90 },
    { name: "MySQL", icon: "fas fa-database", progress: 80 },
    { name: "QA", icon: "fab fa-git-alt", progress: 75 },
  ];

  const stats = [
    { number: "10", label: "Projects Completed" },
    { number: "20+", label: "Happy Clients" },
    { number: "1", label: "Years Experience" },
    { number: "15", label: "Technologies" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = "9779849088855";
    const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    setFormData({ name: "", email: "", message: "" });
  };

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/CV final1.pdf"; // File must be in the public folder
    link.download = "Sujal-CV.pdf"; // The name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#1a1a2e" : "#f9fafb",
        color: darkMode ? "#f1f1f1" : "#1a1a2e",
        minHeight: "100vh",
        transition: "all 0.3s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        
        body {
          font-family: 'Poppins', sans-serif !important;
        }

        .gradient-text {
          background: linear-gradient(135deg, ${currentColors.primary} 0%, ${currentColors.secondary} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-bg {
          background: linear-gradient(135deg, ${currentColors.primary} 0%, ${currentColors.secondary} 100%);
        }

        .project-image {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        /* Glow on hover */
        .project-image:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 20px rgba(0, 153, 255, 0.6);
        }


          @media (max-width: 768px) {
            .project-image {
              height: 180px; /* smaller for mobile */
            }
          }


        .glow-effect {
          position: fixed;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
          z-index: 0;
          pointer-events: none;
        }

        .glow-1 {
          background: ${currentColors.primary};
          top: -100px;
          left: -100px;
          animation: float 8s ease-in-out infinite;
        }

        .glow-2 {
          background: ${currentColors.accent};
          bottom: -100px;
          right: -100px;
          animation: float 10s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(50px, 50px); }
        }

        .profile-circle {
          width: 380px;
          height: 380px;
          border-radius: 20px;
          overflow: hidden;
          border: 5px solid rgba(110, 69, 226, 0.3);
          box-shadow: 0 0 50px ${currentColors.primary}80;
          transition: all 0.5s ease;
        }

        .profile-circle:hover {
          transform: scale(1.03);
          box-shadow: 0 0 70px ${currentColors.primary};
        }

        .profile-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-hover {
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
        }

        .social-icon {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          cursor: pointer;
          background: ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"};
        }

        .social-icon:hover {
          transform: translateY(-5px) rotate(360deg);
          background: ${currentColors.primary};
        }

        .tech-badge {
          background: ${currentColors.primary}30;
          color: ${currentColors.secondary};
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 500;
          display: inline-block;
          margin: 0.3rem;
        }

        .skill-card {
          background: ${darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)"};
          padding: 30px;
          border-radius: 15px;
          text-align: center;
          transition: all 0.3s;
          border: 1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
        }

        .skill-card:hover {
          transform: translateY(-10px);
          background: ${currentColors.primary}30;
          border-color: ${currentColors.primary};
        }

        .skill-progress {
          width: 100%;
          height: 6px;
          background: ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
          border-radius: 3px;
          overflow: hidden;
          margin-top: 10px;
        }

        .skill-progress-bar {
          height: 100%;
          background: linear-gradient(to right, ${currentColors.primary}, ${currentColors.secondary});
          border-radius: 3px;
          transition: width 1s ease;
        }

        .navbar-custom {
          backdrop-filter: blur(10px);
          transition: all 0.3s;
          border-bottom: 1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
        }

        .btn-gradient {
          background: linear-gradient(135deg, ${currentColors.primary} 0%, ${currentColors.secondary} 100%);
          border: none;
          color: white;
          padding: 0.8rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-gradient:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px ${currentColors.primary}50;
          color: white;
        }

        .btn-outline-custom {
          background: transparent;
          border: 2px solid ${currentColors.primary};
          color: ${currentColors.primary};
          padding: 0.8rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-outline-custom:hover {
          background: ${currentColors.primary};
          color: white;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 3rem;
          position: relative;
          display: inline-block;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(to right, ${currentColors.primary}, ${currentColors.secondary});
          border-radius: 2px;
        }

        .bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .nav-link-custom {
          color: ${darkMode ? "#f1f1f1" : "#1a1a2e"} !important;
          font-weight: 500;
          transition: color 0.3s;
          position: relative;
        }

        .nav-link-custom::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: ${currentColors.accent};
          transition: width 0.3s;
        }

        .nav-link-custom:hover {
          color: ${currentColors.secondary} !important;
        }

        .nav-link-custom:hover::after {
          width: 100%;
        }

        .card-custom {
          background: ${darkMode ? "rgba(255, 255, 255, 0.05)" : "#ffffff"};
          border: 1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "#e1e4e8"};
          transition: all 0.3s;
        }

        .text-muted-custom {
          color: ${darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)"} !important;
        }

        .bg-secondary-custom {
          background: ${darkMode ? "rgba(255, 255, 255, 0.03)" : "#f6f8fa"} !important;
        }

        .color-picker {
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1000;
            background: rgba(26, 26, 46, 0.95);
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
          }

          .color-option {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            margin: 5px;
            transition: transform 0.3s, opacity 0.3s;
            border: 2px solid transparent;
          }

          .color-option:hover {
            transform: scale(1.2);
          }

          .color-option.active {
            border-color: white;
            transform: scale(1.3);
          }
            .display-3 {
            font-size: 2rem !important;
          }
          .fs-4 {
            font-size: 1.1rem !important;
          }
          .lead {
            font-size: 1rem !important;
          }
          .stat-number {
            font-size: 2rem !important;
          }
          .glow-effect {
            width: 200px;
            height: 200px;
          }
          .color-picker {
            top: 80px;
            right: 10px;
            padding: 10px;
          }
          .color-option {
            width: 25px;
            height: 25px;
          }
          .btn-gradient, .btn-outline-custom {
            padding: 0.6rem 1.5rem;
            font-size: 0.9rem;
          }
          .social-icon {
            width: 40px;
            height: 40px;
          }
          .skill-card {
            padding: 20px;
          }
          .tech-badge {
            font-size: 0.75rem;
            padding: 0.3rem 0.8rem;
          }
        }
        
        @media (max-width: 576px) {
          .profile-circle {
            width: 240px;
            height: 240px;
          }
          .section-title {
            font-size: 1.5rem;
          }
          .display-3 {
            font-size: 1.75rem !important;
          }
          .color-picker {
            transform: scale(0.9);
          }
        }


        .form-control-custom {
          background: ${darkMode ? "rgba(255, 255, 255, 0.05)" : "#ffffff"};
          border: 1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "#e1e4e8"};
          color: ${darkMode ? "#f1f1f1" : "#1a1a2e"};
          padding: 0.8rem;
          border-radius: 10px;
        }

        .form-control-custom:focus {
          background: ${darkMode ? "rgba(255, 255, 255, 0.08)" : "#ffffff"};
          border-color: ${currentColors.primary};
          color: ${darkMode ? "#f1f1f1" : "#1a1a2e"};
          box-shadow: 0 0 0 0.2rem ${currentColors.primary}30;
        }
          .form-control-custom::placeholder {
            color: ${darkMode ? "rgba(255, 255, 255, 0.6)" : "#6c757d"};
            opacity: 1;
          }


        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(to right, ${currentColors.primary}, ${currentColors.secondary});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
          

        @media (max-width: 768px) {
          .profile-circle {
            width: 280px;
            height: 280px;
          }
          .section-title {
            font-size: 1.75rem;
          }
        }
      `}</style>

      {/* Glow Effects */}
      <div className="glow-effect glow-1"></div>
      <div className="glow-effect glow-2"></div>

      {/* Color Picker */}
      <div
        className="color-picker"
        onMouseEnter={() => setShowAllColors(true)}
        onMouseLeave={() => setShowAllColors(false)}
      >
        <div
          className="text-center mb-2"
          style={{ fontSize: "0.8rem", fontWeight: "600" }}
        >
          Color Theme
        </div>

        <div className="d-flex flex-column">
          {/* Show only active color OR all colors on hover */}
          {(showAllColors ? Object.keys(colorSchemes) : [colorScheme]).map(
            (scheme) => (
              <div
                key={scheme}
                className={`color-option ${colorScheme === scheme ? "active" : ""}`}
                style={{
                  background: `linear-gradient(135deg, ${colorSchemes[scheme].primary}, ${colorSchemes[scheme].secondary})`,
                }}
                onClick={() => setColorScheme(scheme)}
              />
            ),
          )}
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={`navbar navbar-expand-lg fixed-top navbar-custom ${darkMode ? "navbar-dark" : "navbar-light"}`}
        style={{
          backgroundColor: darkMode
            ? "rgba(26, 26, 46, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
        }}
      >
        <div className="container">
          <a className="navbar-brand gradient-text fw-bold fs-3" href="#home">
            Sujal.
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {["home", "skills", "projects", "contact"].map((item) => (
                <li className="nav-item" key={item}>
                  <a
                    className="nav-link nav-link-custom"
                    href={`#${item}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item);
                    }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
            <button
              className="btn ms-3"
              onClick={() => setDarkMode(!darkMode)}
              style={{
                background: darkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
                border: "none",
                borderRadius: "10px",
                padding: "0.5rem 0.8rem",
              }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        style={{
          paddingTop: "120px",
          paddingBottom: "80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="display-3 fw-bold mb-3">
                Hi, I'm <span className="gradient-text">Sujal Lamichhane</span>
              </h1>
              <div
                className="gradient-text fs-4 fw-semibold mb-4"
                style={{ minHeight: "40px" }}
              >
                {typingText}
              </div>
              <p
                className="lead text-muted-custom mb-4"
                style={{ lineHeight: "1.8" }}
              >
                A passionate web developer with expertise in creating modern,
                responsive, and user-friendly web applications. I specialize in
                front-end development but also enjoy working on full-stack
                projects.
              </p>
              <div className="d-flex gap-3 mb-4 flex-wrap">
                <button
                  className="btn btn-gradient"
                  onClick={() => scrollToSection("projects")}
                >
                  View My Work
                </button>
                <button
                  className="btn btn-outline-custom"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact Me
                </button>
                <button className="btn btn-outline-custom" onClick={downloadCV}>
                  <Download size={18} className="me-2" />
                  Download CV
                </button>
              </div>
              <div className="d-flex gap-3">
                <a
                  href="https://github.com/FrozenXt"
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/sujal-lamichhane-10266728b/"
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={20} />
                </a>
                <a href="#" className="social-icon">
                  <Twitter size={20} />
                </a>
                <a href="#" className="social-icon">
                  <Instagram size={20} />
                </a>
                <a href="#" className="social-icon">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="profile-circle mx-auto">
                <img src="/sujal.png" alt="Sujal Lamichhane" />
              </div>
            </div>
          </div>
          <div className="text-center mt-5 bounce">
            <ChevronDown size={40} className="text-muted-custom" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-5 bg-secondary-custom"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="container">
          <div className="row g-4 text-center">
            {stats.map((stat, idx) => (
              <div className="col-lg-3 col-md-6" key={idx}>
                <div className="card-custom p-4 rounded-3 card-hover">
                  <div className="stat-number">{stat.number}</div>
                  <div className="text-muted-custom mt-2">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-5"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <Code
              size={40}
              className="mb-3"
              style={{ color: currentColors.primary }}
            />
            <h2 className="section-title"> My Skills</h2>
          </div>
          <div className="row g-4">
            {skills.map((skill, idx) => (
              <div className="col-lg-4 col-md-6" key={idx}>
                <div className="skill-card">
                  <i
                    className={`${skill.icon} fs-1 mb-3`}
                    style={{ color: currentColors.secondary }}
                  ></i>
                  <div className="fw-bold mb-2">{skill.name}</div>
                  <div className="skill-progress">
                    <div
                      className="skill-progress-bar"
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-5 bg-secondary-custom"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <Briefcase
              size={40}
              className="mb-3"
              style={{ color: currentColors.primary }}
            />
            <h2 className="section-title">My Projects</h2>
          </div>
          <div className="row g-4">
            {projects.map((project, idx) => (
              <div className="col-lg-6" key={idx}>
                <div className="card card-custom h-100 card-hover border-0">
                  <div className="card-body p-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image mb-3"
                    />
                    <h3
                      className="fw-bold mb-3"
                      style={{ color: currentColors.primary }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-muted-custom mb-4">
                      {project.description}
                    </p>
                    <div className="mb-4">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="d-flex gap-3">
                      <a
                        href={project.demo}
                        className="text-decoration-none d-inline-flex align-items-center"
                        style={{
                          color: currentColors.primary,
                          fontWeight: "600",
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={18} className="me-2" />
                        Demo
                      </a>
                      <a
                        href={project.code}
                        className="text-decoration-none d-inline-flex align-items-center"
                        style={{
                          color: currentColors.primary,
                          fontWeight: "600",
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={18} className="me-2" />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-5"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <MessageSquare
              size={40}
              className="mb-3"
              style={{ color: currentColors.primary }}
            />
            <h2 className="section-title">Get In Touch</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <form onSubmit={handleSubmit} className="mb-5">
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-custom"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-custom"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    name="message"
                    className="form-control form-control-custom"
                    rows="5"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-gradient w-100">
                  <Send size={18} className="me-2" />
                  Send Message via WhatsApp
                </button>
              </form>

              <div className="row g-4 mt-4">
                <div className="col-md-4">
                  <a
                    href="mailto:sujallc30@gmail.com"
                    className="text-decoration-none"
                  >
                    <div className="card card-custom text-center card-hover border-0 h-100">
                      <div className="card-body p-4">
                        <Mail
                          size={40}
                          className="mb-3"
                          style={{ color: currentColors.primary }}
                        />
                        <h5
                          className="fw-bold mb-2"
                          style={{ color: currentColors.primary }}
                        >
                          Email
                        </h5>
                        <p
                          className="text-muted-custom mb-0"
                          style={{ fontSize: "0.9rem" }}
                        >
                          sujallc30@gmail.com
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-4">
                  <a href="tel:+9779849088855" className="text-decoration-none">
                    <div className="card card-custom text-center card-hover border-0 h-100">
                      <div className="card-body p-4">
                        <Phone
                          size={40}
                          className="mb-3"
                          style={{ color: currentColors.primary }}
                        />
                        <h5
                          className="fw-bold mb-2"
                          style={{ color: currentColors.primary }}
                        >
                          Phone
                        </h5>
                        <p
                          className="text-muted-custom mb-0"
                          style={{ fontSize: "0.9rem" }}
                        >
                          +977 9849088855
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-4">
                  <div className="card card-custom text-center card-hover border-0 h-100">
                    <div className="card-body">
                      <MapPin
                        size={40}
                        className="mb-3"
                        style={{ color: currentColors.primary }}
                      />
                      <h5
                        className="fw-bold mb-2"
                        style={{ color: currentColors.primary }}
                      >
                        Location
                      </h5>
                      <p
                        className="text-muted-custom mb-0"
                        style={{ fontSize: "0.9rem" }}
                      >
                        Kathmandu, Nepal
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-4"
        style={{
          backgroundColor: darkMode
            ? "rgba(0, 0, 0, 0.3)"
            : "rgba(0, 0, 0, 0.05)",
          borderTop: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <a
                  className="navbar-brand gradient-text fw-bold fs-4"
                  href="#home"
                >
                  Sujal.
                </a>
                <span
                  className="text-muted-custom ms-3"
                  style={{ fontSize: "0.9rem" }}
                >
                  © {new Date().getFullYear()} All rights reserved.
                </span>
              </div>
            </div>
            <div className="d-flex gap-3">
              <a
                href="https://github.com/FrozenXt"
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: "40px", height: "40px" }}
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/sujal-lamichhane-10266728b/"
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: "40px", height: "40px" }}
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:sujallc30@gmail.com"
                className="social-icon"
                style={{ width: "40px", height: "40px" }}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
          <div className="text-center mt-4">
            <p
              className="text-muted-custom mb-0"
              style={{ fontSize: "0.85rem" }}
            >
              Designed and developed with ❤️ by Sujal Lamichhane
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
