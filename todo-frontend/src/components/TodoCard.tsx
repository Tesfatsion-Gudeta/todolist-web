import { useState } from "react";
import { Checkbox } from "./ui/checkbox"; // Assuming this is the ShadCN Checkbox
import { Trash } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";

const TodoCard = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChecked = (checked: CheckedState) => {
    setIsChecked(!!checked);
  };

  return (
    <div className="flex gap-5 items-center m-5">
      <Checkbox onCheckedChange={(checked) => handleChecked(checked)} />
      <p className={`${isChecked ? "line-through text-gray-500" : ""}`}>
        Todo text
      </p>

      <Trash className="w-5 h-5 cursor-pointer" />
    </div>
  );
};

export default TodoCard;
