import { PageStub } from "../components/common/PageStub";
import { PermissionsStub } from "../components/task1/PermissionsStub";
import { UserInfoFormStub } from "../components/task1/UserInfoFormStub";

export function Task1UsersPage() {
  return (
    <PageStub
      title="Task 1 Users"
      description="Placeholder for user management UI and related role actions."
    >
      <UserInfoFormStub />
      <PermissionsStub />
    </PageStub>
  );
}
