import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";


export default function FormEditaMedicamento() {

  const { id } = useParams();

  const [edit, setEdit] = useState([]);
  const [medicamento, setMedicamento] = useState("");
  const [dosagem, setDosagem] = useState("");

  const [preco, setPreco] = useState("");
  const [tipoMedicamento, setTipoMedicamento] = useState("");
  const [fabricanteMedicamento, setFabricanteMedicamento] = useState("");
  const [fornecedorMedicamento, setFornecedorMedicamento] = useState("");

  console.log(edit)

  const [tipoMedicacao, setTipoMedicacao] = useState([]);
  const [fabricante, setFabricante] = useState([]);
  const [fornecedor, setFornecedor] = useState([]);

  const listarTipoMedicamentos = async () => {

    try {

      const response = await axios.get("http://localhost:5000/tipo_medicacao/");

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

      const response = await axios.get("http://localhost:5000/fabricante/");

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

      const response = await axios.get("http://localhost:5000/fornecedor/");

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

  }, [])

  const salvarEdicaoMedicamento = (e) => {

    axios.put(`http://localhost:5000/medicamentos/${id}`, {
      medicamento: medicamento,
      dosagem: dosagem,
      fabricante: fabricanteMedicamento,
      fornecedor: fornecedorMedicamento,
      tipo: tipoMedicamento,
      preco: preco,
    })

      .then(function (response) {
        alert("Medicamento salvo com sucesso!")
        setMedicamento("")
        setDosagem("")
        setPreco("")
        setTipoMedicamento("")
        setFabricanteMedicamento("")
        setFornecedorMedicamento("")

        console.log(response);

      })

      .catch(function (error) {
        console.log(error);

      });

    return e.preventDefault();

  }

  useEffect(() => {
    axios.get(`http://localhost:5000/medicamentos/${id}`)
      .then(response => {
        setEdit(response.data);
        setMedicamento(response.data.medicamento);
        setDosagem(response.data.dosagem);
        setPreco(response.data.preco);
        setTipoMedicamento(response.data.tipo);
        setFabricanteMedicamento(response.data.fabricante);
        setFornecedorMedicamento(response.data.fornecedor);
        

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
          <h4>Editar Medicamento:</h4>
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
              defaultValue = {edit.fabricante}
              value={fabricanteMedicamento}
              onChange={event => setFabricanteMedicamento(event.target.value)}
            >
              
              {fabricante.map((fabricante) => (
                <option value={fabricante.id} key={fabricante.id}> {fabricante.nome_fabricante} </option>
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
              defaultValue = {edit.fornecedor}
              value={fornecedorMedicamento}
              onChange={event => setFornecedorMedicamento(event.target.value)}
            >              
              {fornecedor.map((fornecedor) => (
                <option value={fornecedor.id} key={fornecedor.id}> {fornecedor.nome_fornecedor} </option>
              ))}
            </select>
          </fieldset>
          <fieldset className="col-md-4">
            <label htmlFor="inputDosagem" className="form-label">
              Dosagem
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
          <fieldset className="col-md-4">
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
            <label htmlFor="tipo" className="form-label">
              Tipo de medicamento
            </label>
            <select
              id="tipo"
              className="form-select"
              aria-label="Selecione o tipo do medicamento"
              required
              defaultValue = {edit.tipo}
              value={tipoMedicamento}
              onChange={event => setTipoMedicamento(event.target.value)}
            >              
              {tipoMedicacao.map((tipo) => (
                <option value={tipo.id} key={tipo.id}> {tipo.tipo} </option>
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
