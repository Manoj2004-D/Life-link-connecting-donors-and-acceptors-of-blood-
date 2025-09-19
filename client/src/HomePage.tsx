import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X, Droplet, Users, Calendar, ArrowUp } from "lucide-react";
import axios from "axios";


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const requestData = {
    name: (document.getElementById("name") as HTMLInputElement).value,
    bloodGroup: selectedGroup,
    units: parseInt((document.getElementById("units") as HTMLInputElement).value),
    contact: (document.getElementById("contact") as HTMLInputElement).value,
  };

  try {
    await axios.post("http://localhost:5000/api/requests", requestData);
    alert("✅ Request submitted successfully!");
    setShowModal(false);
  } catch (err) {
    console.error(err);
    alert("❌ Failed to submit request. Try again.");
  }
};







  // Track active section with IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);



  // Show/hide Back to Top button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Example static data (later you can fetch from backend)
  const bloodGroups = [
    { type: "A+", units: 45, donateTo: "A+, AB+", receiveFrom: "A+, A-, O+, O-" },
    { type: "A-", units: 12, donateTo: "A+, A-, AB+, AB-", receiveFrom: "A-, O-" },
    { type: "B+", units: 38, donateTo: "B+, AB+", receiveFrom: "B+, B-, O+, O-" },
    { type: "B-", units: 8, donateTo: "B+, B-, AB+, AB-", receiveFrom: "B-, O-" },
    { type: "AB+", units: 15, donateTo: "AB+", receiveFrom: "All groups" },
    { type: "AB-", units: 6, donateTo: "AB+, AB-", receiveFrom: "A-, B-, AB-, O-" },
    { type: "O+", units: 28, donateTo: "A+, B+, AB+, O+", receiveFrom: "O+, O-" },
    { type: "O-", units: 18, donateTo: "All groups", receiveFrom: "O-" },
  ];

  // Reusable nav link styles
  const navLink = (id: string) =>
    `hover:text-gray-200 ${
      activeSection === id ? "text-yellow-300 underline" : ""
    }`;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-red-50 to-white text-gray-900"
      style={{ scrollBehavior: "smooth" }}
    >
{/* Navbar */}
<nav className="flex justify-between items-center bg-red-600 text-white px-8 py-7 shadow-lg fixed top-0 w-full z-50">
  {/* Logo */}
  <div className="flex items-center space-x-2">
    <Heart className="w-9 h-9" />
    <span className="font-bold text-3xl">Life Link</span>
  </div>

  {/* Left Navigation (Main Sections) */}
  <ul className="hidden md:flex space-x-10 font-semibold text-lg items-center">
    <li><a href="#benefits" className={navLink("benefits")}>Why Donate?</a></li>
    <li><a href="#blood-groups" className={navLink("blood-groups")}>Blood Groups</a></li>
    <li><a href="#about" className={navLink("about")}>About</a></li>
    <li><a href="#events" className={navLink("events")}>Events</a></li>
    <li><a href="#contact" className={navLink("contact")}>Contact</a></li>
  </ul>

  {/* Right Navigation (Auth Links) */}
  <ul className="hidden md:flex space-x-6 font-semibold text-lg">
    <li><Link to="/dashboard" className="hover:text-gray-200">Admin</Link></li>
    <li><Link to="/login" className="hover:text-gray-200">Login</Link></li>
    <li><Link to="/register" className="hover:text-gray-200">Register</Link></li>
  </ul>

  {/* Mobile Menu Button */}
  <button
    className="md:hidden"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
  </button>
</nav>

{/* Mobile Menu (Slide-in) */}
<AnimatePresence>
  {menuOpen && (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed top-0 right-0 h-full w-64 bg-red-700 text-white shadow-lg z-50 flex flex-col space-y-6 p-10 md:hidden"
    >
      {/* Main Links */}
      <a href="#benefits" className={navLink("benefits")} onClick={() => setMenuOpen(false)}>Why Donate?</a>
      <a href="#blood-groups" className={navLink("blood-groups")} onClick={() => setMenuOpen(false)}>Blood Groups</a>
      <a href="#about" className={navLink("about")} onClick={() => setMenuOpen(false)}>About</a>
      <a href="#events" className={navLink("events")} onClick={() => setMenuOpen(false)}>Events</a>
      <a href="#contact" className={navLink("contact")} onClick={() => setMenuOpen(false)}>Contact</a>

      <hr className="border-gray-400 my-4" />

      {/* Auth Links */}
      <Link to="/dashboard" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>Admin</Link>
      <Link to="/login" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>Login</Link>
      <Link to="/register" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>Register</Link>
    </motion.div>
  )}
</AnimatePresence>


      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center h-screen px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          Save Lives, <span className="text-red-600">Donate Blood</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-600 mb-8 text-center max-w-4xl mx-auto"
        >
          Every drop counts. Be the reason someone smiles today by becoming a blood donor.
        </motion.p>
        <motion.a
          href="#benefits"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 text-white px-20 py-5 rounded-full text-2xl font-bold shadow-lg hover:bg-red-700 transition"
        >
          Become a Donor
        </motion.a>
      </header>

{/* About Section */}
<section
  id="about"
  className="relative min-h-screen flex items-center justify-center py-20 px-10 scroll-mt-24"
