import MenuNavegacao from "../components/MenuNavegacao";
import modalMedicamento from "../components/modalMedicamento";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function ListaMedicamentos2() {
  // Declaro uma variavel para receber do localStorage todos os medicamentos ja cadastrados
  const [medicamentos, setMedicamentos] = useState([]);


  const apagaMedicamento = (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este medicamento?");

    if (confirmacao) {
      axios.delete(`https://app-7gnwrtklwa-rj.a.run.app/api/medicacoes/${id}`)
        .then(response => {
          const novaLista = listaAnterior.filter((item) => item.id !== id);
          setListaAnterior(novaLista);
          alert(`O medicamento foi excluído com sucesso.`);
        })
        .catch(error => {
          console.error("Erro ao excluir medicamento:", error);
          alert(`Erro ao excluir o medicamento. Tente novamente.`);
        });
    }
  }


  let listaMedicamentos = medicamentos;

  useEffect(() => {
    axios.get("https://app-7gnwrtklwa-rj.a.run.app/api/medicacoes")
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
            <h4 className="pt-4 mb-0 mt-2">Lista de Medicamentos</h4>
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
              <table className="table text-center">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Medicamento</th>
                    <th scope="col">Informações</th>                                        
                    <th scope="col">Preço</th>
                    <th scope="col">Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrado.map((item) => {
                    return (

                      <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.nome}</td>                        
                        <td>{item.tipos[0].descricao} - {item.tipoConteudo.descricao} - {item.conteudo}</td>                        
                        <td>R$ {item.preco}</td>
                        <td>
                          <div className="dropdown">
                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Ações
                            </button>
                            <ul className="dropdown-menu">
                              <li><NavLink className="dropdown-item" to={`/formEditarMedicamento/${item.id}`}>Editar</NavLink></li>
                              <li><a className="dropdown-item" href=""onClick={() => apagaMedicamento(item.id)}>Excluir</a></li>
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