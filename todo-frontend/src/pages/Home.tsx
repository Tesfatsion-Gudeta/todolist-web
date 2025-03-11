import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex justify-center flex-col items-center gap-10">
      <div className="font-poppins text-4xl font-bold">
        GET YOU TASKS ORGANISED WITH A SIMPLE TODOS WEB APP!
      </div>
      <Link to="/Signup">
        <Button size="lg" className="text-2xl cursor-pointer">
          Signup
        </Button>
      </Link>
    </div>
  );
};

export default Home;
