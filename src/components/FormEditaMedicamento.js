import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function FormEditaMedicamento() {

  const { id } = useParams();
  const [edit, setEdit] = useState([]);

  console.log(edit)
  

  // useEffect(() => {
  //   fetch(`https://corsproxy.io/?http://premier.rf.gd/medicamentos.php/${id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "aplication/json",
  //     },
  //   }).then(resp => resp.json())
  //     .then((data) => {
  //       setEdit(data)        
  //     })
  //     .catch((err) => console.log)
  // }, [id])

  useEffect(() => {
    axios.get(`http://localhost:5000/medicamentos/${id}`)
      .then(response => {
        setEdit(response.data);
        
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
          onSubmit=""
        >
          <h4>Editar Medicamento:</h4>
          <fieldset className="col-md-4">
            <label htmlFor="inputMedicamento" className="form-label">
              Medicamento
            </label>
            <input
              value={edit.medicamento}
              type="text"
              className="form-control"
              id="inputMedicamento"
              placeholder="Informe o nome do medicamento"
              required
            />
          </fieldset>
          <fieldset className="col-md-4">
            <label htmlFor="inputLaboratorio" className="form-label">
              Laboratório
            </label>
            <input
              value={edit.laboratorio}
              type="text"
              className="form-control"
              id="inputLaboratorio"
              placeholder="Informe o laboratório"
            />
          </fieldset>
          <fieldset className="col-md-4">
            <label htmlFor="inputLaboratorio" className="form-label">
              Fornecedor
            </label>
            <input
              value=""
              type="text"
              className="form-control"
              id="inputLaboratorio"
              placeholder="Informe o fornecedor"
            />
          </fieldset>
          <fieldset className="col-md-4">
            <label htmlFor="inputDosagem" className="form-label">
              Dosagem
            </label>
            <input
              value={edit.dosagem}
              type="text"
              className="form-control"
              id="inputDosagem"
              placeholder="Informe a dosagem"
              required
            />
          </fieldset>
          <fieldset className="col-md-4">
            <label htmlFor="inputPreco" className="form-label">
              Preço Unitário
            </label>
            <input
              value={edit.preco}
              type="text"
              className="form-control"
              id="inputPreco"
              placeholder="Informe o preço unitário"
              required
            />
          </fieldset>
          <fieldset className="col-md-4">
            <label htmlFor="inputTipo" className="form-label">
              Tipo de medicamento
            </label>
            <select
              id="inputTipo"
              className="form-select"
              aria-label="Selecione o tipo do medicamento"
              required
            >
              <option defaultValue></option>
              <option value="Medicamento controlado">
                Medicamento controlado
              </option>
              <option value="Medicamento comum">Medicamento comum</option>
            </select>
          </fieldset>
          <fieldset className="col-md-12">
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
          </fieldset>
          <div className="d-grid gap-1 d-md-flex justify-content-md-end">
            <input
              id="reset"
              value="Limpar"
              type="reset"
              className="btn btn-secondary me-md-1"
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
