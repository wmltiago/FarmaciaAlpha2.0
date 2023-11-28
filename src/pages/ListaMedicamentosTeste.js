import MenuNavegacao from "../components/MenuNavegacao";

import { useState, useEffect } from "react";
import axios from "axios";

export default function ListaMedicamentos2() {
  // Declaro uma variavel para receber do localStorage todos os medicamentos ja cadastrados
  const [medicamentos, setMedicamentos] = useState([]);

  let listaMedicamentos = medicamentos;

  useEffect(() => {
    axios.get("https://corsproxy.io/?http://premier.rf.gd/medicamentos.php")
      .then(response => {
        setMedicamentos(response.data);
        setFiltro(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar medicamentos:", error);
      });
  }, []);



  // Declaro variaveis para controle da exclusao de medicamentos da lista
  const [listaAnterior, setListaAnterior] = useState(medicamentos)
  let novaLista;

  // Declaro um useState para receber de inicio a lista de medicamentos, ele sera utilizado para filtrar a pesquisa do usuario
  const [filtrado, setFiltro] = useState(listaMedicamentos);

  // Declaro um useState para receber o que foi digitado pelo usuário
  const [termo, setTermo] = useState("");

  // Funcao compartilhada por props, exclui o card a partir do id que e carregado no onclick do botao excluir dentro do modal
  function apagaMedicamento(id) {
    novaLista = listaAnterior.filter((item) => {
      if (item.id !== id) {
        return item;
      } else {
        return false;
      }
    });
    localStorage.setItem("ListaMedicamentos", JSON.stringify(novaLista));
    setListaAnterior(novaLista)
    alert(`O medicamento selecionado foi excluido da lista com sucesso.`)
  }

  // useEffect ira alterar o valor do filtrado toda vez que o termo digitado mudar ou algum card for excluido
  useEffect(() => {
    // O valor de filtrado sera composto apenas pelos itens da listaMedicamentos que corresponderem ao que foi digitado pelo usuario
    setFiltro(
      listaMedicamentos.filter((item) => {
        if (
          item.medicamento
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
                    <th scope="col">Medicamento</th>
                    <th scope="col">Dosagem</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Laboratário</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrado.map((item) => {
                    return (

                      <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.medicamento}</td>
                        <td>{item.dosagem}</td>
                        <td>{item.tipo}</td>
                        <td>{item.laboratorio}</td>
                        <td>{item.preco}</td>
                        <td>
                          <div className="dropdown">
                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Dropdown button
                            </button>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="#">Action</a></li>
                              <li><a className="dropdown-item" href="#">Another action</a></li>
                              <li><a className="dropdown-item" href="#">Something else here</a></li>
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