import { useAuthStore } from "@/app/(auth)/store/userAuth";
export default function DashboardHome() {
  const { user } = useAuthStore();
  return (
    <>
      <div className=" text-white">
        <div id="greetings" className="pt-4 pl-4">
          <h1 className="text-3xl ">
            Welcome!, Hello{" "}
            <span className="font-bold text-blue-500 animate-pulse">
              {user?.user_metadata.firstName}
            </span>
          </h1>
        </div>
      </div>
    </>
  );
}
