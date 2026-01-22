import { useAuthStore } from "@/app/(auth)/store/userAuth";
export default function SettingsMenu() {
  const { user } = useAuthStore();
  return (
    <>
      <div className=" text-foreground">
        <h1>Settings</h1>
      </div>
    </>
  );
}
