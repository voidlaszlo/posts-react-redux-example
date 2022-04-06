import { Company } from "../../../models/users/user.model";

interface UserCompanyProps {
  company: Company | undefined;
}

const UserCompany = ({ company }: UserCompanyProps) => {
  return (
    <div className="box company">
      <small>Company</small>
      <p>{company?.name}</p>
      <p>{company?.catchPhrase}</p>
    </div>
  );
};

export default UserCompany;
