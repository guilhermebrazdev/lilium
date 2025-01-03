import { IAddUserPayload } from "@/interfaces/IAddUserPayload";
import { IUpdateUserPayload } from "@/interfaces/IUpdateUserPayload";
import { IUser } from "@/interfaces/IUser";
import { fetchClient } from "@/libs/ApiClient";
import toast from "react-hot-toast";

interface ResponseType<T> {
  data: T;
  status: number;
}

export async function addNewUser(newUser: IAddUserPayload) {
  try {
    const result: ResponseType<Promise<IUser>> = await fetchClient("/users/create", {
      method: "POST",
      body: JSON.stringify(newUser),
    });

    if (result) {
      toast.success("User added successfully.");
      return result.data;
    }
  } catch (ex: unknown) {
    console.log("ex ", ex);
    toast.error("Unable to add user, try again later.", { id: "AddNewUserError" });
  }
}

export async function fetchUserList(searchQuery?: string) {
  try {
    const query = searchQuery ? `?search_query=${searchQuery}` : "";
    const result: ResponseType<Promise<IUser[]>> = await fetchClient(`/users${query}`);
    if (result) {
      return result.data;
    }
  } catch (ex: unknown) {
    console.log("ex ", ex);
    toast.error("Unable to fetch user list, try again later.", { id: "FetchUserListError" });
  }
}

export async function editUser(id: string, updateInfo: IUpdateUserPayload) {
  try {
    const result = await fetchClient(`/users/update/${id}`, { method: "PUT", body: JSON.stringify(updateInfo) });
    if (result.status === 200) {
      toast.success("User updated successfully.");
      return true;
    }
  } catch (ex: unknown) {
    console.log("ex ", ex);
    toast.error("Unable to update user, try again later.", { id: "UpdateUserError" });
  }
}

export async function deleteUser(id: string) {
  try {
    const result = await fetchClient(`/users/delete/${id}`, { method: "DELETE" });
    if (result.status === 204) {
      toast.success("User deleted successfully.");
      return true;
    }
  } catch (ex: unknown) {
    console.log("ex ", ex);
    toast.error("Unable to delete user, try again later.", { id: "DeleteUserError" });
  }
}
