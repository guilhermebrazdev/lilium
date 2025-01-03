import { fetchUserList } from "@/features/Users/services/usersServices";
import { IProvider } from "@/interfaces/IProvider";
import { IUser } from "@/interfaces/IUser";
import { createContext, useState } from "react";

export interface GlobalContextData {
  userList: IUser[] | undefined;
  deleteDialogOpen: boolean;
  editDialogOpen: boolean;
  globalLoading: boolean;
  editingUser: IUser | undefined;
  deletingUser: IUser | undefined;
  setEditingUser: (value: IUser | undefined) => void;
  setDeletingUser: (value: IUser | undefined) => void;
  setDeleteDialogOpen: (value: boolean) => void;
  setEditDialogOpen: (value: boolean) => void;
  setGlobalLoading: (value: boolean) => void;
  loadUserList: (searchQuery?: string) => Promise<void>;
}

export const globalContext = createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider = ({ children }: IProvider) => {
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<IUser[]>();

  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<IUser>();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deletingUser, setDeletingUser] = useState<IUser>();

  async function loadUserList(searchQuery?: string) {
    setGlobalLoading(true);
    const userList = await fetchUserList(searchQuery);
    if (userList) {
      setUserList(userList);
    }

    setGlobalLoading(false);
  }

  return (
    <globalContext.Provider
      value={{
        globalLoading,
        userList,
        editDialogOpen,
        deleteDialogOpen,
        editingUser,
        deletingUser,
        setEditingUser,
        setDeletingUser,
        setEditDialogOpen,
        setDeleteDialogOpen,
        loadUserList,
        setGlobalLoading,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};
