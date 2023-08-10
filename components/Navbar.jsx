import Button from "@mui/material/Button";

function Navbar() {
  return (
    <div className="h-full w-full hidden md:flex md:flex-col md:gap-7 text-white md:text-lg font-bold md:p-4 md:items-center">
      <div className="h-1/4 w-1/2 md:flex md:flex-col md:gap-10 md:justify-between">
        <Button variant="contained" className="text-white font-bold text-lg">
          Add
        </Button>

        <Button variant="contained" className="text-white font-bold text-lg">
          Delete
        </Button>
        <Button variant="contained" className="text-white font-bold text-lg">
          Modify
        </Button>
        <Button variant="contained" className="text-white font-bold text-lg">
          Login
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
