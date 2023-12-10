import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";


export default function FormEditaFornecedor() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [edit, setEdit] = useState([]);
  const [nome, setFornecedorNome] = useState("");
  const [cnpj, setFornecedorCnpj] = useState("");  
  const [endereco, setFornecedorEndereco] = useState({
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

    axios.put(`http://localhost:5000/fornecedor/${id}`, {
      nome: nome,
      cnpj: cnpj,
      endereco:
      {
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        municipio: endereco.municipio,
        bairro: endereco.bairro,
        estado: endereco.estado,
        complemento: endereco.complemento,
        numero: endereco.numero
      }
    })

      .then(function (response) {
        
        alert("Fornecedor salvo com sucesso!");               
        navigate("/ListaFornecedores/")
        console.log(response);
        
      })

      .catch(function (error) {
        console.log(error);

      });

    return e.preventDefault();

  }

  useEffect(() => {
    axios.get(`http://localhost:5000/fornecedor/${id}`)
      .then(response => {
        setEdit(response.data);
        setFornecedorNome(response.data.fornecedor);
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
            <label htmlFor="fornecedor" className="form-label">
              fornecedor
            </label>
            <input
              value={nome}
              type="text"
              className="form-control"
              id="fornecedor"
              placeholder="Informe o nome do fornecedor"
              required
              onChange={event => setFornecedorNome(event.target.value)}
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
