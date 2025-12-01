
import LoginForm from "@/node/componentes/pages/LoginCadastroPage/login/LoginForm";
import GerenteLayout from "@/node/layouts/GerenteLayout";


export default function Login() {
  return (
    <>  
        {/*Header */}
        <GerenteLayout/>
        
        <LoginForm/>
    </>
  );
}
