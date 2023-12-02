import { NavLink } from "react-router-dom";
import logo from "../imagens/logo-farmacia-alpha.png";
export default function MenuNavegacao() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: "#0069a3" }}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={"/home"} activeclassname="active-link">
          <img
            src={logo}
            alt=""
            width="259"
            height="43"
            className="d-inline-block align-text-center"
          />
          {/* <b>Pharmacy Management</b> */}
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="d-flex justify-content-end">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              
              {/* <li key="cadastra-medicamento" className="nav-item">
                <NavLink className="nav-link" type='button' to={"/cadastra-medicamento"} activeclassname="active-link">Cadastro de Medicamentos</NavLink>
              </li>
              <li key="lista-medicamentos" className="nav-item">
                <NavLink className="nav-link" type='button' to={"/lista-medicamentos"} activeclassname="active-link">Lista de Medicamentos</NavLink>
              </li>
              <li key="lista-medicamentos2" className="nav-item">
                <NavLink className="nav-link" type='button' to={"/lista-medicamentos2"} activeclassname="active-link">Lista de Medicamentos 2</NavLink>
              </li>               */}
              <li key="dropdown" className="nav-item dropdown">
                <button className="nav-link dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{backgroundColor:"transparent", border:"none"}}>
                  Medicamentos
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <NavLink className="dropdown-item" to={"/cadastra-medicamento"}>Cadastrar</NavLink>
                  <NavLink className="dropdown-item" to={"/lista-medicamentos2"}>Listagem</NavLink>
                </div>
              </li>
              <li key="dropdown" className="nav-item dropdown">
                <button className="nav-link dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{backgroundColor:"transparent", border:"none"}}>
                  Clientes
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <NavLink className="dropdown-item" to={"/cadastra-medicamento"}>Cadastrar</NavLink>
                  <NavLink className="dropdown-item" to={"/lista-medicamentos2"}>Listagem</NavLink>
                </div>
              </li>
              <li key="cadastra-farmacia" className="nav-item">
                <NavLink className="nav-link" type='button' to={"/caixa"} activeclassname="active-link">Fluxo de caixa</NavLink>
              </li>
              <li key="perguntas-freq" className="nav-item">
                <NavLink className="nav-link" type='button' to={"/ajuda"} activeclassname="active-link">Ajuda</NavLink>
              </li>
              <li key="perguntas-freq" className="nav-item">
                <NavLink className="nav-link" type='button' to={"/ajuda"} activeclassname="active-link">Sair</NavLink>
              </li>
              {/* <li key="mapa" className="nav-item">
                <NavLink className="nav-link btn btn-sm btn-dark border-0 rounded-5 pe-3" type='button' to={"/mapa"} activeclassname="active-link">
                  📍 Mapa
                </NavLink>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
