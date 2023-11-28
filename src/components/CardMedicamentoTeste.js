export default function CardMedicamento({  
  nomeMedicamento,
  razaoSocial,  
  id,  
  excluir
}) {
  //Como o id foi criado com math.randon eu passo ele para outra variavel para tornar uma string, assim consigo diferenciar os modals
  let novoId = id.toString();

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="card" style={{ height: "12rem" }}>
        <div
          className="card-body"
          data-bs-toggle="modal"
          data-bs-target={`#a${novoId.substring(2, 13)}`}
        >
          <h5 className="card-title">{medicamento}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{dosagem}</h6>          
          <div className="d-grid col-6 mx-auto">
            <button className="btn btn-outline-success btn-sm mt-4 ">
              Saiba mais
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id={`a${novoId.substring(2, 13)}`}
        tabIndex="-1"
        aria-labelledby={`a${novoId.substring(2, 13)}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`a${novoId.substring(2, 13)}`}>
                Detalhes do medicamento:
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <span>
                <b>Medicamento:</b> {nomeMedicamento}
              </span>
              <br />
              <span>
                <b>RazaoSocial:</b> {razaoSocial}
              </span>                  
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={()=>{excluir(id)}}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
