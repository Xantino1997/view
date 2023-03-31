window.addEventListener('DOMContentLoaded', limpiarLista())

const input = document.getElementById("subir-imagen-boton");

const botonLlamaInput = document.getElementById("botonVerMas");
botonLlamaInput.addEventListener('click', () => {
  input.click()
})

const imagenGrande = document.getElementById("imagArt");
const imagenPequeña = document.getElementById("visor-imagen-pequeña");


function saveImageToJSON(imgSrc) {
  let imageData = {
    src: imgSrc,
    date: new Date()
  };

  // Get existing data from local JSON file or create an empty array
  let existingData = JSON.parse(localStorage.getItem("imageData")) || [];

  // Add new image data to the array
  existingData.push(imageData);

  // Save the updated array to local storage
  localStorage.setItem("imageData", JSON.stringify(existingData));
}





let contador = 0;

document.getElementById("cerrar").addEventListener("click", function () {
  let visorP = document.getElementById("visorPequeño");
  let visorG = document.getElementById("visorGeneral");
  let lista = document.getElementById("listaReproduccion");

  if (lista.firstChild) {
    let liEliminado = lista.removeChild(lista.firstChild);
    let imgEliminada = visorP.removeChild(visorP.firstChild);
    visorG.removeChild(visorG.firstChild);

    if (lista.firstChild) {
      lista.insertBefore(liEliminado, lista.firstChild);
      visorP.appendChild(imgEliminada);
      visorG.appendChild(imgEliminada);
      alert("Elim")
    }
    alert("Elimfuera")

  }
});






function handleFileUpload(event) {
  let file = event.target.files[0];
  contador++;
  document.getElementById('parrafoListaReprod').innerHTML = `${contador}  elementos cargados`;
  let reader = new FileReader();
  let imgTagSmall = document.getElementById("visorPequeño");
  let imgTagLarge = document.getElementById("visorGeneral");
  let visorPequeñoVideo = document.getElementById("visorPequeñoVideo");
  let visorGeneralVideo = document.getElementById("visorGeneralVideo");
  let list = document.getElementById("listaReproduccion").getElementsByTagName("ul")[0];
  document.getElementById("visor-imagen-pequeña").classList.add("visor-imagen-shadow");
  imgTagSmall.style.border = " #3ce139 solid 5px";

  if (file.name.endsWith(".jpg") || file.name.endsWith(".jpeg") || file.name.endsWith(".png") || file.name.endsWith(".PNG")) {
    reader.onload = function (event) {
      imgTagSmall.src = event.target.result;
      imgTagLarge.src = event.target.result;
      saveImageToJSON(event.target.result);

      let newLi = document.createElement("li");
      let newImg = document.createElement("img");
      newImg.src = event.target.result;
      newImg.classList.add('imagenLista');
      newLi.appendChild(newImg);
      list.appendChild(newLi);
      newImg.style.marginTop = "10px";

      if (newImg) {
        document.getElementById('parrafoLimpiar').innerHTML = "Lista en marcha";
      }

      newImg.addEventListener("dblclick", function () {
        imgTagSmall.src = newImg.src;
        imgTagLarge.src = newImg.src;
        let imagenes = list.getElementsByTagName("img");
        for (let i = 0; i < imagenes.length; i++) {
          imagenes[i].style.border = "3px solid #56f656";
          imagenes[i].style.width = "80px";
          imagenes[i].style.height = "70px";

        }
        newImg.style.border = "5px solid red";
        newImg.style.width = "80px";
        newImg.style.height = "70px";
      });

      let currentIndex = 0;
      let imagenes = list.getElementsByTagName("img");

      let btnFlechas = document.getElementById("izquierda");
      btnFlechas.addEventListener("click", function () {
        currentIndex++;
        if (currentIndex >= imagenes.length) {
          currentIndex = 0;
        }
        imgTagSmall.src = imagenes[currentIndex].src;
        imgTagLarge.src = imagenes[currentIndex].src;
        for (let i = 0; i < imagenes.length; i++) {
          imagenes[i].style.border = "3px solid #56f656";
          imagenes[i].style.width = "80px";
          imagenes[i].style.height = "70px";
        }
        imagenes[currentIndex].style.border = "5px solid red";
        imagenes[currentIndex].style.width = "80px";
        imagenes[currentIndex].style.height = "70px";
      });

      let btnFlechas2 = document.getElementById("derecha");
      btnFlechas2.addEventListener("click", function () {
        currentIndex--;
        if (currentIndex < 0) {
          currentIndex = imagenes.length - 1;
        }
        imgTagSmall.src = imagenes[currentIndex].src;
        imgTagLarge.src = imagenes[currentIndex].src;
        for (let i = 0; i < imagenes.length; i++) {
          imagenes[i].style.border = "3px solid #56f656";
          imagenes[i].style.width = "80px";
          imagenes[i].style.height = "70px";
        }
        imagenes[currentIndex].style.border = "5px solid red";
        imagenes[currentIndex].style.width = "80px";
        imagenes[currentIndex].style.height = "70px";
      });

    };
    reader.readAsDataURL(file);
  } else if (file.name.endsWith(".mp3") || file.name.endsWith(".mp4") || file.name.endsWith(".wmv")) {
    let newLi = document.createElement("li");
    let newMedia = document.createElement("audio");
    if (file.name.endsWith(".mp4")) {
      newMedia = document.createElement("video");
    }
    newMedia.src = URL.create

    ObjectURL(file);
    newMedia.controls = true;
    newMedia.classList.add('mediaLista');
    newLi.appendChild(newMedia);
    list.appendChild(newLi);
    newMedia.style.marginTop = "10px";
    newMedia.addEventListener("dblclick", function () {
      visorPequeñoVideo.innerHTML = "";
      visorGeneralVideo.innerHTML = "";
      visorPequeñoVideo.appendChild(newMedia);
      visorGeneralVideo.appendChild(newMedia);
      newMedia.play();
    });
  }
}

