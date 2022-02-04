import "../css/Home.css";
import "pattern.css/dist/pattern.css";
import Navbar from "./Navbar";

function Home() {
  return (
    <div className="Home pattern-dots-sm">
      <Navbar />

      <h1>Snippet</h1>
      <p>
        <strong>
          Hello! Welcome to my modest collection of code snippet cheat sheets
          i've collected!
        </strong>
      </p>

      <input type="text" placeholder="Search collection..." />

      {/* For Visuals */}
    </div>
  );
}

export default Home;
