const recognize = async ({ target: { files }  }) => {
    $("#lista").html('');
    $("#loder").show();
    const { data: { text } } = await Tesseract.recognize(files[0], 'eng', {
      corePath: '../../node_modules/tesseract.js-core/tesseract-core.wasm.js',
      // logger: m => console.log(m),
    });
    var re = ",";" ";
    var array = text.split(re);

    //console.log(array)

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
            resultado = resultado.replace("RapidgtT2","Rapidgt2");
            resultado = resultado.replace("Bjx|","Bjxl");
            resultado = resultado.replace("Bjx!","Bjxl");
            resultado = resultado.replace("Bjx","Bjxl");
            resultado = resultado.replace("Tomado3","Tornado3");
            // console.log(resultado);
            $("#lista").append(
            template.replace(/\${nome}/g, resultado))
        }else{

            if(array[obj].match('minutos')){

                const re = /\d{1,}/;

                var myArray = re.exec(array[obj]);
                var tempo = new Number();
                
                tempo=myArray[0];
                startCountdown(tempo*60);
                break;
            }
            break;
        }
    }
}

const elm = document.getElementById('uploader');
elm.addEventListener('change', recognize);

var template = `
    <div class="mt-4 col" id="\${nome}">
        <div class="card h-100">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">\${nome}</h5>
                <button type="button" class="btn-close" aria-label="Close" onclick="$('#\${nome}').hide()"></button>
            </div>
            <div class="image">
                <img src="./img/\${nome}.png" class="card-img-top" alt="\${nome}" style="padding: 5px;border-radius: 10px; align-self: center;">
            </div>
        </div>
    </div>
`;





function startCountdown(tempo){

    // Se o tempo não for zerado
    if((tempo - 1) >= 0){

      // Pega a parte inteira dos minutos
      var min = parseInt(tempo/60);
      // Calcula os segundos restantes
      var seg = tempo%60;

      // Formata o número menor que dez, ex: 08, 07, ...
      if(min < 10){
        min = "0"+min;
        min = min.substr(0, 2);
      }
      if(seg <=9){
        seg = "0"+seg;
      }

      // Cria a variável para formatar no estilo hora/cronômetro
      horaImprimivel = '00:' + min + ':' + seg;
      //JQuery pra setar o valor
      $("#sessao").html(horaImprimivel);

      // diminui o tempo
      tempo--;

      // Define que a função será executada novamente em 1000ms = 1 segundo
      setTimeout('startCountdown('+tempo+')',1000);

      // Quando o contador chegar a zero faz esta ação
    } else {
      console.log("tempo ", tempo);
    }

}