function removeListItem() {
  contador--;
  document.getElementById('parrafoListaReprod').innerHTML = `${contador}  elementos cargados`;
  var listItem = document.getElementById("listaReproduccion").getElementsByTagName("li")[0];
  var visorGeneral = document.getElementById("visorMovible")
  var visorPequeño = document.getElementById("visor-imagen-pequeña")
  var imgGeneral = visorGeneral.getElementsByTagName("img")[0];
  var imgPequeño = visorPequeño.getElementsByTagName("img")[0];
  var imgList = listItem.getElementsByTagName("img")[0];
  var numList = listItem.getElementsByTagName("span")[0];
  try {
    listItem.parentNode.removeChild(listItem);
    if (imgGeneral) {
      imgGeneral.parentNode.removeChild(imgGeneral);
    }
    if (imgPequeño) {
      imgPequeño.parentNode.removeChild(imgPequeño);
    }
    imgList.parentNode.removeChild(imgList);
    numList.parentNode.removeChild(numList);
    if (document.getElementById("listaReproduccion").getElementsByTagName("li").length > 0) {
      var newListItem = document.getElementById("listaReproduccion").getElementsByTagName("li")[0];
      var newImgGeneral = newListItem.getElementsByTagName("img")[0];
      var newImgPequeño = newListItem.getElementsByTagName("img")[0];
      visorGeneral.appendChild(newImgGeneral);
      visorPequeño.appendChild(newImgPequeño);
    }
  } catch (error) {
    console.log(error);
  }
  alert('se removio')
}




document.getElementById("cerrar").addEventListener("click", removeListItem);



input.addEventListener("change", handleFileUpload);


function displayImageOnSecondScreen(imageData) {
  let imgTag = document.createElement("img");
  imgTag.src = imageData;
  imgTag.style.width = "100%";
  imgTag.style.height = "100%";

  // Check if the browser supports the Screen API
  if (navigator.getDisplayMedia) {
    navigator.getDisplayMedia({ video: true, audio: false }).then(function (screen) {
      let secondScreen = new MediaStream([screen]);
      let videoTag = document.createElement("video");
      videoTag.srcObject = secondScreen;
      document.body.appendChild(videoTag);
      videoTag.appendChild(imgTag);
    });
  } else {
    console.log("Your browser does not support the Screen API");
  }
}

 let button = document.createElement("button");
 button.innerHTML = "Mostrar en segunda pantalla";
 button.classList.add('botonSegundaPantalla');


button.addEventListener("click", () => {

})
document.body.appendChild(button);

button.addEventListener("click", function () {
  let imgSrc = document.getElementById("visorPequeño").src;
  displayImageOnSecondScreen(imgSrc);
});



