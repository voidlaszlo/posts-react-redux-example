import { Company } from "../models/User";

interface Props {
  company: Company | undefined;
}

const UserCompany = ({ company }: Props) => {
  return (
    <div className="box company">
      <small>Company</small>
      <p>{company?.name}</p>
      <p>{company?.catchPhrase}</p>
    </div>
  );
};

export default UserCompany;
