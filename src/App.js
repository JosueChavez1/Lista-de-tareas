import React, { useState } from "react";
import "./App.css";

function TareaFormulario({ agregar }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    agregar(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="input-group shadow-sm mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Escribe una tarea..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Agregar
      </button>
    </form>
  );
}

function Tarea({ tarea, alternar, eliminar, completada }) {
  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center task-item ${
        completada ? "task-completed" : ""
      }`}
    >
      <span
        className="flex-grow-1 me-2"
        style={{ cursor: "pointer" }}
        onClick={() => alternar(tarea.id)}
      >
        {tarea.text}
      </span>
      <button
        className="btn btn-sm btn-danger"
        title="Eliminar"
        onClick={() => eliminar(tarea.id)}
      >
        🗑
      </button>
    </li>
  );
}

function TareaList({ tareas, alternar, eliminar, titulo, completada }) {
  return (
    <div className="col-md-6 mb-4">
      <div className="card shadow border-0 rounded-4 h-100">
        <div className="card-body">
          <h4
            className={`text-center mb-3 ${
              completada ? "text-success" : "text-primary"
            }`}
          >
            {titulo}
          </h4>

          {tareas.length === 0 ? (
            <p className="text-center text-muted">No hay tareas</p>
          ) : (
            <ul className="list-group">
              {tareas.map((tarea) => (
                <Tarea
                  key={tarea.id}
                  tarea={tarea}
                  alternar={alternar}
                  eliminar={eliminar}
                  completada={completada}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tareas, setTareas] = useState([]);

  const agregarTarea = (text) => {
    const nuevaTarea = { id: Date.now(), text, completado: false };
    setTareas([nuevaTarea, ...tareas]);
  };

  const cambioTarea = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completado: !t.completado } : t
      )
    );
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  const tareasPendientes = tareas.filter((t) => !t.completado);
  const tareasCompletadas = tareas.filter((t) => t.completado);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 text-primary fw-bold">📝 Lista de Tareas</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-md-8 col-lg-6">
          <TareaFormulario agregar={agregarTarea} />
        </div>
      </div>

      <div className="row">
        <TareaList
          tareas={tareasPendientes}
          alternar={cambioTarea}
          eliminar={eliminarTarea}
          titulo="Pendientes"
          completada={false}
        />
        <TareaList
          tareas={tareasCompletadas}
          alternar={cambioTarea}
          eliminar={eliminarTarea}
          titulo="Completadas"
          completada={true}
        />
      </div>
    </div>
  );
}