let currentImageIndex = 0;

function switchImage(direction) {
  let imageData = JSON.parse(localStorage.getItem("imageData"));
  let imgTag = document.getElementById("visorGeneral");
  let imgTag2 = document.getElementById("visorPequeño");

  if (direction === "izquierda") {
    currentImageIndex--;
    if (currentImageIndex < 0) {
      currentImageIndex = imageData.length - 1;
    }
  } else if (direction === "derecha") {
    currentImageIndex++;
    if (currentImageIndex >= imageData.length) {
      currentImageIndex = 0;
    }
  }

  imgTag.src = imageData[currentImageIndex].src;
  imgTag2.src = imageData[currentImageIndex].src;
}

let izquierdaButton = document.getElementById("izquierda");
izquierdaButton.addEventListener("click", function () {
  switchImage("izquierda");
});

let derechaButton = document.getElementById("derecha");
derechaButton.addEventListener("click", function () {
  switchImage("derecha");
});

// Crear la función para borrar los datos del local storage
function limpiarLista() {
  localStorage.removeItem("imageData");
  let parrafoLimpiar = document.getElementById("parrafoLimpiar");
  let parrafoLista = document.getElementById("parrafoListaReprod");
  // Comprobar si el local storage está vacío
  if (parrafoLista === parrafoLista) {


  } if (document.getElementById("listaReproduccion").getElementsByTagName("li").length > 0) {
    parrafoLimpiar.innerHTML = "Limpiando...";
    parrafoLimpiar.innerHTML = "Todo Limpio";
    setTimeout(function () { location.reload(); }, 1000);
  }
}

document.getElementById("limpiarLista").addEventListener("click", limpiarLista);



// Asociar la función al botón con id limpiarLista
document.getElementById("limpiarLista").addEventListener("click", limpiarLista);

function manageVisor() {
  let visor = document.getElementById("visorGeneral");
  let visorMovible = document.getElementById("visorMovible");
  let maximizarBtn = document.getElementById("maximizar");
  let minimizarBtn = document.getElementById("minimizar");

  maximizarBtn.addEventListener("click", function () {
    visor.classList.remove("minimizarImgVisorGeneral");
    visor.classList.add("imgVisorGeneral");
  });

  minimizarBtn.addEventListener("click", function () {
    visor.classList.add("minimizarImgVisorGeneral");
    visor.classList.remove("imgVisorGeneral");
  });

  visor.addEventListener("mouseover", function () {
    visor.style.cursor = "pointer";
  });

  visorMovible.addEventListener('dblclick', function () {
    visor.classList.remove("minimizarImgVisorGeneral");
    visor.classList.add("imgVisorGeneral");
  });

}

manageVisor()



const visorLittle = document.getElementById("visorGeneral")



visorLittle.onmousedown = function (event) {

  let shiftX = event.clientX - visorLittle.getBoundingClientRect().left;
  let shiftY = event.clientY - visorLittle.getBoundingClientRect().top;

  // visorLittle.style.position = 'absolute';
  visorLittle.classList.add('VisorGeneral');
  // visorLittle.style.zIndex = 1000;
  document.body.append(visorLittle);

  moveAt(event.pageX, event.pageY);

  // mueve la pelota a las coordenadas (pageX, pageY)
  // tomando la posición inicial en cuenta
  function moveAt(pageX, pageY) {
    visorLittle.style.left = pageX - shiftX + 'px';
    visorLittle.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // mueve la pelota con mousemove
  document.addEventListener('mousemove', onMouseMove);

  // suelta la pelota, elimina el manejador innecesario
  visorLittle.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    visorLittle.onmouseup = null;
  };

};

visorLittle.ondragstart = function () {
  return false;
};





window.addEventListener('beforeinstallprompt', (event) => {
  // Save the event as a global letiable
  window.deferredPrompt = event;
  // Unhide the install button
  document.getElementById("cerrar").style.display = "block";
});

let btnInstall = document.getElementById("cerrar")

btnInstall.addEventListener('click', async () => {
  console.log('👍', 'butInstall-clicked');
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Log the result
  const result = await promptEvent.userChoice;
  console.log('👍', 'userChoice', result);
  // Reset the deferred prompt letiable, since
  // prompt() can only be called once.
  window.deferredPrompt = null;
  // Hide the install button.
  divInstall.classList.toggle('hidden', true);
});

