import Account from "@components/Form/Account/Account";
import Category from "@components/Form/Category/Category";
import EditAccount from "@components/Form/EditAccount/EditAccount";
import EditCategory from "@components/Form/EditCategory/EditCategory";
import EditReminder from "@components/Form/EditReminder/EditReminder";
import Operation from "@components/Form/Operations/Operations";
import Reminder from "@components/Form/Reminder/Reminder";
import { MainContainer } from "@shared/components/containers/MainContainer/MainContainer";
import { FormType } from "@shared/types/FormTypes";
import Header from "@widgets/Main/Header/Header";
import { FC } from "react";

interface FormProps {
  type: FormType;
}

const FromTypes = {
  [FormType.account]: <Account />,
  [FormType.category]: <Category />,
  [FormType.operations]: <Operation />,
  [FormType.reminder]: <Reminder />,
  [FormType.edit_reminder]: <EditReminder />,
  [FormType.edit_account]: <EditAccount />,
  [FormType.edit_category]: <EditCategory />,
};

const Form: FC<FormProps> = ({ type }) => {
  return (
    <MainContainer>
      <div className={`flex flex-col w-full h-full text-white`}>
        <Header />
        {FromTypes[type]}
      </div>
    </MainContainer>
  );
};

export default Form;
