import {
  ActionFunctionArgs,
  Form,
  Navigate,
  useActionData,
  useRouteError,
} from "react-router-dom";
import { PageContent } from "../PageContainer";
import { Input } from "../Input";
import { Button } from "../Button";
import { ApiError } from "../../services/ApiService";
import { AuthService, AuthSession } from "../../services/AuthService";
import { ROUTES } from "../../config/routes";

type SignInPageProps = {} & React.HTMLAttributes<HTMLDivElement>;

export function Component({ ...props }: SignInPageProps) {
  const apiError = useRouteError() as ApiError;
  const { token } = (useActionData() as AuthSession) ?? {};

  return token ? (
    <PageContent>
      <Navigate to={ROUTES.home} />
    </PageContent>
  ) : (
    <Form action={ROUTES.signIn} method="post" className="flex flex-col gap-4">
      <PageContent {...props}>
        <h1 className="text-3xl font-bold text-center">Entrar</h1>
        {Array.isArray(apiError?.errors) && (
          <div className="bg-red-100 border-red-500 p-4 rounded-lg">
            {apiError.errors.map(({ detail }, index) => (
              <p key={index}>{detail}</p>
            ))}
          </div>
        )}

        <Input
          label="E-mail"
          type="email"
          name="email"
          className="p-2 border rounded-lg"
          required
        />

        <Input
          label="Senha"
          type="password"
          name="password"
          className="p-2 border rounded-lg"
          required
          pattern=".{5,}"
          title="5 caracteres no mínimo"
        />

        <Button type="submit">Entrar</Button>
      </PageContent>
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const login = AuthService.signIn({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  return login;
}
