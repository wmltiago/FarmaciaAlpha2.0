import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RotaPrivada } from "./RotaPrivada";
import Login from "../pages/Login";
import CadastraFarmacia from "../pages/CadastraFarmacia";
import CadastraMedicamento from "../pages/CadastraMedicamento";
import NaoEncontrado from "../pages/NaoEncontrado";
import ListaMedicamentos from "../pages/ListaMedicamentos";
import ListaMedicamentos2 from "../pages/ListaMedicamentos";
import Ajuda from "../pages/Ajuda";
import Caixa from "../pages/Caixa";
import EditarMedicamento from "../pages/EditarMedicamento";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RotaPrivada />}>          
          <Route path="/cadastra-farmacia" element={<CadastraFarmacia />} />
          <Route
            path="/cadastra-medicamento"
            element={<CadastraMedicamento />}
          />
          <Route path="/lista-medicamentos" element={<ListaMedicamentos />} />
          <Route path="/lista-medicamentos2" element={<ListaMedicamentos2 />} />
        </Route>
        
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Navigate replace to="/" />} />
        <Route path="/login" element={<Navigate replace to="/" />} />        
        <Route path="/ajuda" element={<Ajuda />} />        
        <Route path="/caixa" element={<Caixa/>} /> 
        <Route path="/formEditarMedicamento/:id" element={<EditarMedicamento/>} /> 
        
        <Route path="*" element={<NaoEncontrado />} />
      </Routes>
    </BrowserRouter>
  );
}
