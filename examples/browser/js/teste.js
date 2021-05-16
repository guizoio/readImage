const recognize = async ({ target: { files }  }) => {
    console.log("chegou aqui")
    $("#lista").html('');
    $("#loder").show();
    const { data: { text } } = await Tesseract.recognize(files[0], 'eng', {
      corePath: '../../node_modules/tesseract.js-core/tesseract-core.wasm.js',
      // logger: m => console.log(m),
    });
    // console.log(text);
    var re = ",";" ";
    var array = text.split(re);
    var resultado = "";
    $("#loder").hide();
    for(obj in array){
        if (!array[obj].match(/a lista*/) || !array[obj].match(/lista*/)) {
            resultado = (
                array[obj]
                .replace("(@","")
                .replace(" ","")
                .replace("‘","")
                .replace("'","")
                .replace('"',"")
                .replace('`',"")
                .replace('´',"")
                .replace("\n","")
                .replace("%20","")
                .replace("@","")
                .replace("Tomado","Tornado")
                .replace("Torado","Tornado")
                .replace("Bjx]","Bjxl")
                .replace("Firetruk","Firetruck")
                .replace("RapidgtGT2","Rapidgt2")
                .replace("Suftan","Sultan")
            )

            resultado = resultado.replace(" ","");
            resultado = resultado.replace("RapidgtGT2","Rapidgt2");
            resultado = resultado.replace("Rapidgt612","Rapidgt2");
            resultado = resultado.replace("Bjx|","Bjxl");
            resultado = resultado.replace("Bjx!","Bjxl");
            resultado = resultado.replace("Tomado3","Tornado3");
            // console.log(resultado);
            $("#lista").append(
            template.replace(/\${nome}/g, resultado))
        }else{
            break;
        }
    }
}



var reader = new FileReader();

reader.onload = function(result) {
    // let img = document.createElement("img");
    // img.src = result.target.result;
    // document.body.appendChild(img);
    $('#uploader').val(result.target.result);
    
}

document.querySelector("input").onpaste = function(event){
  
  let items = event.clipboardData.items;

  for (itemIndex in items) {
      let item = items[itemIndex];

      if (item.kind == 'file') {
        reader.readAsDataURL(item.getAsFile());
      }
  }
}

const elm = document.getElementById('uploader');
elm.addEventListener('keyup', recognize);

var template = `
    <div class="mt-4 col">
        <div class="card h-100">
            <img src="./img/\${nome}.png" class="card-img-top" alt="\${nome}">
            <img src="./img/\${nome}.png" class="card-img-top" alt="\${nome}" style="width: 210px; height: 145px;padding: 5px;border-radius: 10px; align-self: center;">

            <div class="card-body">
                <h5 class="card-title">\${nome}</h5>
                <p class="card-text"></p>
            </div>
        </div>
    </div>
`;