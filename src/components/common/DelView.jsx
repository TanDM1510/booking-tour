import { Tooltip } from "@nextui-org/react";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { Link } from "react-router-dom";

const DelView = ({ name, linkEdit, linkView }) => {
  return (
    <div className="relative flex items-center gap-2">
      <Tooltip content="Details">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <Link to={linkView}>
            <EyeIcon />
          </Link>
        </span>
      </Tooltip>
      <Tooltip content={`Edit ${name}`}>
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <Link to={linkEdit}>
            {" "}
            <EditIcon />
          </Link>
        </span>
      </Tooltip>
      <Tooltip color="danger" content={`Delete ${name}`}>
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <DeleteIcon />
        </span>
      </Tooltip>
    </div>
  );
};
export default DelView;
