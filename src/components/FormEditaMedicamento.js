import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";


export default function FormEditaMedicamento() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [edit, setEdit] = useState([]);
  const [medicamento, setMedicamento] = useState("");
  const [dosagem, setDosagem] = useState("");

  const [preco, setPreco] = useState("");
  const [tipoMedicamento, setTipoMedicamento] = useState("");
  const [fabricanteMedicamento, setFabricanteMedicamento] = useState("");
  const [fornecedorMedicamento, setFornecedorMedicamento] = useState("");
  const [conteudoDoMedicamento, setConteudoDoMedicamento] = useState("");

  console.log(edit) 


  const [listatipoMedicacao, setTipoMedicacao] = useState([]);
  const [fabricante, setFabricante] = useState([]);
  const [fornecedor, setFornecedor] = useState([]);
  const [tipoConteudo, setTipoConteudo] = useState([]);


  const listarTipoConteudo = async () => {

    try {

      const response = await axios.get("https://app-7gnwrtklwa-rj.a.run.app/api/tipos-conteudo");

      console.log(response);
      const data = response.data;

      setTipoConteudo(data);
      console.log("Conteudos", data);

    } catch (error) {
      console.log(error);
    }

  }

  const listarTipoMedicamentos = async () => {

    try {

      const response = await axios.get("https://app-7gnwrtklwa-rj.a.run.app/api/tipos-medicacoes");

      console.log(response);
      const data = response.data;

      setTipoMedicacao(data);
      console.log(data);

    } catch (error) {
      console.log(error);
    }

  }

  const listarFabricante = async () => {

    try {

      const response = await axios.get("https://app-7gnwrtklwa-rj.a.run.app/api/fabricantes");

      console.log(response);
      const data = response.data;

      setFabricante(data);
      console.log(data);

    } catch (error) {
      console.log(error);
    }

  }

  const listarFornecedor = async () => {

    try {

      const response = await axios.get("https://app-7gnwrtklwa-rj.a.run.app/api/fornecedores");

      console.log(response);
      const data = response.data;

      setFornecedor(data);
      console.log(data);

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    listarTipoMedicamentos();
    listarFabricante();
    listarFornecedor();
    listarTipoConteudo();

  }, [])

  const salvarEdicaoMedicamento = (e) => {

    axios.put(`https://app-7gnwrtklwa-rj.a.run.app/api/medicacoes/${id}`, {
      nome: medicamento,
      conteudo: dosagem,
      tipoConteudo: {
        id: Number(conteudoDoMedicamento.id)
      },
      fabricante: {
        id: Number(fabricanteMedicamento.id)
      },
      fornecedor: {
        id: Number(fornecedorMedicamento.id)
      },
      tipoMedicacao: [{
        id: Number(tipoMedicamento.id)
      }],
      preco: preco
    })

      .then(function (response) {

        alert("Medicamento salvo com sucesso!");
        navigate("/lista-medicamentos2/")
        console.log(response);

      })

      .catch(function (error) {
        console.log(error);

      });

    return e.preventDefault();

  }

  useEffect(() => {
    axios.get(`https://app-7gnwrtklwa-rj.a.run.app/api/medicacoes/${id}`)
      .then(response => {
        setEdit(response.data);
        setMedicamento(response.data.nome);
        setDosagem(response.data.conteudo);
        setPreco(response.data.preco);
        setTipoMedicamento(response.data.tipos);
        setFabricanteMedicamento(response.data.fabricante);
        setFornecedorMedicamento(response.data.fornecedor);
        setConteudoDoMedicamento(response.data.tipoConteudo);


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
          onSubmit={salvarEdicaoMedicamento}
        >
          <h4>Editar Medicamento</h4>
          <fieldset className="col-md-4">
            <label htmlFor="medicamento" className="form-label">
              Medicamento
            </label>
            <input
              value={medicamento}
              type="text"
              className="form-control"
              id="medicamento"
              placeholder="Informe o nome do medicamento"
              required
              onChange={event => setMedicamento(event.target.value)}
            />
          </fieldset>
          <fieldset className="col-md-4">
            <label htmlFor="tipo" className="form-label">
              Fabricante (Laboratório)
            </label>
            <select
              id="tipo"
              className="form-select"
              aria-label="Selecione o fabricante"
              required    
              defaultValue={fabricanteMedicamento.id}          
              value={fabricanteMedicamento.id}
              onChange={event => setFabricanteMedicamento({...fabricanteMedicamento, id: event.target.value})}
            >
              
              {fabricante.map((fabricante) => (
                <option value={fabricante.id} key={fabricante.id}>{fabricante.id} - {fabricante.nome} </option>
              ))}
            </select>
          </fieldset>
          <fieldset className="col-md-4">
            <label htmlFor="tipo" className="form-label">
              Fornecedor
            </label>
            <select
              id="fornecedor"
              className="form-select"
              aria-label="Selecione o fornecedor"
              required
              defaultValue={fornecedorMedicamento.id}
              value={fornecedorMedicamento.id}
              onChange={event => setFornecedorMedicamento({...fornecedorMedicamento, id: event.target.value})}
            >
              <option>  </option>
              {fornecedor.map((fornecedor) => (
                <option value={fornecedor.id} key={fornecedor.id}> {fornecedor.nome} </option>
              ))}
            </select>
          </fieldset>
          <fieldset className="col-md-2">
            <label htmlFor="inputDosagem" className="form-label">
              Conteudo (Dosagem)
            </label>
            <input
              value={dosagem}
              type="text"
              className="form-control"
              id="inputDosagem"
              placeholder="Informe a dosagem"
              required
              onChange={event => setDosagem(event.target.value)}
            />
          </fieldset>
          <fieldset className="col-md-2">
            <label htmlFor="preco" className="form-label">
              Preço Unitário
            </label>
            <input
              value={preco}
              type="number"
              className="form-control"
              id="preco"
              placeholder="Informe o preço unitário"
              required
              onChange={event => setPreco(event.target.value)}
            />
          </fieldset>
          <fieldset className="col-md-4">
            <label htmlFor="tipoConteudo" className="form-label">
              Tipo do conteudo
            </label>
            <select
              id="tipoConteudo"
              className="form-select"
              aria-label="Selecione o tipo do conteudo"
              required              
              value={conteudoDoMedicamento.id}
              onChange={event => setConteudoDoMedicamento({...conteudoDoMedicamento, id:event.target.value})}
            >
              <option defaultValue></option>
              {tipoConteudo.map((tipo) => (
                <option value={tipo.id} key={tipo.id}> {tipo.descricao}</option>
              ))}
            </select>
          </fieldset>
          <fieldset className="col-md-4">
            <label htmlFor="tipos" className="form-label">
              Tipo de medicamento
            </label>
            <select
              id="tipos"
              className="form-select"
              aria-label="Selecione o tipo do medicamento"
              required              
              value={tipoMedicamento.id}
              onChange={event => setTipoMedicamento({...tipoMedicamento, id: event.target.value})}
            >
              {listatipoMedicacao.map((tipo) => (
                <option value={tipo.id} key={tipo.id}> {tipo.descricao} </option>
              ))}
            </select>
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
            <NavLink to={"/lista-medicamentos2/"}><button className="btn btn-secondary" type="button" to="">Voltar</button></NavLink>
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
