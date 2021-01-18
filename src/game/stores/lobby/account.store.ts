import create, {State} from "zustand";

export interface Account {
  id: string;
  username: string;
}

export interface AccountState extends State {
  account: Account | null;
  changeAccount: (account: Account | null) => void;
}

export const getChangeAccount = ({changeAccount}: AccountState) => changeAccount;

export const useAccount = create<AccountState>(set => ({
  account: null,
  changeAccount: (account: Account | null) => set({account})
}));
