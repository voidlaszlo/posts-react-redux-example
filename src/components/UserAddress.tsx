import { Address } from "../models/User";

interface UserAddressProps {
  address: Address | undefined;
}

const UserAddress = ({ address }: UserAddressProps) => {
  return (
    <div className="box address">
      <small>Address</small>
      <p>{address?.street}</p>
      <p>{address?.suite}</p>
      <p>{address?.zipcode}</p>
      <p>{address?.city}</p>
    </div>
  );
};

export default UserAddress;
