//Pagina inicial da aplicacao, foi utilizado o bootstrap para estilizacao do formulario, utilizado o useState para armazenar o valor
//da senha que esta sendo digitada e entao mostra ao usuario se ja existem 8 caracteres e se ja existe um numero na senha.
//Utilizado modelo RegExp para apenas aceitar o submit quando o usuario digitar pelo menos 1 letra, 1 numero e 8 caracteres no min.
//onSubmit previne o default e acessa a pagina mapa por meio do navigate

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../contexts/useLogin";
import logo from "../imagens/logo-farmacia-alpha-2.png";

export default function FormLogin() {
  const navigate = useNavigate();
  const { setLogin } = useLogin();

  const [senha, setSenha] = useState("");

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <form
          autoComplete="off"
          className="col-lg-5 col-md-8 p-5 rounded-3"
          onSubmit={(e) => {
            e.preventDefault();
            setLogin(true);
            navigate("/caixa");
          }}
          style={{ backgroundColor: "#ffffff", filter:"drop-shadow(0px 0px 7px #d9d9d9)" }}
        >
          <div className="mb-4 text-center">
            <img src={logo} alt="Farmácia Alpha" width="259" height="43"/>
           
          </div>
          <h5 className="text-center mb-4">Faça login para acessar o sistema</h5>
          <fieldset className="mb-4">
           
            <input
              type="password"
              className="form-control mx-0"
              id="inputSenha"
              //required
              placeholder="Digite a sua senha de acesso"
              pattern="^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,30}$"
              onChange={(e) => setSenha(e.target.value)}
            />
          </fieldset>
          
          <div className="d-grid">
            <input value="Entrar" type="submit" className="btn btn-success" style={{backgroundColor: "#0069a3" }}/>
          </div>
        </form>
      </div>
    </div>
  );
}
