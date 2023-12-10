import { useEffect, useState } from "react";
import { useDadosFarmacia } from "../contexts/useDadosFarmacia";
import MenuNavegacao from "../components/MenuNavegacao";
import FormCadastraFarmacia from "../components/FormCadastraFarmacia";
import FormCadastraCliente from "../components/FormCadastraCliente";


export default function CadastraCliente() {
  

  return (
    <>
      <MenuNavegacao />
      <FormCadastraCliente/>
    </>
  );
}
