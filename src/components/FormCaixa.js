import { useState } from "react";
import ListaMedicamentos from "../pages/ListaMedicamentos";
import ListaMedicamentos2 from "../pages/ListaMedicamentos";
export default function FormCaixa() {

  return (
    <div className="container">
      <div className="row justify-content-center pt-5" style={{ marginTop: "67px" }}>
        <main className="col-8">
          <div className="row">
            <div className="col-10">Painel</div>
            <div className="col-2">Caixa aberto</div>
          </div>
          <div className="row justify-content-center">Cards
            <div className="row">
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">Consulta
            <ListaMedicamentos2 />
          </div>
        </main>
        <aside className="col-4" style={{ paddingLeft: "2rem" }}>Detalhes

          <div className="row">
            <div className="col-sm-8" style={{ backgroundColor: "olive" }}>Código</div>
            <div className="col-sm-4" style={{ backgroundColor: "silver" }}>Quantidade</div>
          </div>
          <div className="row mt-2 mb-2">
            <div style={{ backgroundColor: "#fff9d8", height: "600px", padding: "1.5rem" }}>
              Farmácia Alpha <br />
              R. Nossa Sra, 309 - Recife - PE <br />
              CNPJ 01123131/100000
              <br />
              <br />
              1. Omeprazol 20mg <br />
              2 x UN 15,45 R$ 30,90 <br />
              <br />
              2. Paracetamol 500mg <br />
              1 x UN 30,90 R$ 30,90 <br />



            </div>
          </div>

          <div className="row text-center" style={{ color: "red", fontWeight: "bold", fontSize: "2rem" }}>
            <div className="col-sm-6">Valor total</div>
            <div className="col-sm-6">R$ 0,00</div>
          </div>


          <div className="row text-center mt-3">
            <div className="col-sm-6">
              <button type="button" class="btn btn-danger"><i class="bi bi-x"></i>Cancelar Pedido</button>
            </div>
            <div className="col-sm-6">
              <button type="button" class="btn btn-success"><i class="bi bi-check"></i>Ir para pagamento</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
