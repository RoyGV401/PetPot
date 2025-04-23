import { HEADER } from "./header.js";

export function createPetSelect(pet) {
  
  const name = pet.name;
  const raza = pet.raza;
  const tamano = pet.Tamano;
  const personalidad = pet.personalidad;
  const img = pet.img;
  const sexo = pet.sexo;
  const color = pet.color;
  const edad = pet.edad;
  const descripcion = pet.descripcion;

  const result = `
    <main_header id="mainHeader" class="sticky-header">${HEADER}</main_header>
    <section>
      <p></p>
    </section>
    <div id="buscar_div">
      <table>
        <tr>
          <th id="search_bar">
            <form action="">
              <input
                type="text"
                placeholder="Palabras clave (tranquilo, alegre, inteligente, etc...)"
              />
            </form>
          </th>
          <th>
            <img src="resources/lupa.png" />
          </th>
        </tr>
      </table>
    </div>

    <div class="main_div">
      <div class="main_div">
        <br>
        
        <div class="adoption-card">
          <div class="image-container">
              <img class="cropped_image" src="${img}" alt="Imagen de la mascota">
          </div>
          <div class="info-container">
              <h1 class="bit_title"><hBig>¡Hola! soy <span class="highlight">${name}!</hBig></span></h1>
              <div class="details">
                  <span class="tag attribute">${sexo}</span>
                  <span class="tag attribute">${edad}</span>
                  <span class="tag attribute">${tamano}</span>
                  <span class="tag attribute">Colonia Obrera - 1.5 km</span>
              </div>
              <div class="traits">
                  <span class="tag personality">${personalidad[0]}</span>
                  ${
                    personalidad[1]
                      ? `<span class="tag personality">${personalidad[1]}</span>`
                      : ""
                  }
                  ${
                    personalidad[2]
                      ? `<span class="tag personality">${personalidad[2]}</span>`
                      : ""
                  }
                
                  <span class="tag contact_owner" id="contact_owner">Contactar con dueñ@</span>
              </div>
              <div class="description">
                  <h3>Descripción:</h3>
                  <p>${descripcion}</p>
              </div>
              <button class="adopt-btn">Adóptame</button>
          </div>
      </div>
      </div>
    </div>
  `;
  return result;
}
