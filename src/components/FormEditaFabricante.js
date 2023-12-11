import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";


export default function FormEditaFabricante() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [edit, setEdit] = useState([]);
  const [nome_fabricante, setFabricanteNome] = useState("");
  const [cnpj_fabricante, setFabricanteCnpj] = useState("");
  const [endereco_fabricante, setFabricanteEndereco ] = useState({
    cep: '',
    logradouro: '',
    municipio: '',
    bairro: '',
    estado: '',
    complemento: '',
    numero: ''
  });


  console.log(edit)


  const salvarEdicaoFabricante = (e) => {

    axios.put(`http://localhost:5000/fabricante/${id}`, {
      nome: nome_fabricante,
      cnpj: cnpj_fabricante,
      endereco: endereco_fabricante,
    })

      .then(function (response) {
        
        alert("Fabricante salvo com sucesso!");               
        navigate("/ListaFabricantes/")
        console.log(response);
        
      })

      .catch(function (error) {
        console.log(error);

      });

    return e.preventDefault();

  }

  useEffect(() => {
    axios.get(`http://localhost:5000/fabricante/${id}`)
      .then(response => {
        setEdit(response.data);
        setFabricanteNome(response.data.fabricante);
        setFabricanteCnpj(response.data.cnpj);
        setFabricanteEndereco(response.data.endereco);
        

      })
      .catch(error => {
        console.error("Erro ao buscar fabricantes:", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-2 pt-5">
        <form
          autoComplete="off"
          className="row g-3 p-4"
          onSubmit={salvarEdicaoFabricante}
        >
          <h4>Editar Fabricante:</h4>
          <fieldset className="col-md-4">
            <label htmlFor="fabricante" className="form-label">
              Fabricante
            </label>
            <input
              value={fabricante}
              type="text"
              className="form-control"
              id="fabricante"
              placeholder="Informe o nome do fornecedor"
              required
              onChange={event => setFabricanteNome(event.target.value)}
            />
          </fieldset>

          <h4>Editar Fabricante:</h4>
          <fieldset className="col-md-4">
            <label htmlFor="cnpj" className="form-label">
              CNPJ
            </label>
            <input
              value={cnpj}
              type="text"
              className="form-control"
              id="cnpj"
              placeholder="Informe o CNPJ"
              required
              onChange={event => setFabricanteCnpj(event.target.value)}
            />
          </fieldset>

          <fieldset className="col-md-2 col-lg-3">
            <label htmlFor="cep" className="form-label">
              CEP
            </label>
            <input
              value={endereco.cep}
              type="text"
              className="form-control"
              id="cep"
              required
              onChange={(e) =>
                setFabricanteEndereco({ ...endereco, cep: e.target.value })
              }

            />
          </fieldset>
          <fieldset className="col-md-8 col-lg-6">
            <label htmlFor="logradouro" className="form-label">
              Logradouro
            </label>
            <input
              value={endereco.logradouro}
              type="phone"
              className="form-control"
              id="logradouro"
              placeholder="Rua/Avenida . . ."
              required
              onChange={(e) =>
                setFabricanteEndereco({ ...endereco, logradouro: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-2 col-lg-3">
            <label htmlFor="numero" className="form-label">
              Número
            </label>
            <input
              value={endereco.numero}
              type="number"
              className="form-control"
              id="numero"
              placeholder="0000"
              required
              onChange={(e) =>
                setFabricanteEndereco({ ...endereco, numero: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-3">
            <label htmlFor="estado" className="form-label">
              Estado
            </label>
            <input
              value={endereco.estado}
              type="text"
              className="form-control"
              id="estado"
              placeholder="Informe o estado"
              required
              onChange={(e) =>
                setFabricanteEndereco({ ...endereco, estado: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-3">
            <label htmlFor="bairro" className="form-label">
              Bairro
            </label>
            <input
              value={endereco.bairro}
              type="text"
              className="form-control"
              id="bairro"
              placeholder="Informe o bairro"
              required
              onChange={(e) =>
                setFabricanteEndereco({ ...endereco, bairro: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-4">
            <label htmlFor="cidade" className="form-label">
              Cidade
            </label>
            <input
              value={endereco.municipio}
              type="text"
              className="form-control"
              id="cidade"
              placeholder="Informe a cidade"
              required
              onChange={(e) =>
                setFabricanteEndereco({ ...endereco, municipio: e.target.value })
              }
            />
          </fieldset>

          <fieldset className="col-md-6 col-lg-5">
            <label htmlFor="complemento" className="form-label">
              Complemento
            </label>
            <input
              value={endereco.complemento}
              type="text"
              className="form-control"
              id="complemento"
              placeholder="Perto do estabelecimento . . . "
              onChange={(e) =>
                setFabricanteEndereco({ ...endereco, complemento: e.target.value })
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
          <NavLink to={"/ListaFabricantes/"}><button className="btn btn-secondary" type="button" to="">Voltar</button></NavLink>
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
