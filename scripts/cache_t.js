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
function dirrections(text, tag, linea, palabra, is_direct){
    let res = [];
    let cache = {}
    text.forEach(dir => {
        var aux = dir.trim();
        var temp = {
            dir: dir,
            tag: aux.substring(0, tag),
            linea: aux.substring(tag, tag+linea),
            palabra: aux.substring(tag+linea, tag+linea+palabra),
            af: is_direct? checkAFD(aux.substring(0, tag), aux.substring(tag, tag+linea), cache) : checkAFA(aux.substring(0, tag), cache)
        }
        res.push(temp);
    });
    return res;
}
allHexa = (text) => {
    return text.every(dir => {
        var aux = dir.trim().slice(2); //remove 0x
        return '0x' == dir.trim().substring(0, 2) && /^[0-9A-Fa-f]+$/.test(aux);
    });
}
allBin = (text) => {
    return text.every(dir => {
        var aux = dir.trim();
        return /^[01]+$/.test(aux);
    });
}
allSameLength = (text, length) => {
    return text.every(dir => {
        return dir.trim().length == length;
    });
}
hexa2bin = (text) => {
    return text.map(dir => {
        console.log(dir);
        var aux = dir.trim(); //remove 0x
        aux = aux.slice(2);
        var bin = parseInt(aux, 16).toString(2);
        return addCerosL(aux, bin);
    });
}
addCerosL = (dir, bin) => {
    return bin.padStart(dir.trim().length * 4, '0');
}
function generarTabla(){
    let text = document.getElementById('dir_mem').value.split(',');
    //check if all dirs are in the same format (hexadecimal or binary)
    if(!allHexa(text) && !allBin(text)){
        alert("Las direcciones de memoria deben estar en el mismo formato (hexadecimal o binario)");
        clearTable()
        return;
    }
    document.getElementById("t_res").style.display = "block"
    const is_direct = document.getElementById(1).checked;

    const tag = parseInt(document.getElementById('bit-tag').value);
    const linea = is_direct? parseInt(document.getElementById('bit-linea').value) : 0;
    const palabra = parseInt(document.getElementById('bit-palabra').value);
    //check if all dirs are of the same length as the sum of tag, linea and palabra
    allHexa(text) ? text = hexa2bin(text) : null;
    if(!allSameLength(text, tag + linea + palabra)){
        alert(is_direct? "Las direcciones de memoria deben tener la misma longitud que la suma de los bits destinado para tag, línea y palabra" : "Las direcciones de memoria deben tener la misma longitud que la suma de los bits destinado para tag y palabra");
        clearTable();
        return;
    };
    let res = dirrections(text, tag, linea, palabra, is_direct);

    //check if the fields are valid (tag, linea, palabra)

    var cabecera = document.getElementById("cabecera");
    clearTable();
    populateTable(res, cabecera, is_direct);
}
function populateTable(res, cabecera, is_direct){
    if(is_direct){
        cabecera.appendChild(rowHD());
        var tablaBody = document.getElementById("tabla-body");
        res.forEach(elem => {
            tablaBody.appendChild(rowD(elem, tablaBody));
        });
    }
    else {
        cabecera.appendChild(rowHA());
        var tablaBody = document.getElementById("tabla-body");
        res.forEach(elem => {
            tablaBody.appendChild(rowA(elem, tablaBody));
        });
    }
}
function rowHD(){
    var row = cabecera.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        tableHeader(cell1, "Dirección de memoria");
        tableHeader(cell2, "Tag");
        tableHeader(cell3, "Línea");
        tableHeader(cell4, "Palabra");
        tableHeader(cell5, "Acieto/Fallo");
    return row;
}
function rowHA(){
    var row = cabecera.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell4 = row.insertCell(2);
        var cell5 = row.insertCell(3);

        tableHeader(cell1, "Dirección de memoria");
        tableHeader(cell2, "Tag");
        tableHeader(cell4, "Palabra");
        tableHeader(cell5, "Acieto/Fallo");
    return row;
} 
function tableHeader(cell, text){
    cell.innerHTML = text;
    cell.style.textAlign = "center";
}
function rowD(elem, tablaBody){
    var row = tablaBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        tableCell(cell1, elem.dir);
        tableCell(cell2, elem.tag);
        tableCell(cell3, elem.linea);
        tableCell(cell4, elem.palabra);
        tableCellAF(cell5, elem.af);
    return row;
}
function rowA(elem, tablaBody){
    var row = tablaBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell4 = row.insertCell(2);
        var cell5 = row.insertCell(3);

        tableCell(cell1, elem.dir);
        tableCell(cell2, elem.tag);
        tableCell(cell4, elem.palabra);
        tableCellAF(cell5, elem.af);
    return row;
}
function checkAFD(tag, linea, cache){
    if(cache[linea] == undefined){
        cache[linea] = tag;
        return "Fallo";
    }
    else if(cache[linea] == tag){
        return "Acieto";
    }
    else{
        cache[linea] = tag;
        return "Fallo";
    }
}
function checkAFA(tag, cache){
    if(cache[tag] == undefined){
        cache[tag] = true;
        return "Fallo";
    }
    else{
        return "Acieto";
    }
}
function tableCell(cell, text){
    cell.innerHTML = text;
    cell.style.textAlign = "center";
}
function tableCellAF(cell, text){
    cell.innerHTML = text;
    cell.style.textAlign = "center";    
    cell.style.fontWaight = "bold";
    cell.style.padding = "2px 8px";
    cell.style.borderRadius = "4px";
    if(text === 'Acieto'){
        cell.style.color = " #04d361"; 
        cell.style.background =" rgba(4, 211, 97, 0.1)" 
    }
    else {
        cell.style.color = "#f75a68";
        cell.style.background = "rgba(247, 90, 104, 0.1)";
    }

}
function clearTable(){
    var cabecera = document.getElementById("cabecera");
    cabecera.children = [];
    cabecera.innerHTML = "";
    var tablaBody = document.getElementById("tabla-body");
    tablaBody.children = [];
    tablaBody.innerHTML = "";
}