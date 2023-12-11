import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";


export default function FormEditaFornecedor() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [edit, setEdit] = useState([]);
  const [nome, setFornecedorNome] = useState("");
  const [cnpj, setFornecedorCnpj] = useState("");
  const [endereco, setFornecedorEndereco ] = useState({
    cep: '',
    logradouro: '',
    municipio: '',
    bairro: '',
    estado: '',
    complemento: '',
    numero: ''
  });


  console.log(edit)


  const salvarEdicaoFornecedor = (e) => {

    axios.put(`https://app-7gnwrtklwa-rj.a.run.app/api/fornecedores/${id}`, {
      nome: nome,
      cnpj: cnpj,
      endereco: endereco,
    })

      .then(function (response) {
        
        alert("Fornecedor salvo com sucesso!");               
        navigate("/lista-fornecedores")
        console.log(response);
        
      })

      .catch(function (error) {
        console.log(error);

      });

    return e.preventDefault();

  }

  useEffect(() => {
    axios.get(`https://app-7gnwrtklwa-rj.a.run.app/api/fornecedores/${id}`)
      .then(response => {
        setEdit(response.data);
        setFornecedorNome(response.data.nome);
        setFornecedorCnpj(response.data.cnpj);
        setFornecedorEndereco(response.data.endereco);
        

      })
      .catch(error => {
        console.error("Erro ao buscar medicamentos:", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-2 pt-5">
        <form
          autoComplete="off"
          className="row g-3 p-4"
          onSubmit={salvarEdicaoFornecedor}
        >
          <h4>Editar Fornecedor:</h4>
          <fieldset className="col-md-4">
            <label htmlFor="nome" className="form-label">
              fornecedor
            </label>
            <input
              value={nome || ""}
              type="text"
              className="form-control"
              id="nome"
              placeholder="Informe o nome do fornecedor"
              required
              onChange={event => setFornecedorNome(event.target.value)}
            />
          </fieldset>         
          <fieldset className="col-md-4">
            <label htmlFor="cnpj" className="form-label">
              cnpj
            </label>
            <input
              value={cnpj}
              type="text"
              className="form-control"
              id="cnpj"
              placeholder="Informe o CNPJ"
              required
              onChange={event => setFornecedorCnpj(event.target.value)}
            />
          </fieldset>

          <fieldset className="col-md-2 col-lg-3">
            <label htmlFor="cep" className="form-label">
              CEP
            </label>
            <input
              value={endereco.cep || ""}
              type="text"
              className="form-control"
              id="cep"
              required
              onChange={(e) =>
                setFornecedorEndereco({ ...endereco, cep: e.target.value })
              }

            />
          </fieldset>
          <fieldset className="col-md-8 col-lg-6">
            <label htmlFor="logradouro" className="form-label">
              Logradouro
            </label>
            <input
              value={endereco.logradouro || ""}
              type="phone"
              className="form-control"
              id="logradouro"
              placeholder="Rua/Avenida . . ."
              required
              onChange={(e) =>
                setFornecedorEndereco({ ...endereco, logradouro: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-2 col-lg-3">
            <label htmlFor="numero" className="form-label">
              Número
            </label>
            <input
              value={endereco.numero || ""}
              type="number"
              className="form-control"
              id="numero"
              placeholder="0000"
              required
              onChange={(e) =>
                setFornecedorEndereco({ ...endereco, numero: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-3">
            <label htmlFor="estado" className="form-label">
              Estado
            </label>
            <input
              value={endereco.estado || ""}
              type="text"
              className="form-control"
              id="estado"
              placeholder="Informe o estado"
              required
              onChange={(e) =>
                setFornecedorEndereco({ ...endereco, estado: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-3">
            <label htmlFor="bairro" className="form-label">
              Bairro
            </label>
            <input
              value={endereco.bairro || ""}
              type="text"
              className="form-control"
              id="bairro"
              placeholder="Informe o bairro"
              required
              onChange={(e) =>
                setFornecedorEndereco({ ...endereco, bairro: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-4">
            <label htmlFor="cidade" className="form-label">
              Cidade
            </label>
            <input
              value={endereco.municipio || ""}
              type="text"
              className="form-control"
              id="cidade"
              placeholder="Informe a cidade"
              required
              onChange={(e) =>
                setFornecedorEndereco({ ...endereco, municipio: e.target.value })
              }
            />
          </fieldset>

          <fieldset className="col-md-6 col-lg-5">
            <label htmlFor="complemento" className="form-label">
              Complemento
            </label>
            <input
              value={endereco.complemento || ""}
              type="text"
              className="form-control"
              id="complemento"
              placeholder="Perto do estabelecimento . . . "
              onChange={(e) =>
                setFornecedorEndereco({ ...endereco, complemento: e.target.value })
              }
            />
          </fieldset>
 
          {/* <fieldset className="col-md-12">
            <label htmlFor="inputDescricao" className="form-label">
              Descrição
            </label>
            <textarea
              value=""
              className="form-control"
              id="inputDescricao"
              rows="5"
              maxLength={870}

            ></textarea>
          </fieldset> */}
          <div className="d-grid gap-1 d-md-flex justify-content-md-end">
          <NavLink to={"/lista-fornecedores"}><button className="btn btn-secondary" type="button" to="">Voltar</button></NavLink>
            <input
              value="Atualizar"
              type="submit"
              className="btn btn-success"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
