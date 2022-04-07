import { Address } from "../models/User";

interface Props {
  address: Address | undefined;
}

const UserAddress = ({ address }: Props) => {
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
