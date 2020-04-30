// GLOBALES
let timer;
// ATRIBUTOS ESPECIALES: Minimo en 0, Maximo en 10
var carisma = 10;
var fuerza = 10;
var belleza = 10;
var inteligencia = 10;

// MISCELANEOS
var vida = carisma + fuerza + belleza + inteligencia;
var numeroNivel = 0;

// INVENTARIO
var linternas = 0; // contra burlon
var estacas = 0; // contra zombie
var globos = 0; // contra unitornio
var tijeras = 0; // contra lazy :
var escudo = false; // contra megastofeles

function obtenerEscudo(vida) {
  let probEscudo = Math.random();
  if (vida <= 15) {
    if (probEscudo <= 0.8) {
      escudo = true;
      console.log('El escudo fue activado!');
      return escudo;
    } else {
      return false;
    }
  } else {
    if (probEscudo > 0.8) {
      escudo = true;
      console.log('El escudo fue activado!');
      return escudo;
    } else {
      return false;
    }
  }
}
function megastofeles(escudo) {
  console.log('Megastofeles ataca');
  if (escudo) {
    escudo = false;
    console.log('ataque fue esquivado');
    console.log('el escudo fue usado para esquivar el ataque');
  } else {
    carisma -= 2;
    fuerza -= 2;
    belleza -= 2;
    inteligencia -= 2;
    return vida;
  }
  if (vida <= 0) {
    console.log('muerto');
  }
}
function unitornio() {
  if (globos > 0) {
    globos = globos - 1;
    if (globos === 0) {
      console.log('Atento!. Vas a atacar, y te quedaste sin globos.');
    }
    belleza = belleza + 2;
    console.log(`El enemigo fue atacado con un globo y tu belleza ha sido aumentada a: ${belleza}`);
  } else {
    belleza = belleza - 2;
    console.log(`El enemigo te atacó y tu belleza se redujo a: ${belleza}`);
  }
  if (vida < 0) {
    console.log('Te moriste.  \n  GAME OVER.');
  }
}
function obtenerGlobo() {
  let probabilidad = Math.floor(Math.random() * 101);
  if (belleza <= 5) {
    if (probabilidad >= 0 && probabilidad <= 80) {
      globos++;
      console.log('Se agregó un globo al inventario!');
      return 'globo';
    } else {
      return false;
    }
  } else {
    if (probabilidad >= 0 && probabilidad <= 20) {
      globos++;
      console.log('Se agregó un globo al inventario!');
      return 'globo';
    } else {
      return false;
    }
  }
}
function lazy() {
  if (tijeras > 0) {
    tijeras--;
    console.log('Utilizaste tijera contra Lazy violenta');
    console.log('Lazy violenta ataca');
    console.log('Lazy violenta fue derrotada con un tijera');
    carisma++;
  } else {
    console.log('No tienes tijeras para defenderte');
    console.log('Lazy violenta ataca');
    console.log('Lazy violenta te ha derrotado');
    carisma -= 2;
  }
  if (vida <= 0) {
    console.log('GAME OVER');
  }
}
function obtenerEspejo() {
  if (carisma <= 5) {
    console.log('Obtuviste un tijera');
    tijeras++;
    return 'tijera';
  } else {
    console.log('No encontraste nada');
    return false;
  }
}
function zombie() {
  if (estacas > 0) {
    console.log('Se usó un estaca para contratacar a Zombie electrico');
    if (inteligencia < 10) {
      inteligencia++;
      console.log('Se sumó 1 de inteligencia por derrotar a Zombie electrico');
    }
    estacas--;
    console.log('Se usó un estaca.');
    if (estacas === 0) {
      console.log('No tienes más estacas disponibles');
    }
  } else {
    console.log('Zombie electrico ataca');
    if (inteligencia > 0) {
      inteligencia -= 2;
      console.log('Se le resta al jugador -2 de inteligencia');
      if (inteligencia < 0) {
        inteligencia = 0;
      }
    }
  }
  vida = carisma + fuerza + belleza + inteligencia;
  if (vida === 0) {
    console.log('Te moriste.');
  }
}
function obtenerEstaca() {
  var aleatorio = Math.floor(Math.random() * 10);
  if (inteligencia <= 5) {
    if (aleatorio <= 7) {
      estacas++;
      console.log('Se sumó 1 estaca');
      return 'estaca';
    } else {
      return false;
    }
  } else {
    if (aleatorio <= 1) {
      estacas++;
      console.log('Se sumó 1 estaca');
      return 'estaca';
    } else {
      return false;
    }
  }
}
function burlon() {
  if (linternas === 0) {
    console.log('Burlon oscuro ATACA!!');
    fuerza = fuerza - 2;
    if (vida < 0) {
      console.log('MORISTE!');
    } else {
      console.log('Seguis VIVO');
    }
  } else {
    fuerza = fuerza + 1;
    linternas = linternas - 1;
    console.log('Burlon oscuro fue ELIMINADO!');
    if (linternas === 0) {
      console.log('Te quedaste sin LINTERNAS!');
    }
  }
}
function obtenerLinterna() {
  if (fuerza <= 5) {
    let stat = parseInt(Math.random() * 10);
    if (stat <= 8) {
      linternas = linternas + 1;
      console.log('Obtuviste una LINTERNA!');
      return 'linternas';
    } else {
      console.log('No obtuviste NADA!');
      return false;
    }
  } else {
    let stat = parseInt(Math.random() * 10);
    if (stat <= 8) {
      console.log('No obtuviste NADA!');
      return false;
    } else {
      linternas = linternas + 1;
      console.log('Obtuviste una LINTERNA!');
      return 'linternas';
    }
  }
}
function abrirCofre() {
  console.log('Encontraste un cofre... 🎁🛍');
  var items = [obtenerGlobo, obtenerEscudo, obtenerEspejo, obtenerEstaca, obtenerLinterna];
  var item = items[Math.floor(Math.random() * items.length)];
  var resultado = item();
  if (resultado) {
    console.log(' con un ' + resultado + '!');
  } else {
    console.log(' pero estaba vacio! 💩');
  }
}
var niveles = [lazy, unitornio, megastofeles, zombie, burlon, abrirCofre];

function jugarNivel() {
  var nivel = niveles[Math.floor(Math.random() * niveles.length)];
  numeroNivel++;
  setTimeout(() => {
    console.log('Entrando al nivel ' + numeroNivel + '...');
  }, 1000);
  setTimeout(() => {
    nivel();
  }, 2500);
  setTimeout(() => {
    console.log(`
        - RESULTADOS DESPUES DEL NIVEL ${numeroNivel} -`);
  }, 3000);
  setTimeout(() => {
    console.log(`
        - ESTADISTICAS DE VIDA -
        carisma: ${carisma}
        fuerza: ${fuerza}
        inteligencia: ${inteligencia}
        belleza: ${belleza}
        vida total: ${vida}
        `);
  }, 5000);
  setTimeout(() => {
    console.log(`
        - INVENTARIO -
        tijeras: ${tijeras}
        globos: ${globos}
        linternas: ${linternas}
        estacas: ${estacas}
        escudo activado? ${escudo ? 'Si.' : 'No.'}
        `);
  }, 7000);
}
