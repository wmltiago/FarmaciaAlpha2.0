import { useEffect, useState } from "react";
import axios from 'axios';



export default function FormCadastraMedicamento() {

  //Objeto reservado para montar um medicamento que apos validacao sera enviado para lista de medicamentos.
  const [medicamento, setMedicamento] = useState("");
  const [conteudo, setConteudo] = useState("");

  const [preco, setPreco] = useState("");
  const [tipoMedicamento, setTipoMedicamento] = useState("");
  const [fabricanteMedicamento, setFabricanteMedicamento] = useState("");
  const [fornecedorMedicamento, setFornecedorMedicamento] = useState("");
  const [conteudoDoMedicamento, setConteudoDoMedicamento] = useState("");

  const [tipoMedicacao, setTipoMedicacao] = useState([]);
  const [fabricante, setFabricante] = useState([]);
  const [fornecedor, setFornecedor] = useState([]);
  const [tipoConteudo, setTipoConteudo] = useState([]);


  const listarTipoConteudo = async () => {

    try {

      const response = await axios.get("https://app-7gnwrtklwa-rj.a.run.app/api/tipos-conteudo");

      console.log(response);
      const data = response.data;

      setTipoConteudo(data);
      console.log(data);

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

  const salvarMedicamento = (e) => {

    axios.post('https://app-7gnwrtklwa-rj.a.run.app/api/medicacoes', {
      nome: medicamento,
      conteudo: conteudo,
      tipoConteudo: {
        id: Number(conteudoDoMedicamento)
      },
      fabricante: {
        id: Number(fabricanteMedicamento)
      },
      fornecedor: {
        id: Number(fornecedorMedicamento)
      },
      tipoMedicacao: [{
        id: Number(tipoMedicamento)
      }],
      preco: preco
    })

      .then(function (response) {
        alert("Medicamento salvo com sucesso!")
        setMedicamento("")
        setConteudo("")
        setPreco("")
        setTipoMedicamento("")
        setFabricanteMedicamento("")
        setFornecedorMedicamento("")
        setConteudoDoMedicamento("")

        console.log(response);

      })

      .catch(function (error) {
        console.log(error);

      });

    return e.preventDefault();

  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-2 pt-5">
        <form
          autoComplete="off"
          className="row g-3 p-4"
          onSubmit={salvarMedicamento}
        >
          <h4>Cadastro de novo Medicamento:</h4>
          <fieldset className="col-md-4">
            <label htmlFor="medicamento" className="form-label">
              Medicamento
            </label>
            <input
              value={medicamento ? medicamento : ''} onChange={event => setMedicamento(event.target.value)}
              type="text"
              className="form-control"
              id="medicamento"
              placeholder="Informe o nome do medicamento"
              required
            />
          </fieldset>
          <fieldset className="col-md-4">
            <label htmlFor="fabricante" className="form-label">
              Fabricante (Laboratório)
            </label>
            <select
              id="fabricante"
              className="form-select"
              aria-label="Selecione o fabricante"
              required
              value={fabricanteMedicamento ? fabricanteMedicamento : ''}
              onChange={event => setFabricanteMedicamento(event.target.value)}
            >
              <option defaultValue></option>
              {fabricante.map((fabricante) => (
                <option value={fabricante.id} key={fabricante.id}> {fabricante.nome} </option>
              ))}
            </select>
          </fieldset>
          <fieldset className="col-md-4">
            <label htmlFor="fornecedor" className="form-label">
              Fornecedor
            </label>
            <select
              id="fornecedor"
              className="form-select"
              aria-label="Selecione o fornecedor"
              required
              value={fornecedorMedicamento ? fornecedorMedicamento : ''}
              onChange={event => setFornecedorMedicamento(event.target.value)}
            >
              <option defaultValue></option>
              {fornecedor.map((fornecedor) => (
                <option value={fornecedor.id} key={fornecedor.id}> {fornecedor.nome} </option>
              ))}
            </select>
          </fieldset>
          <fieldset className="col-md-2">
            <label htmlFor="dosagem" className="form-label">
              Dosagem
            </label>
            <input
              value={conteudo ? conteudo : ''} onChange={event => setConteudo(event.target.value)}
              type="text"
              className="form-control"
              id="dosagem"
              placeholder="Informe a dosagem"
              required
            />
          </fieldset>
          <fieldset className="col-md-2">
            <label htmlFor="preco" className="form-label">
              Preço Unitário
            </label>
            <input
              value={preco ? preco : ''}
              onChange={event => setPreco(event.target.value)}
              type="number"
              className="form-control"
              id="inputPreco"
              placeholder="Informe o preço unitário"
              required
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
              value={conteudoDoMedicamento ? conteudoDoMedicamento : ''}
              onChange={event => setConteudoDoMedicamento(event.target.value)}
            >
              <option defaultValue></option>
              {tipoConteudo.map((tipo) => (
                <option value={tipo.id} key={tipo.id}> {tipo.descricao}</option>
              ))}
            </select>
          </fieldset>
          <fieldset className="col-md-4">
            <label htmlFor="tipo" className="form-label">
              Tipo de medicamento
            </label>
            <select
              id="tipo"
              className="form-select"
              aria-label="Selecione o tipo do medicamento"
              required
              value={tipoMedicamento ? tipoMedicamento : ''}
              onChange={event => setTipoMedicamento(event.target.value)}
            >
              <option defaultValue></option>
              {tipoMedicacao.map((tipo) => (
                <option value={tipo.id} key={tipo.id}> {tipo.descricao} </option>
              ))}
            </select>
          </fieldset>
          
          <div className="d-grid gap-1 d-md-flex justify-content-md-end">
            <input
              id="reset"
              value="Limpar"
              type="reset"
              className="btn btn-secondary me-md-1"
              onClick={() => {
                setMedicamento("");
                setConteudo("");
                setPreco("");

              }}
            />
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
