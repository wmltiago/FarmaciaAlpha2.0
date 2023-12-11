import { useState, useEffect } from "react";
import axios from 'axios';
import { useDadosFarmacia } from "../contexts/useDadosFarmacia";
import { NavLink, useNavigate } from "react-router-dom";

export default function FormCadastraFabricante() {
  //Objeto reservado para montar um medicamento que apos validacao sera enviado para lista de medicamentos.

  const navigate = useNavigate();

  const [nome_fabricante, setNome] = useState("");
  const [cnpj_fabricante, setCnpj] = useState("");
  const [endereco_fabricante, setEndereco] = useState({
    cep: '',
    logradouro: '',
    municipio: '',
    estado: '',
    complemento: '',
    numero:''
  }); 


  const salvarFabricante = (e) => {

    axios.post('http://localhost:5000/fabricantes', {
      nome: nome_fabricante,
      cnpj: cnpj_fabricante,
      endereco:
      {
        cep: endereco_fabricante.cep,
        logradouro: endereco_fabricante.logradouro,
        municipio: endereco_fabricante.municipio,
        estado: endereco_fabricante.estado,
        complemento: endereco_fabricante.complemento,
        numero: endereco_fabricante.numero
      }
    })

      .then(function (response) {
        alert("Fabricante salvo com sucesso!");
        
        navigate("/caixa")
        console.log(response);

      })

      .catch(function (error) {
        console.log(error);

      });

    return e.preventDefault();

  }

  return (
    //Formulario criado com bootstrap e feito modificacoes para responsividade, em cada input existe um onchange que envia valor para var farmacia
    <div
      className="container"
      onLoad={() => document.getElementById("reset").click()}
    >
      <div className="row justify-content-center">
        <form
          autoComplete="off"
          className="row g-3 mt-5 ps-4 pe-4 pt-5"
          onSubmit={(e) => {
            e.preventDefault();
            salvarFabricante();
          }}
        >
          <h4>Cadastro do Fabricante</h4>
          <fieldset className="col-md-6 col-lg-8">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
            <input
              value={nome_fabricante || ''}
              onChange={event => setNome(event.target.value)}
              type="text"
              className="form-control"
              id="nome"
              placeholder="Informe o nome do fornecedor"
              required
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-4">
            <label htmlFor="cnpj" className="form-label">
              CNPJ
            </label>
            <input
              value={cnpj_fabricante || ''}
              onChange={event => setCnpj(event.target.value)}
              type="text"
              className="form-control"
              id="cnpj"
              placeholder="00.000.000/0000-00"
              required
              maxLength={18}
            />
          </fieldset>

          <fieldset className="col-md-2 col-lg-3">
            <label htmlFor="cep" className="form-label">
              CEP
            </label>
            <input     
            value={endereco_fabricante.cep || ''}         
              type="number"
              className="form-control"
              id="cep"
              placeholder="Apenas números {8}"
              pattern="^(?=.*[0-9])[0-9]{8}$"
              required
              onChange={(e) =>
                setEndereco({ ...endereco_fabricante, cep: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-8 col-lg-6">
            <label htmlFor="logradouro" className="form-label">
              Logradouro
            </label>
            <input
              value={endereco_fabricante.logradouro || ''}
              type="phone"
              className="form-control"
              id="logradouro"
              placeholder="Rua/Avenida . . ."
              required
              onChange={(e) =>
                setEndereco({ ...endereco_fabricante, logradouro: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-2 col-lg-3">
            <label htmlFor="numero" className="form-label">
              Número
            </label>
            <input
              value={endereco_fabricante.numero || ''}
              type="number"
              className="form-control"
              id="numero"
              placeholder="0000"
              required
              onChange={(e) =>
                setEndereco({ ...endereco_fabricante, numero: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-3">
            <label htmlFor="estado" className="form-label">
              Estado
            </label>
            <input
              value={endereco_fabricante.estado || ''}
              type="text"
              className="form-control"
              id="estado"
              placeholder="Informe o estado"
              required
              onChange={(e) =>
                setEndereco({ ...endereco_fabricante, estado: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-3">
            <label htmlFor="bairro" className="form-label">
              Bairro
            </label>
            <input
              value={endereco_fabricante.bairro || ''}
              type="text"
              className="form-control"
              id="bairro"
              placeholder="Informe o bairro"
              required
              onChange={(e) =>
                setEndereco({ ...endereco_fabricante, bairro: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-4">
            <label htmlFor="cidade" className="form-label">
              Cidade
            </label>
            <input
              value={endereco_fabricante.municipio || ''}
              type="text"
              className="form-control"
              id="cidade"
              placeholder="Informe a cidade"
              required              
              onChange={(e) =>
                setEndereco({ ...endereco_fabricante, municipio: e.target.value })
              }
            />
          </fieldset>

          <fieldset className="col-md-6 col-lg-5">
            <label htmlFor="complemento" className="form-label">
              Complemento
            </label>
            <input
              value={endereco_fabricante.complemento || ''}
              type="text"
              className="form-control"
              id="complemento"
              placeholder="Perto do estabelecimento . . . "
              onChange={(e) =>
                setEndereco({ ...endereco_fabricante, complemento: e.target.value })
              }
            />
          </fieldset>


          <div className="d-grid gap-1 d-md-flex justify-content-md-end">
          <NavLink to={"/caixa"}><button className="btn btn-secondary" type="button" to="">Voltar</button></NavLink>
            <input
              value="Cadastrar"
              type="submit"
              className="btn btn-success"
            />
          </div>
        </form>
      </div>
    </div>
  );
}