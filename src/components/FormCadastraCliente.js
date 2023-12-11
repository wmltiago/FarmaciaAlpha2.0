import { useState, useEffect } from "react";
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";

export default function FormCadastraCliente() {
  //Objeto reservado para montar um medicamento que apos validacao sera enviado para lista de medicamentos.

  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState({
    cep: '',
    logradouro: '',
    municipio: '',
    bairro: '',
    estado: '',
    complemento: '',
    numero: ''
  });

  //Função pra consultar o CEP
  const fetchCep = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setEndereco({
          cep: data.cep,
          logradouro: data.logradouro,
          bairro: data.bairro,
          municipio: data.localidade,
          estado: data.uf,
        });
      }else{
        alert("CEP INEXISTENTE")
      }
    } catch (error) {
      alert('Erro ao buscar o CEP:', error);
    }
  }

  //Chama a consulta sempre que mudar CEP
  useEffect(() => {
    if (endereco.cep.length === 8) {
      fetchCep(endereco.cep);
    }
  }, [endereco.cep]);

  //Atualizar valor digitado no CEP
  const handleCepChange = (event) => {
    const newCep = event.target.value;
    setEndereco((prevEndereco) => ({ ...prevEndereco, cep: newCep }));

  }


  const salvarCliente = (e) => {

    axios.post("https://app-7gnwrtklwa-rj.a.run.app/api/clientes", {
      nome: nome,
      email: email,
      cpf: cpf,
      telefone: telefone,
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
        alert("Cliente salvo com sucesso!");

        navigate("/caixa")
        console.log(response);

      })

      .catch(function (error) {
        console.log(error.response.data.errors);

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
            salvarCliente();
          }}
        >
          <h4>Cadastro de cliente</h4>
          <fieldset className="col-md-6 col-lg-8">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
            <input
              value={nome || ''}
              onChange={event => setNome(event.target.value)}
              type="text"
              className="form-control"
              id="nome"
              placeholder="Informe nome completo"
              required
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-4">
            <label htmlFor="cpf" className="form-label">
              CPF
            </label>
            <input
              value={cpf || ''}
              onChange={event => setCpf(event.target.value)}
              type="text"
              className="form-control"
              id="cpf"
              placeholder="000.000.000-00"
              required
              maxLength={14}
            />
          </fieldset>

          <fieldset className="col-md-6 col-lg-6">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              value={email || ''}
              onChange={event => setEmail(event.target.value)}
              type="email"
              className="form-control"
              id="email"
              placeholder="email@email.com"
              required
            />
          </fieldset>

          <fieldset className="col-md-6 col-lg-3">
            <label htmlFor="celular" className="form-label">
              Celular
            </label>
            <input
              value={telefone || ''}
              onChange={event => setTelefone(event.target.value)}
              type="number"
              className="form-control"
              id="celular"
              placeholder="(99) 9.9999-9999"
              required
            />
          </fieldset>
          <fieldset className="col-md-2 col-lg-3">
            <label htmlFor="cep" className="form-label">
              CEP <span style={{fontSize: "0.8rem", color: "red"}}>*apenas números</span>
            </label>
            <input
              type="text"
              maxLength={8}
              className="form-control"
              id="cep"
              placeholder="00000000"
              required
              onChange={handleCepChange}
            />
          </fieldset>
          <fieldset className="col-md-8 col-lg-6">
            <label htmlFor="logradouro" className="form-label">
              Logradouro
            </label>
            <input
              value={endereco.logradouro || ''}
              type="phone"
              className="form-control"
              id="logradouro"
              placeholder="Rua/Avenida . . ."
              required
              onChange={(e) =>
                setEndereco({ ...endereco, logradouro: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-2 col-lg-3">
            <label htmlFor="numero" className="form-label">
              Número
            </label>
            <input
              value={endereco.numero || ''}
              type="number"
              className="form-control"
              id="numero"
              placeholder="0000"
              required
              onChange={(e) =>
                setEndereco({ ...endereco, numero: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-3">
            <label htmlFor="estado" className="form-label">
              Estado
            </label>
            <input
              value={endereco.estado || ''}
              type="text"
              className="form-control"
              id="estado"
              placeholder="Informe o estado"
              required
              onChange={(e) =>
                setEndereco({ ...endereco, estado: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-3">
            <label htmlFor="bairro" className="form-label">
              Bairro
            </label>
            <input
              value={endereco.bairro || ''}
              type="text"              
              className="form-control"
              id="bairro"
              placeholder="Informe o bairro"
              required
              onChange={(e) =>
                setEndereco({ ...endereco, bairro: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-4">
            <label htmlFor="cidade" className="form-label">
              Cidade
            </label>
            <input
              value={endereco.municipio || ''}
              type="text"
              className="form-control"
              id="cidade"
              placeholder="Informe a cidade"
              required
              onChange={(e) =>
                setEndereco({ ...endereco, municipio: e.target.value })
              }
            />
          </fieldset>

          <fieldset className="col-md-6 col-lg-5">
            <label htmlFor="complemento" className="form-label">
              Complemento
            </label>
            <input
              value={endereco.complemento || ''}
              type="text"
              className="form-control"
              id="complemento"
              placeholder="Perto do estabelecimento . . . "
              onChange={(e) =>
                setEndereco({ ...endereco, complemento: e.target.value })
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
