import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";


export default function FormEditaCliente() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [edit, setEdit] = useState([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
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


  console.log(edit)


  const salvarEdicaoCliente = (e) => {

    axios.put(`https://app-7gnwrtklwa-rj.a.run.app/api/clientes/${id}`, {
      nome: nome,
      email: email,
      telefone: telefone,
      cpf: cpf,
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

        alert("Edição salva com sucesso!");
        navigate("/lista-clientes/")
        console.log(response);

      })

      .catch(function (error) {
        console.log(error);

      });

    return e.preventDefault();

  }

  useEffect(() => {
    axios.get(`https://app-7gnwrtklwa-rj.a.run.app/api/clientes/${id}`)
    //axios.get(`http://localhost:5000/clientes/${id}`)
      .then(response => {
        setEdit(response.data);
        setNome(response.data.nome);
        setEmail(response.data.email);
        setTelefone(response.data.telefone);
        setEndereco(response.data.endereco);
        setCpf(response.data.cpf);
       
      })
      .catch(error => {
        console.error("Erro ao buscar medicamentos:", error);
      });
  }, []);

  return (
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
            salvarEdicaoCliente();
          }}
        >
          <h4>Cadastro de cliente</h4>
          <fieldset className="col-md-6 col-lg-8">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
            <input
              value={nome}
              onChange={event => setNome(event.target.value)}
              type="text"
              className="form-control"
              id="nome"
              required
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-4">
            <label htmlFor="cpf" className="form-label">
              CPF
            </label>
            <input
              value={cpf}
              onChange={event => setCpf(event.target.value)}
              type="text"
              className="form-control"
              id="cpf"
              required
              maxLength={14}
            />
          </fieldset>

          <fieldset className="col-md-6 col-lg-6">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              value={email}
              onChange={event => setEmail(event.target.value)}
              type="email"
              className="form-control"
              id="email"
              required
            />
          </fieldset>

          <fieldset className="col-md-6 col-lg-3">
            <label htmlFor="celular" className="form-label">
              Celular
            </label>
            <input
              value={telefone}
              onChange={event => setTelefone(event.target.value)}
              type="number"
              className="form-control"
              id="celular"
              required
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
                setEndereco({ ...endereco, cep: e.target.value })
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
                setEndereco({ ...endereco, logradouro: e.target.value })
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
                setEndereco({ ...endereco, numero: e.target.value })
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
                setEndereco({ ...endereco, estado: e.target.value })
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
                setEndereco({ ...endereco, bairro: e.target.value })
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
                setEndereco({ ...endereco, municipio: e.target.value })
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
                setEndereco({ ...endereco, complemento: e.target.value })
              }
            />
          </fieldset>


          <div className="d-grid gap-1 d-md-flex justify-content-md-end">
            <NavLink to={"/lista-clientes"}><button className="btn btn-secondary" type="button" to="">Voltar</button></NavLink>
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
