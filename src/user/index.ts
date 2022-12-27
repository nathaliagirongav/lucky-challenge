export interface UserInformation {
  id: number;
  name: string;
  address: Address;
}

interface Address {
  street: string;
  city: string;
  country: string;
}