>
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
style={{
  backgroundImage: "url('/images/about-bg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
}}
  ></div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-red-900 bg-opacity-70"></div>

  {/* Content */}
  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto px-6">
    {/* Left Side (Image placeholder, handled by bg) */}
    <div className="hidden md:block"></div>

    {/* Right Side (Text) */}
    <div className="text-white text-center md:text-left">
      <motion.h2
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold mb-6"
      >
        About Us
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-base md:text-xl leading-relaxed"
      >
        Our{" "}
        <span className="font-bold text-yellow-300">
          Blood Bank Management System
        </span>{" "}
        connects donors and recipients, ensuring timely access to blood.
        We aim to create a compassionate community where every donation counts
        and no life is lost due to blood shortage.
      </motion.p>

      {/* Button */}
      <motion.a
        href="#benefits"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 inline-block bg-yellow-400 text-red-900 font-semibold px-6 md:px-8 py-2 md:py-3 rounded-full shadow-lg hover:bg-yellow-300 transition"
      >
        Why Donate Blood?
      </motion.a>
    </div>
  </div>
</section>





      {/* Benefits Section */}
      <motion.section
        id="benefits"
        className="min-h-screen flex flex-col justify-center py-25 px-10 bg-gray-50 scroll-mt-24"
        initial={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-6xl font-bold text-center mb-12">Why Donate Blood?</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-25xl mx-auto">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <Droplet className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Save Lives</h3>
            <p className="text-gray-600">Your donation can save up to three lives and give hope to families in need.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Build Community</h3>
            <p className="text-gray-600">Donating blood helps strengthen the bond in our community through care.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <Calendar className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Quick & Easy</h3>
            <p className="text-gray-600">Donation takes only 15 minutes and can be scheduled at your convenience.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Available Blood Groups Section */}
      <motion.section
        id="blood-groups"
        className="min-h-screen py-23 px-6 bg-white scroll-mt-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-5xl font-bold text-center mb-12">Available Blood Groups</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {bloodGroups.map((group, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 border rounded-2xl shadow-lg p-6 text-center"
            >
              <h3 className="text-4xl font-bold text-red-600 mb-2 center">{group.type}</h3>
              <span className="inline-block bg-red-100 text-red-700 px-5 py-2 rounded-full text-sm font-semibold mb-4 center">
                {group.units} units
              </span>
              <p className="text-sm text-gray-600 mb-2"><strong>Can donate to:</strong> {group.donateTo}</p>
              <p className="text-sm text-gray-600 mb-4"><strong>Can receive from:</strong> {group.receiveFrom}</p>
              <button className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition"                 onClick={() => {
                  setSelectedGroup(group.type);
                  setShowModal(true);
                }}>
                Request Blood
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

{/* Modal Form */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
      {/* ✅ Modal Content */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-4">
            Request Blood ({selectedGroup})
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input id="name" type="text" placeholder="Full Name"
              className="w-full border px-4 py-2 rounded-lg" required />
            <input type="text" value={selectedGroup} readOnly
              className="w-full border px-4 py-2 rounded-lg bg-gray-100" />
            <input id="units" type="number" placeholder="Units Needed"
              className="w-full border px-4 py-2 rounded-lg" required />
            <input id="contact" type="text" placeholder="Contact Info"
              className="w-full border px-4 py-2 rounded-lg" required />
            <button type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition">
              Submit Request
            </button>
          </form>
          <button onClick={() => setShowModal(false)}
            className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition">
            Cancel
          </button>
        </div>
      </motion.div>
          </>
        )}
      </AnimatePresence>















{/* Events Section */}
<section
  id="events"
  className="min-h-screen flex flex-col justify-center py-110 px-6 bg-gray-50 scroll-mt-24"
>
  <h2 className="text-5xl font-bold text-center mb-16 text-gray-800">
    Upcoming Events
  </h2>

  <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
    {/* Event 1 */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <img
        src="public/images/optimized_event1.jpg"
        alt="Blood Donation Camp"
        className="w-full h-80 object-cover"
      />
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-red-600 mb-2">
          Blood Donation Camp
        </h3>
        <p className="text-gray-700 text-lg">
          Join us for our upcoming <span className="font-semibold">donation camp</span>,  
          where your small step can bring a big change. 💉❤️
        </p>
      </div>
    </motion.div>

    {/* Event 2 */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <img
        src="/images/optimized_event2.jpg"
        alt="Awareness Drive"
        className="w-full h-80 object-cover"
      />
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-red-600 mb-2">
          Blood Donation Awareness Drive
        </h3>
        <p className="text-gray-700 text-lg">
          Be part of our <span className="font-semibold">awareness drive </span>  
          and inspire more heroes to donate blood. 🌍✨
        </p>
      </div>
    </motion.div>
  </div>
</section>

{/* Contact Section */}
<section
  id="contact"
  className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 scroll-mt-24 px-6 py-20"
>
  <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-10 text-center">
    <h2 className="text-4xl md:text-5xl font-extrabold text-red-600 mb-6">
      Contact Us
    </h2>
    <p className="text-lg text-gray-700 mb-10">
      Have questions or want to get involved? Reach out to us — we’d love to hear from you!
    </p>

    {/* Contact Details */}
    <div className="grid md:grid-cols-3 gap-8 text-gray-800 mb-10">
      <div>
        <p className="text-xl font-semibold mb-2">📧 Email</p>
        <a href="mailto:manojd150535@gmail.com" className="text-red-600 font-medium hover:underline">
          supportus@gmail.com
        </a>
      </div>
      <div>
        <p className="text-xl font-semibold mb-1">📞 Phone</p>
        <p className="text-gray-700"><a href="tel:+918147690535">+91 8147690535</a></p>
      </div>
      <div>
        <p className="text-xl font-semibold mb-2">📍 Location</p>
        <p className="text-gray-700">Bangalore, Karnataka, India</p>
      </div>
    </div>

    {/* Contact Form */}
    <form className="grid gap-4 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Your Name"
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
        required
      />
      <textarea
        placeholder="Your Message"
        rows={4}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
        required
      ></textarea>
      <button
        type="submit"
        className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
      >
        Send Message
      </button>
    </form>
  </div>
</section>


      {/* Back to Top Button */}
      <AnimatePresence>
        {showTopButton && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
