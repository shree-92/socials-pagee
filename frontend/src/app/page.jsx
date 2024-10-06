import Link from "next/link";

const Homepage = () => {
  return (
    <div className="flex flex-col md:gap-x-10 justify-center items-center text-3xl gap-y-10  font-bold">
      <Link href={"user/login"}>
        <div className="bg-red-500 w-fit p-4 rounded-md shadow-2xl shadow-red-600 hover:shadow-red-500 hover:bg-red-700 ">
          LOG IN
        </div>
      </Link>
      <Link href={"user/register"} >
        <div className="bg-green-500 w-fit p-4 rounded-md shadow-2xl shadow-green-600 hover:shadow-green-500 hover:bg-green-700 ">
          REGISTER
        </div>
      </Link>
    </div>
  );
};

export default Homepage;
