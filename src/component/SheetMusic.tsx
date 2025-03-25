import React, { useRef, useEffect } from "react";
import {
  Renderer,
  Stave,
  StaveNote,
  Accidental,
  Beam,
  Formatter,
  Dot,
} from "vexflow";

const MusicNotation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Limpia el contenido previo del contenedor
      containerRef.current.innerHTML = "";

      // Crear un renderizador de VexFlow y adjuntarlo al contenedor
      const renderer = new Renderer(
        containerRef.current,
        Renderer.Backends.SVG
      );

      // Configurar el contexto de renderización
      renderer.resize(1000, 1000);
      const context = renderer.getContext();

      // El 950 representa el ancho del pentagrama en píxeles
      const stave = new Stave(10, 40, 950);

      // Agregar una clave y una firma de tiempo
      stave.addClef("treble").addTimeSignature("4/4");

      // Conectar el pentagrama al contexto de renderización y dibujarlo
      stave.setContext(context).draw();

      // Definir las notas
      const notes1 = [
        dotted(
          new StaveNote({
            keys: ["e##/5"],
            duration: "8d",
          }).addModifier(new Accidental("##"))
        ),
        new StaveNote({
          keys: ["b/4"],
          duration: "16",
        }).addModifier(new Accidental("b")),
        new StaveNote({
          keys: ["e##/5"],
          duration: "8d",
        }).addModifier(new Accidental("##")),
      ];

      const notes2 = [
        new StaveNote({
          keys: ["c/4"],
          duration: "8",
        }),
        new StaveNote({
          keys: ["d/4"],
          duration: "16",
        }),
        new StaveNote({
          keys: ["e/4"],
          duration: "16",
        }).addModifier(new Accidental("b")),
        new StaveNote({
          keys: ["d/4"],
          duration: "16",
        }),
      ];

      const notes3 = [
        new StaveNote({
          keys: ["d/4"],
          duration: "16",
        }),
        new StaveNote({
          keys: ["e/4"],
          duration: "16",
        }).addModifier(new Accidental("#")),
        new StaveNote({
          keys: ["g/4"],
          duration: "32",
        }),
        new StaveNote({
          keys: ["a/4"],
          duration: "32",
        }),
        new StaveNote({
          keys: ["g/4"],
          duration: "16",
        }),
        new StaveNote({
          keys: ["a/4"],
          duration: "32",
        }),
        new StaveNote({
          keys: ["g/4"],
          duration: "16",
        }),
      ];
      const notes4 = [
        new StaveNote({
          keys: ["d/4"],
          duration: "q",
        }),
        new StaveNote({
          keys: ["d/4"],
          duration: "q",
        }),
        new StaveNote({
          keys: ["d/4"],
          duration: "q",
        }),
        new StaveNote({
          keys: ["d/4"],
          duration: "q",
        }),
        new StaveNote({
          keys: ["d/4"],
          duration: "q",
        }),
        new StaveNote({
          keys: ["d/4"],
          duration: "q",
        }),
        new StaveNote({
          keys: ["d/4"],
          duration: "q",
        }),
        new StaveNote({
          keys: ["d/4"],
          duration: "q",
        }),
        new StaveNote({
          keys: ["d/4"],
          duration: "q",
        }),
        new StaveNote({
          keys: ["g/4"],
          duration: "q",
        }),
        new StaveNote({
          keys: ["a/4"],
          duration: "q",
        }),
        new StaveNote({
          keys: ["c/4"],
          duration: "8",
        }),
      ];

      // Combinar todas las notas
      const allNotes = notes1.concat(notes2).concat(notes3).concat(notes4);

      // Crear las vigas (beams) para los primeros tres grupos de notas
      const beams = [new Beam(notes1), new Beam(notes2), new Beam(notes3)];

      // Formatear y dibujar las notas en el pentagrama
      Formatter.FormatAndDraw(context, stave, allNotes);

      // Dibujar las vigas y las plicas (stems)
      beams.forEach((b) => {
        b.setContext(context).draw();
      });
    }
  }, []);

  // Función auxiliar para agregar un puntillo a una nota
  const dotted = (staveNote: any) => {
    Dot.buildAndAttach([staveNote]);
    return staveNote;
  };

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", border: "1px solid red" }}
    ></div>
  );
};

export default MusicNotation;
