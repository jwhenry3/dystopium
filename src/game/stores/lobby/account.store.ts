import create, {State} from "zustand";

export interface Account {
  id: string;
  username: string;
}

export interface AccountData extends State {
  account: Account | null;
  changeAccount: (account: Account | null) => void;
}

export const useAccount = create<AccountData>(set => ({
  account: null,
  changeAccount: (account: Account | null) => set({account})
}));
