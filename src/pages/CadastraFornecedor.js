import { useEffect, useState } from "react";
import { useDadosFarmacia } from "../contexts/useDadosFarmacia";
import MenuNavegacao from "../components/MenuNavegacao";
import FormCadastraFarmacia from "../components/FormCadastraFarmacia";

import FormCadastraFornecedor from "../components/FormCadastraFornecedor";


export default function CadastraFornecedor() {
  return (
    <>
      <MenuNavegacao />
      <FormCadastraFornecedor/>
    </>
  );
}
