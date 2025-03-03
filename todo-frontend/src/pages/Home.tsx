import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex justify-center flex-col items-center gap-10">
      <div className="text-2xl">
        GET YOU TASKS ORGANISED WITH A SIMPLE TODOS WEB APP!
      </div>
      <Link to="/todos">
        <Button>login</Button>
      </Link>
    </div>
  );
};

export default Home;
