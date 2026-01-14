import React, { useState } from "react";
import "./App.css";

// PUBLIC_INTERFACE
/**
 * FurEverCareNavbar
 * Responsive navigation bar for FurEverCare with dropdown support and authentication actions.
 *
 * Structure:
 * - Left: Brand logo/symbol + "FurEverCare"
 * - Center: Main navigation (with dropdowns where needed)
 * - Right: Login/Logout/Sign Up (conditionally rendered)
 *
 * CSS classes follow App.css/brand guide, ready for extension (icons, responsiveness).
 */
function FurEverCareNavbar({ isAuthenticated = false, onLogin, onLogout, onSignUp }) {
  // Dropdown menu open states for each section
  const [openDropdown, setOpenDropdown] = useState(null);

  // Dropdown content definitions for main nav
  const navItems = [
    {
      label: "Home",
      href: "/",
      hasDropdown: false,
    },
    {
      label: "My Pets",
      href: "/pets",
      hasDropdown: true,
      dropdown: [
        { label: "All Pets", href: "/pets" },
        { label: "Add Pet", href: "/pets/add" },
        { label: "Pet Profiles", href: "/pets/profiles" },
      ],
    },
    {
      label: "Appointments",
      href: "/appointments",
      hasDropdown: true,
      dropdown: [
        { label: "Vet Visits", href: "/appointments/vet" },
        { label: "Vaccinations", href: "/appointments/vaccines" },
        { label: "Grooming", href: "/appointments/grooming" },
      ],
    },
    {
      label: "Progress",
      href: "/progress",
      hasDropdown: true,
      dropdown: [
        { label: "Wellness Tracker", href: "/progress/wellness" },
        { label: "Activity Log", href: "/progress/activity" },
        { label: "Diet/Nutrition", href: "/progress/diet" },
        { label: "Behavior Notes", href: "/progress/behavior" },
      ],
    },
    {
      label: "Settings",
      href: "/settings",
      hasDropdown: true,
      dropdown: [
        { label: "Profile", href: "/settings/profile" },
        { label: "Preferences", href: "/settings/preferences" },
        { label: "Reminders", href: "/settings/reminders" },
      ],
    },
  ];

  const handleDropdown = (idx) => {
    setOpenDropdown(openDropdown === idx ? null : idx);
  };

  const handleDropdownBlur = (e, idx) => {
    // Delay needed so click on dropdown items counts before close
    setTimeout(() => {
      if (openDropdown === idx) setOpenDropdown(null);
    }, 100);
  };

  return (
    <nav className="navbar">
      <div className="container" style={{ width: "100%" }}>
        <div className="fec-navbar-root" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          {/* Brand */}
          <a href="/" className="logo" style={{ textDecoration: "none" }}>
            <span className="logo-symbol" role="img" aria-label="Paw Print" style={{ fontSize: "1.6em" }}>🐾</span>
            <span className="logo-text" style={{ color: "var(--kavia-orange)" }}>FurEver</span>
            <span className="logo-text" style={{ color: "var(--text-color)", marginLeft: 2 }}>Care</span>
          </a>

          {/* Main Navigation */}
          <ul className="fec-navbar-list" style={{ display: "flex", alignItems: "center", gap: "28px", listStyle: "none", margin: 0, padding: 0 }}>
            {navItems.map((item, idx) =>
              item.hasDropdown ? (
                <li
                  className="fec-navbar-item fec-dropdown"
                  key={item.label}
                  tabIndex={0}
                  onBlur={(e) => handleDropdownBlur(e, idx)}
                  style={{ position: "relative" }}
                >
                  <button
                    className="fec-nav-link fec-dropdown-toggle"
                    onClick={() => handleDropdown(idx)}
                    aria-expanded={openDropdown === idx}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text-color)",
                      font: "inherit",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    {item.label}
                    <span aria-hidden="true" style={{ fontSize: "0.95em" }}>▼</span>
                  </button>
                  {openDropdown === idx && (
                    <ul
                      className="fec-dropdown-menu"
                      style={{
                        position: "absolute",
                        top: "2.2em",
                        left: 0,
                        background: "var(--kavia-dark)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "6px",
                        boxShadow: "0 4px 16px rgba(30, 30, 30, 0.2)",
                        minWidth: "170px",
                        zIndex: 300,
                        padding: "6px 0",
                        margin: 0
                      }}
                    >
                      {item.dropdown.map((d) => (
                        <li key={d.href}>
                          <a
                            className="fec-dropdown-link"
                            href={d.href}
                            style={{
                              display: "block",
                              color: "var(--text-color)",
                              padding: "10px 18px",
                              textDecoration: "none",
                              fontSize: "1rem",
                              whiteSpace: "nowrap"
                            }}
                            onClick={() => setOpenDropdown(null)}
                          >
                            {d.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li className="fec-navbar-item" key={item.label}>
                  <a
                    href={item.href}
                    className="fec-nav-link"
                    style={{
                      textDecoration: "none",
                      color: "var(--text-color)",
                      fontWeight: 500,
                      padding: "2px 4px",
                      fontSize: "1.02rem",
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>

          {/* Auth buttons: right aligned */}
          <div className="fec-navbar-auth" style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: 150, justifyContent: "flex-end" }}>
            {!isAuthenticated ? (
              <>
                <button className="btn fec-auth-btn" onClick={onLogin}>Login</button>
                <button className="btn fec-auth-btn" onClick={onSignUp} style={{ backgroundColor: "var(--kavia-orange)" }}>Sign Up</button>
              </>
            ) : (
              <button className="btn fec-auth-btn" onClick={onLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default FurEverCareNavbar;
