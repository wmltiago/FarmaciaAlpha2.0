import MenuNavegacao from "../components/MenuNavegacao";

import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function ListaClientes() {
  // Declaro uma variavel para receber do localStorage todos os medicamentos ja cadastrados
  const [clientes, setClientes] = useState([]);

  let listaClientes = clientes;

  useEffect(() => {
    axios.get("http://localhost:5000/clientes/")
      .then(response => {
        setClientes(response.data);
        setFiltro(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar medicamentos:", error);
      });
  }, []);



  // Declaro variaveis para controle da exclusao de medicamentos da lista
  const [listaAnterior, setListaAnterior] = useState(clientes)
  let novaLista;

  // Declaro um useState para receber de inicio a lista de medicamentos, ele sera utilizado para filtrar a pesquisa do usuario
  const [filtrado, setFiltro] = useState(listaClientes);

  // Declaro um useState para receber o que foi digitado pelo usuário
  const [termo, setTermo] = useState("");

 
  // useEffect ira alterar o valor do filtrado toda vez que o termo digitado mudar ou algum card for excluido
  useEffect(() => {
    // O valor de filtrado sera composto apenas pelos itens da listaMedicamentos que corresponderem ao que foi digitado pelo usuario
    setFiltro(
      listaClientes.filter((item) => {
        if (
          item.cpf
            .toLocaleLowerCase()
            .indexOf(termo.toLocaleLowerCase()) !== -1
        ) {
          return item;
        } else {
          return false;
        }
      })
    );
  }, [termo, listaAnterior]);

  return (
    <>
      <MenuNavegacao />
      <div className="container">
        <div className="row g-3 ps-4 pe-4 pt-5">
          <div className="col-lg-5 col-md-12 mt-5">
            <h4 className="pt-4 mb-0 mt-2">Lista de Medicamentos:</h4>
            <input
              className="form-control mt-3"
              aria-describedby="inputGroup-sizing-sm"
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              placeholder="Pesquise o nome do medicamento ..."
            ></input>
          </div>
          <div className="row g-3 mb-5">
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">CEP</th>
                    <th scope="col">Rua</th>
                    <th scope="col">Municipio</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Complemento</th>
                    <th scope="col">Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrado.map((item) => {
                    return (

                      <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.nome}</td>
                        <td>{item.cpf}</td>
                        <td>{item.email}</td>
                        <td>{item.telefone}</td>
                        <td>{item.endereco.cep}</td>
                        <td>{item.endereco.logradouro}</td>
                        <td>{item.endereco.municipio}</td>
                        <td>{item.endereco.estado}</td>
                        <td>{item.endereco.complemento}</td>
                        <td>
                          <div className="dropdown">
                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Ações
                            </button>
                            <ul className="dropdown-menu">
                              <li><NavLink className="dropdown-item" to={`/formEditarMedicamento/${item.id}`}>Editar</NavLink></li>
                              <li><a className="dropdown-item" href="">Excluir</a></li>
                              <li><a className="dropdown-item" href="">Detalhes</a></li>
                            </ul>
                          </div>

                        </td>
                      </tr>

                    );

                  })}
                </tbody>
              </table>
            </div>
            {filtrado.length === 0 ? <div>Não existem medicamentos para serem apresentados.</div> : null}
          </div>
        </div>
      </div>
    </>
  );
}