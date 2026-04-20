import { configureStore } from "@reduxjs/toolkit";
import { excursiones } from "./excursiones";
import { comentarios } from "./comentarios";
import { cabeceras } from "./cabeceras";
import { actividades } from "./actividades";
import { contacto } from "./contacto";
import { historia } from "./historia";

export const ConfigureStore = () => {
  const store = configureStore({
    reducer: {
      excursiones: excursiones,
      comentarios: comentarios,
      cabeceras: cabeceras,
      actividades: actividades,
      contacto: contacto,
      historia: historia,
    },
  });

  return store;
};
