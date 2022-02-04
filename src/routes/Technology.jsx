import { useParams } from "react-router-dom";

function Technology() {
  let params = useParams();

  return (
    <div className="Technology">
      <h1>Technology Page</h1>
      <p>{params.technology}</p>
    </div>
  );
}

export default Technology;
