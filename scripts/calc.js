function elem(elemId){
    return document.getElementById(elemId);
  } 
  //radial check swap
  function swap(a, b){
    document.getElementById(a).checked = false
    document.getElementById(b).checked = true
  }

  isEmpty = (list) => list.length == 0;
  //funcion de mapeo
  isAssoc = () => elem("0").checked == true;
  isDir = () => elem("1").checked == true;
  //memoria principal
  nCellIsEmpty = () => elem("nCell").value == 0;
  cellxBloqIsEmpty = () => elem("CellxBloq").value == 0;
  capMemIsEmpty = () => elem("capMemP").value == 0;
  capCellIsEmpty = () => elem("capCell").value == 0;
  //memoria cache
  nLinesIsEmpty = () => elem("nLines").value == 0;
  capLineIsEmpty = () => elem("capLine").value == 0;
  capCacheIsEmpty = () => elem("capMemC").value == 0;

  //calculos
  safeDiv = (x, y) => {
    if (y === 0) throw new Error("División por cero: capC no puede ser 0.");
    const result = x / y;
    if(result % 1 === 0){ return result;}
    else { throw new Error("revisar valores introducidos");
    }
  }
  safeDivP = (capM, unitM, capC, unitC) => {
    const tob = { b: 1, B: 8, Kb: 8192 };
    const toB = { b: 1/8, B: 1, Kb: 1024 };
    
    if (capC === 0) throw new Error("División por cero");
    const capMB = capM * toB[unitM]
    const capCB = capC * toB[unitC]
    const resB = capMB/capCB

    console.log(toB[unitM], toB[unitC], capMB, capCB, resB)
    if(capMB % 1 === 0 && capCB % 1 === 0 && resB % 1 === 0){ return {m: capMB, c:capCB, unit:'B', r:resB};}
    else{
      const capMb = capM * tob[unitM]
      const capCb = capC * tob[unitC]
      const resb = capMb/capCb
      console.log("bits", resb)
      if(capMb % 1 === 0 && capCb % 1 === 0 && resb % 1 === 0){ return {m: capMb, c:capCb, unit:'b', r:resb};}
      else { throw new Error("revisar valores introducidos");}
    }
  }
  //log
  log2 = (val) => Math.log(val) / Math.log(2);

  function resBody(msg, form, apl, concl){
    return {mesaje: msg, formula: form, aplicada:apl, conclucion: concl}
  }
  
  let msgs = {
    tag: "Para calcular el Tag en asociativo es necesario agrupar las celdas en las cantidades especificadas en celdas por bloque",
    tagD: "Es la cantidad de bits destinada a identificar los bloques que tiene asignada esa linea",
    nCell: "Es necesario calcular la cantidad de celdas",
    capL: "Es necesario calcular la cantidad de celdas",
  }

  let form = {
    nCell: "nCell = capMemP / capCell",
    capCell: "capCell = cap de line / cell x blq",
    asscTag: "Tag(nro de blq) = n cell / cell x blq",
    dirTag: "Tag = nro de bloq / n lieas",
    cxb: "cell x blq = cap de line / cap de cell",
    capL: "cap line = cap de cache / n lines = ",
    nBloq: "Nro de blq = n cell / cell x blq",
    nLine: "N lines = cap cache / cap line",
    palabra: "Palabra = cell x blq",
    read: "Dado por el enunciado",
  }
  calcAssocS = (temp) => {//calculo de assoc con toda la info
    if(isEmpty(temp) && checkAssocS()){
      const ncell = elem("nCell").value;
      const cxb = elem("CellxBloq").value;
      const tag = safeDiv(ncell, cxb);
      temp.push(
        resBody("",  form.palabra, " Palabra = cell x bloq = " + cxb + " celdas por bloque", log2(cxb)+" bits para palabra"),
        resBody(msgs.tag, form.asscTag, ""+ncell+" / "+cxb+" = " +tag+" bloques", log2(tag)+" bits para tag")
      );
      return temp;
    }
    else{ return temp;}
  };
  calcAssocP = (temp) => {//calculo de assoc con cellxblq, cap de mem y de cell
    unitM = elem('capMemPeso').value
    unitC = elem('capCellPeso').value
    if(isEmpty(temp) && checkAssocP()){
      const capM = elem('capMemP').value;
      const capC = elem('capCell').value;
      const ncell = safeDivP(capM, unitM, capC, unitC).r;
      const cxb = elem("CellxBloq").value;
      const tag = safeDiv(ncell, cxb)
      temp.push(
        resBody(msgs.nCell, form.nCell, capM+unitM+" / "+capC+unitC+" ", ncell+" celdas de memoria"),
        resBody("", form.palabra, cxb+" celdas por bloque", log2(cxb)+" bits para palabra"),
        resBody(msgs.tag, form.asscTag, ncell+" / "+cxb+" = "+tag, log2(tag)+" bits para tag")
      );
      return temp;
    }
    else{ return temp; }
  };
  calcAssocP2 = (temp) => {//calculo de assoc con cellxblq, cap de mem y de linea
    unitL = elem('capLinePeso').value;
    unitM = elem('capMemPeso').value;
    if(isEmpty(temp) && checkAssocP2()){
      const capM = elem('capMemP').value;
      const capL = elem('capLine').value;
      const cxb = elem("CellxBloq").value;
      const capC = safeDiv(capL, cxb);
      const ncell = safeDivP(capM, unitM, capC, unitL).r;
      const tag = safeDiv(ncell, cxb);
      temp.push(
        resBody(msgs.capL, form.capCell, capL+unitL+ " / "+cxb, capC+unitL+" de capacidad de celda"),
        resBody(msgs.nCell, form.nCell, capM+unitM + " / "+capC+unitL+" = "+ncell, ncell+" celdas de memoria"),
        resBody("", form.palabra, cxb+" celdas por bloque", log2(cxb)+" bits para palabra"),
        resBody(msgs.tag, form.asscTag, ncell+" / "+cxb+" = "+tag, log2(tag)+" bits para tag"),
      );
      return temp;
    }
    else{return temp;}
  };
  calcAssocP3 = (temp) => {//calculo de assoc con cap de cell, de mem y de linea
    unitC = elem('capCellPeso').value;
    unitL = elem('capLinePeso').value;
    unitM = elem('capMemPeso').value;
    if(isEmpty(temp) && checkAssocP3()){
      const capM = elem('capMemP').value;
      const capL = elem('capLine').value;
      const capC = elem('capCell').value;
      const cxb = safeDivP(capL, unitL, capC, unitC).r;
      const ncell = safeDivP(capM, unitM, capC, unitC).r;
      const tag = safeDiv(ncell, cxb);
      temp.push(
        resBody("", form.cxb, capL+unitL+" / "+capC+unitC+" = "+cxb, cxb+" celdas por bloque"),
        resBody(msgs.nCell, form.nCell, capM+unitM + " / "+capC+unitC+" = "+ncell, ncell+" celdas de memoria"),
        resBody("", form.palabra, cxb+" celdas por bloque", log2(cxb)+" bits para palabra"),
        resBody(msgs.tag, form.asscTag, ncell+" / "+cxb+" = "+tag, log2(tag)+" bits para tag"),
      );
      return temp;
    }
    else{return temp;}
  };
  calcAssocP4 = (temp) => {//calculo de assoc con cap de cell, de mem, de la cache y la cantidad de lineas
    unitC = elem('capCellPeso').value;
    unitMC = elem('capCachePeso').value;
    unitM = elem('capMemPeso').value;
    if(isEmpty(temp) && checkAssocP4()){
      const capM = elem('capMemP').value;
      const capC = elem('capCell').value;
      const capCache = elem('capMemC').value;
      const nl = elem('nLines').value;

      const capL = safeDivP(capCache, unitMC, nl, unitMC).r;
      const cxb = safeDivP(capL, unitMC, capC, unitC).r;
      const ncell = safeDivP(capM, unitM, capC, unitC).r;
      const tag = safeDiv(ncell, cxb);
      temp.push(
        resBody("", form.capL, capCache+unitMC+" / "+nl+" = "+capL+unitMC, capL+unitMC+" cap de linea"),
        resBody("", form.cxb, capL+unitL+" / "+capC+unitC+" = "+cxb, cxb+" celdas por bloque"),
        resBody(msgs.nCell, form.nCell, capM+unitM + " / "+capC+unitC+" = "+ncell, ncell+" celdas de memoria"),
        resBody("", form.palabra, cxb+" celdas por bloque", log2(cxb)+" bits para palabra"),
        resBody(msgs.tag, form.asscTag, ncell+" / "+cxb+" = "+tag, log2(tag)+" bits para tag"),
      );
      return temp;
    }
    else{return temp;}
  };
  calcAssocP5 = (temp) => {
    unitC = elem('capCellPeso').value;
    unitMC = elem('capCachePeso').value;
    if(isEmpty(temp) && checkAssocP5()){
      const capC = elem('capCell').value;
      const capCache = elem('capMemC').value;
      const nl = elem('nLines').value;
      const nCell = elem('nCell').value;

      const capL = safeDivP(capCache, unitMC, nl, unitMC).r;
      const cxb = safeDivP(capL, unitMC, capC, unitC).r;
      const tag = safeDiv(nCell, cxb);
      temp.push(
        resBody("", form.capL, capCache+unitMC+" / "+nl+" = "+capL+unitMC, capL+unitMC+" cap de linea"),
        resBody("", form.cxb, capL+unitMC+" / "+capC+unitC+" = "+cxb, cxb+ " celdas por bloque"),
        resBody("", form.palabra, cxb+" celdas por bloque", log2(cxb)+" bits para palabra"),
        resBody(msgs.tag, form.asscTag, nCell+" / "+cxb+" = "+tag, log2(tag)+" bits para tag"),
      );
      return temp;
    }
    else{return temp;}
  };
  calcAssocP6 = (temp) => {//calculo de assoc con cap de cell, de mem y de linea
    unitC = elem('capCellPeso').value;
    unitL = elem('capLinePeso').value;
    if(isEmpty(temp) && checkAssocP6()){
      const capL = elem('capLine').value;
      const capC = elem('capCell').value;
      const cxb = safeDivP(capL, unitL, capC, unitC).r;
      const ncell = elem('nCell').value;
      const tag = safeDiv(ncell, cxb);
      temp.push(
        resBody("", form.cxb, capL+unitMC+" / "+capC+unitC+" = "+cxb, cxb+ " celdas por bloque"),
        resBody("", form.palabra, cxb+" celdas por bloque", log2(cxb)+" bits para palabra"),
        resBody(msgs.tag, form.asscTag, ncell+" / "+cxb+" = "+tag, log2(tag)+" bits para tag"),
      );
      return temp;
    }
    else{return temp;}
  };
  calcDirS = (temp) => {//calculo de directo con toda la info
    if(isEmpty(temp) && checkDirS()){
      const ncell = elem('nCell').value;
      const cxb = elem("CellxBloq").value;
      const nl = elem("nLines").value;
      const nb = ncell / cxb;
      const tag = nb / nl;
      temp.push(
        resBody("", form.palabra, cxb+" celdas por bloque", log2(cxb)+" bits para palabra"),
        resBody("", form.nBloq, ncell+" / "+cxb+" = "+nb, log2(nb)+" bits para bloque"),
        resBody("", form.nLine, nl+"lineas", log2(nl)+" bits para linea"),
        resBody(msgs.tagD, form.dirTag, nb+" / "+nl+" = "+tag, log2(tag)+" bits para el tag")
      );
      return temp;
    }
    else{ return temp;}
  };
  calcDirP = (temp) => {//calculo de directo con la nCell, cxb, cap de cache, de la celda y de linea
    unitC = elem('capCachePeso').value;
    unitL = elem('capLinePeso').value;
    if(isEmpty(temp) && checkDirP()){
      const capC = elem('capMemC').value
      const capL = elem('capLine').value
      const nl = safeDivP(capC, unitC, capL, unitL).r;
      const ncell = elem('nCell').value;
      const cxb = elem("CellxBloq").value;
      const nb = safeDiv(ncell, cxb);
      const tag = safeDiv(nb, nl);
      temp.push(
        resBody("", form.palabra, cxb+" celdas por bloque", log2(cxb)+" bits para palabra"),
        resBody("", form.nBloq, ncell+" / "+cxb+" = "+nb, log2(nb)+" bits para bloque"),
        resBody("", form.nLine, capC+unitC+" / "+capL+unitL+" = "+nl+" lineas", log2(nl)+" bits para linea"),
        resBody(msgs.tagD, form.dirTag, nb+" / "+nl+" = "+tag, log2(tag)+" bits para el tag"),
      );
      return temp;
    }
    else{ return temp;}
  };
  calcDirP2 = (temp) => {//calculo de directo con cap de cell y de cache
    unitCell = elem('capCellPeso').value;
    unitC = elem('capCachePeso').value
    if(isEmpty(temp) && checkDirP2()){
      const capCell = elem('capCell').value;
      const capC = elem('capMemC').value;
      const cxb = elem("CellxBloq").value;
      const capL = capCell * cxb;
      const nl = safeDivP(capC, unitC, capL, unitCell).r;
      const ncell = elem('nCell').value;
      const nb = safeDiv(ncell, cxb);ncell / cxb;
      const tag = safeDiv(nb, nl);
      temp.push(
        resBody("", form.capL, capCell+unitCell+" * "+cxb, capL+unitC+" cap de linea"),
        resBody("", form.palabra, cxb+" celdas por bloque", log2(cxb)+" bits para palabra"),
        resBody("", form.nBloq, ncell+" / "+cxb+" = "+nb, log2(nb)+" bits para bloque"),
        resBody("", form.nLine, capC+unitC+" / "+capL+unitL+" = "+nl+" lineas", log2(nl)+" bits para linea"),
        resBody(msgs.tagD, form.dirTag, nb+" / "+nl+" = "+tag, log2(tag)+" bits para el tag"),
      );
      return temp;
    }
    else{ return temp;}
  };
  calcDirP3 = (temp) => {//calculo de directo con cap de mem, cell y cache
    unitM = elem('capMemPeso').value;
    unitCell = elem('capCellPeso').value
    unitC = elem('capCachePeso').value
    if(isEmpty(temp) && checkDirP3()){
      const capCell = elem('capCell').value;
      const capC = elem('capMemC').value;
      const cxb = elem("CellxBloq").value;
      const capM = elem("capMemP").value;
      const capL = capCell * cxb;
      const nl = safeDivP(capC, unitC, capL, unitCell).r;
      const ncell = safeDivP(capM, unitM, capCell, unitCell).r;
      const nb = safeDiv(ncell, cxb);
      const tag = safeDiv(nb, nl);
      temp.push(
        resBody("", form.nCell, capM+unitM+" / "+capCell+unitCell, ncell+" celdas de memoria"),
        resBody("", form.capL, capCell+unitCell+" * "+cxb, capL+"cap de linea"),
        resBody("", form.palabra,cxb+" celdas por bloque", log2(cxb)+" bits para palabra"),
        resBody("", form.nBloq, ncell+" / "+cxb+" = "+nb, log2(nb)+" bits para bloque"),
        resBody("", form.nLine, capC+unitC+" / "+capL+unitL+" = "+nl, log2(nl)+" bits para linea"),
        resBody(msgs.tagD, form.dirTag, nb+" / "+nl+" = "+tag, log2(tag)+" bits para el tag"),
      );
      return temp;
    }
    else{ return temp;}
  };
  //check de errores
  function checkAssocS(){
      return isAssoc() && !nCellIsEmpty() && !cellxBloqIsEmpty();
  }
  function checkAssocP(){
      return isAssoc() && 
          !capMemIsEmpty() && 
          !cellxBloqIsEmpty() && 
          !capCellIsEmpty();
  }
  function checkAssocP2(){
    return isAssoc() && 
      !capMemIsEmpty() && 
      !cellxBloqIsEmpty() && 
      //con la cap de una linea
      !capLineIsEmpty();
  }
  function checkAssocP3(){
    return isAssoc() && 
      !capMemIsEmpty() && 
      !capCellIsEmpty() &&
      !capLineIsEmpty()
  }
  function checkAssocP4(){
    return isAssoc() && 
      !capMemIsEmpty() &&
      !capCellIsEmpty() &&
      !capCacheIsEmpty() &&
      !nLinesIsEmpty();
  }
  function checkAssocP5(){
    return isAssoc() && 
      !capCellIsEmpty() &&
      !capCacheIsEmpty() &&
      !nLinesIsEmpty() &&
      !nCellIsEmpty();
  }
  function checkAssocP6(){
    return isAssoc() &&
      !capCellIsEmpty() &&
      !capLineIsEmpty() &&
      !nCellIsEmpty();
  }
  function checkDirS(){
      return isDir() && !nCellIsEmpty() && !cellxBloqIsEmpty() && !nLinesIsEmpty();
  }
  function checkDirP(){
      return isDir() && 
          !nCellIsEmpty() &&
          !cellxBloqIsEmpty() && 
          !capCacheIsEmpty() && 
          //tengo la cap de una linea
          !capLineIsEmpty(); 
  }
  function checkDirP2(){
      return isDir() && 
          !nCellIsEmpty() &&
          !cellxBloqIsEmpty() && 
          !capCacheIsEmpty() && 
          //tengo la cap de una celda
          !capCellIsEmpty(); 
  }
  function checkDirP3(){
      return isDir() && 
          //cap de mem en lugar de las n cell
          !capMemIsEmpty() &&
          !cellxBloqIsEmpty() && 
          !capCacheIsEmpty() && 
          //tengo la cap de una celda
          !capCellIsEmpty(); 
  }

  function calculate(){
    var list = elem('resList');
    list.innerHTML = "";
    if (!elem('miTarjeta').classList.contains('activo')){
      elem('miTarjeta').classList.toggle('activo')
    }
    try {
      answer = [];
      answer = calcAssocP6(calcAssocP5(calcAssocP4(calcAssocP3(calcAssocP2(calcAssocP(calcAssocS(answer)))))));
      answer = calcDirP3(calcDirP2(calcDirP(calcDirS(answer))));
      console.log(answer)
      if(answer.length == 0) { throw new Error("faltan datos para resolver");}
      else{
        answer.forEach(e=> {
          temp = document.createElement('li');
          temp.innerHTML = `
            <div class="formula">`+e.formula+`</div>
            <div class="formula">`+e.aplicada+`</div>
            <div class="resultado">`+e.conclucion+`</div>
          `;
          list.appendChild(temp);
  
        });
      }
    } catch (error) {
      console.log(error);
      temp = document.createElement('li');temp.textContent = error;list.appendChild(temp);
    }
  }