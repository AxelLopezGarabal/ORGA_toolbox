//radial check swap
function swap(a, b){
    document.getElementById(a).checked = false
    document.getElementById(b).checked = true
    if(document.getElementById(1).checked){
        document.getElementById("bit-linea").style.display = "block"
    }
    if(!document.getElementById(1).checked){
        document.getElementById("bit-linea").style.display = "none"
    }
}

function generarTabla(){
    document.getElementById("t_res").style.display = "block"
    const is_direct = document.getElementById(1).checked;
    const text = document.getElementById('dir_mem').value.split(',');
    const tag = parseInt(document.getElementById('bit-tag').value);
    const linea = is_direct? parseInt(document.getElementById('bit-linea').value) : 0;
    const palabra = parseInt(document.getElementById('bit-palabra').value);

    //check if all dirs are of the same length as the sum of tag, linea and palabra
    //check if all dirs are in the same format (hexadecimal or binary)
    //check if the fields are valid (tag, linea, palabra)
    console.log(tag, linea, palabra, text);
    console.log(tag+linea+palabra, text[0].length, text[0].length == tag+linea+palabra);

    let res = [];
    text.forEach(dir => {
        var aux = dir.trim();
        res.push({
            dir: dir,
            tag: aux.substring(0, tag),
            linea: aux.substring(tag, tag+linea),
            palabra: aux.substring(tag+linea, tag+linea+palabra),
            af: "A/F"
        })
    })
    console.log(res);


    var cabecera = document.getElementById("cabecera");
    cabecera.children = [];
    cabecera.innerHTML = "";
    if(is_direct){//llena la cabecera de la tabla para directa
        var row = cabecera.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML = "Dirección de memoria";
        cell2.innerHTML = "Tag";
        cell3.innerHTML = "Línea";
        cell4.innerHTML = "Palabra";
        cell5.innerHTML = "Acieto/Fallo";
        cabecera.appendChild(row);
    
        //llena la tabla con los datos de res
        var tablaBody = document.getElementById("tabla-body");
        tablaBody.children = [];
        tablaBody.innerHTML = "";
        res.forEach(elem => {
            var row = tablaBody.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);

            cell1.innerHTML = elem.dir;
            cell1.style.textAlign = "center";
            cell2.innerHTML = elem.tag;
            cell2.style.textAlign = "center";
            cell3.innerHTML = elem.linea;
            cell3.style.textAlign = "center";
            cell4.innerHTML = elem.palabra;
            cell4.style.textAlign = "center";
            cell5.innerHTML = elem.af;
            cell5.style.textAlign = "center";

            tablaBody.appendChild(row);
        });
    }
    else {
        //crea la cabecera de la tabla para associativa
        var row = cabecera.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerHTML = "Dirección de memoria";
        cell1.style.textAlign = "center";
        cell2.innerHTML = "Tag";
        cell2.style.textAlign = "center";
        cell3.innerHTML = "Palabra";
        cell3.style.textAlign = "center";
        cell4.innerHTML = "Acieto/Fallo";
        cell4.style.textAlign = "center";

        cabecera.appendChild(row);

        //llena la tabla con los datos de res
        var tablaBody = document.getElementById("tabla-body");
        res.forEach(elem => {
            var row = tablaBody.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            cell1.innerHTML = elem.dir;
            cell2.innerHTML = elem.tag;
            cell3.innerHTML = elem.palabra;
            cell4.innerHTML = elem.af;

            tablaBody.appendChild(row);
        });
    }
}
