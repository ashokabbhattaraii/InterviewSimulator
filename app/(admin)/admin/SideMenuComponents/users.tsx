"use client";
import { useEffect, useState } from "react";
import { AddUser, getUsers } from "@/app/(auth)/AuthActions/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Loader2, ArrowLeft, ArrowRight, Edit, Trash } from "lucide-react";
import { fa } from "zod/locales";
import AddUserForm from "../Form/Form";
import { useFormContext } from "../Context";
interface userType {
  id: string;
  fname?: string;
  email: string;
}
interface GetUsersResponse {
  success: boolean;
  user: userType[] | null;
}
export default function User() {
  const [page, setPage] = useState(1);
  const { isAddUserFormOpen, setIsAddUserFormOpen } = useFormContext();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  function managePage(direction: "next" | "prev") {
    if (direction == "next") {
      setPage((old) => old + 1);
      console.log(page);
    } else if (direction == "prev" && page > 1) {
      setPage((old) => old - 1);
      console.log(page);
    }
  }
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const res = await getUsers(page);
      return res;
    },

    refetchInterval: 1000 * 60,
  });
  function handleDelete(userId: string) {
    setUserIdToDelete(userId);
    setIsDeleteDialogOpen(true);
  }
  async function confirmDelete(userId: string) {
    const res = await fetch("/api/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    if (data.success) {
      alert("User deleted successfully");
      refetch();
    } else {
      alert("Error deleting user");
    }
  }

  if (isLoading)
    return (
      <div className="flex flex-col justify-center  items-center min-h-screen w-full text-foreground text-2xl font-bold">
        <Loader2 className="animate-spin"></Loader2>
        <p>Loading...</p>
      </div>
    );
  if (error) return <p>Error fetching users</p>;
  return (
    <div className="p-6 text-foreground">
      <div className="flex justify-between my-2">
        <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary text-transparent  bg-clip-text">
          Manage Users
        </h1>
        <button
          className="px-3 py-3 bg-primary text-primary-foreground rounded-xl font-bold cursor-pointer hover:scale-105 transition-all ease-in-out duration-200 shadow shadow-primary/50"
          onClick={() => setIsAddUserFormOpen(!isAddUserFormOpen)}
        >
          Add Users
        </button>
      </div>
      {isAddUserFormOpen && (
        <div className="fixed z-1000">
          <AddUserForm></AddUserForm>
        </div>
      )}
      <table className="w-full border border-spacing-0   rounded-2xl border-separate overflow-hidden bg-card border-border  ">
        <thead className="   bg-secondary/10 text-primary">
          <tr className=" ">
            <th className="py-4 px-3">SN</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Role</th>
            <th>Functions</th>
          </tr>
        </thead>
        <tbody className=" ">
          {data?.user?.map((u, i) => {
            const updatedCreatedAt = new Date(
              u.created_at,
            ).toLocaleDateString();
            return (
              <tr className="text-left hover:bg-muted/50 transition-colors text-foreground">
                <td className="text-center py-4 px-3">{i + 1}</td>
                <td>{u.user_metadata.firstName}</td>
                <td>{u.user_metadata.lastName}</td>
                <td>{u.user_metadata.username}</td>
                <td>{u.email}</td>
                <td>{updatedCreatedAt}</td>
                <td className="flex justify-center items-center">
                  <span className="  px-3 py-2 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 flex justify-center items-center mt-2">
                    {u.app_metadata.role}
                  </span>
                </td>
                <td className="">
                  <div className="flex justify-center items-center gap-2 text-muted-foreground hover:text-foreground">
                    {" "}
                    <Edit></Edit>
                    <Trash onClick={() => handleDelete(u.id)}></Trash>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center absolute bottom-5 right-0 items-center mr-10 mt-2 gap-4 ">
        <button
          disabled={page === 1}
          className=" h-12 flex justify-center items-center w-12 rounded-full disabled:cursor-not-allowed disabled:bg-muted bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-md"
          onClick={() => managePage("prev")}
        >
          <ArrowLeft
            size={35}
            className={`hover:-translate-x-1 transition-all ease-out duration-200`}
          ></ArrowLeft>
        </button>
        <div className="bg-primary/10 text-primary font-bold px-4 py-2 rounded border border-primary/20">
          Page {page}
        </div>
        <button
          className=" h-12 flex justify-center items-center w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-md hover:shadow-lg"
          onClick={() => managePage("next")}
        >
          {" "}
          <ArrowRight
            className={`hover:translate-x-1 transition-all ease-out duration-200`}
            size={35}
          ></ArrowRight>
        </button>
      </div>
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-foreground">
              Confirm Deletion
            </h2>
            <p className="mb-4 text-foreground">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-muted text-foreground rounded hover:bg-muted/90"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => {
                  confirmDelete(userIdToDelete!);
                  setIsDeleteDialogOpen(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
