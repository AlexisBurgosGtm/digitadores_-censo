let funciones = {
    GetDataNit: async (idNit,idCliente,idDireccion)=>{

      return new Promise((resolve, reject) => {
        let nit = document.getElementById(idNit).value;                    
        let url = 'https://free.feel.com.gt/api/v1/obtener_contribuyente';
        
        axios.post(url,{nit: nit})
        .then((response) => {
            let json = response.data;
            console.log(response.data);
            
            //document.getElementById(idCliente).value = json.descripcion;
            //document.getElementById(idDireccion).value = json.direcciones.direccion;    

            resolve(json);
        }, (error) => {
            console.log(error);
            reject();
        });
  


      });

    },
    GetDataNIS: async (NIS,idTxtPropietario,idTxtDireccion)=>{

      return new Promise((resolve, reject) => {
        
        let url = 'https://oficinavirtual.energuate.com/mifactura/GetHistorial?nisrad=' + NIS;
        
        axios.get(url)
        .then((response) => {
            let json = response.data.dataPersonBill;
            //console.log(response.data.dataPersonBill);
            
            //document.getElementById(idTxtPropietario).value = json.TITULAR_SERVICIO;
            //document.getElementById(idTxtDireccion).value = json.DIRECCION_SERVICIO;    
  
            resolve(json);
        }, (error) => {
            console.log(error);
            reject(error);
        });
  
  
  
      });

    },
    instalationHandlers: (idBtnInstall)=>{
      //INSTALACION APP
      let btnInstalarApp = document.getElementById(idBtnInstall);
      btnInstalarApp.hidden = true;

      let capturedInstallEvent;
      window.addEventListener('beforeinstallprompt',(e)=>{
        e.preventDefault();
        btnInstalarApp.hidden = false;
        capturedInstallEvent = e;
      });
      btnInstalarApp.addEventListener('click',(e)=>{
        capturedInstallEvent.prompt();
      capturedInstallEvent.userChoice.then((choice)=>{
          //solicita al usuario confirmacion para instalar
      })
    })
    //INSTALACION APP
    },
    Confirmacion: function(msn){
        return swal({
            title: 'Confirme',
            text: msn,
            icon: 'warning',
            buttons: {
                cancel: true,
                confirm: true,
              }})
    },
    Aviso: function(msn){
        swal(msn, {
            timer: 1500,
            icon: "success",
            buttons: false
            });

        try {
            navigator.vibrate(500);
        } catch (error) {
            
        }
    },
    AvisoError: function(msn){
        swal(msn, {
            timer: 1500,
            icon: "error",
            buttons: false
            });
        try {
            navigator.vibrate([100,200,500]);
        } catch (error) {
            
        }
    },
    FiltrarListaProductos: function(idTabla){
        swal({
          text: 'Escriba para buscar...',
          content: "input",
          button: {
            text: "Buscar",
            closeModal: true,
          },
        })
        .then(name => {
          if (!name) throw null;
            funciones.FiltrarTabla(idTabla,name);

            //'tblProductosVentas'
        })
    },
    setMoneda: function(num,signo) {
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num)) num = "0";
        let sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        let cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10) cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + signo + ' ' + num + ((cents == "00") ? '' : '.' + cents)).toString();
    },
    setMargen: function(num,signo) {
      num = num.toString().replace(/\$|\,/g, '');
      if (isNaN(num)) num = "0";
      let sign = (num == (num = Math.abs(num)));
      num = Math.floor(num * 100 + 0.50000000001);
      let cents = num % 100;
      num = Math.floor(num / 100).toString();
      if (cents < 10) cents = "0" + cents;
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
          num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
      return ( ((sign) ? '' : '-') +  num + ((cents == "00") ? '' : '.' + cents) + ' ' + signo  ).toString();
    },
    loadScript: function(url, idContainer) {
        return new Promise((resolve, reject) => {
          var script = document.createElement('script');
          script.src = url;
    
          script.onload = resolve;
          script.onerror = reject;
             
          document.getElementById(idContainer).appendChild(script)
        });
    },
    loadCss: function(url, idContainer) {
        return new Promise((resolve, reject) => {
          var link = document.createElement('link');
          //script.async = true;
          link.href = url;
          link.rel = "stylesheet"
    
          link.onload = resolve;
          link.onerror = reject;
             
          document.getElementById(idContainer).appendChild(link)
        });
    },
    fetchData: (url)=>{
        fetch(url)
            .then(function(response) {
                return response.json();
                                    })
            .catch();
    },
    loadView: (url, idContainer)=> {
        return new Promise((resolve, reject) => {
            
            let contenedor = document.getElementById(idContainer);

            axios.get(url)
            .then((response) => {
                contenedor.innerHTML ='';
                contenedor.innerHTML = response.data;
                resolve();
            }, (error) => {
                console.log(error);
                reject();
            });
      
          });
    },   
    hablar: function(msn){
        var utterance = new SpeechSynthesisUtterance(msn);
        return window.speechSynthesis.speak(utterance); 
    },
    CompaniaTelefono: function(numero,hablado){
        var rangos = [[30000000,32289999,"TIGO"],
        [32290000,32299999,"CLARO"],
        [32300000,33099999,"TIGO"],
        [34000000,34499999,"MOVISTAR"],
        [40000000,40999999,"TIGO"],
        [41000000,42999999,"CLARO"],
        [43000000,44759999,"MOVISTAR"],
        [44760000,46999999,"TIGO"],
        [47000000,47729999,"CLARO"],
        [47730000,48199999,"TIGO"],
        [48200000,48219999,"UNITEL"],
        [48220000,50099999,"TIGO"],
        [50100000,50199999,"CLARO"],
        [50200000,50299999,"MOVISTAR"],
        [50300000,50699999,"TIGO"],
        [50700000,51099999,"MOVISTAR"],
        [51100000,51399999,"CLARO"],
        [51400000,51499999,"MOVISTAR"],
        [51500000,51999999,"TIGO"],
        [52000000,52099999,"TIGO"],
        [52100000,52999999,"MOVISTAR"],
        [53000000,53099999,"TIGO"],
        [53100000,53119999,"CLARO"],
        [53120000,53139999,"MOVISTAR"],
        [53140000,53899999,"TIGO"],
        [53900000,54099999,"MOVISTAR"],
        [54100000,54999999,"CLARO"],
        [55000000,55099999,"MOVISTAR"],
        [55100000,55179999,"CLARO"],
        [55180000,55199999,"MOVISTAR"],
        [55210000,55299999,"TIGO"],
        [55310000,55399999,"CLARO"],
        [55400000,55429999,"MOVISTAR"],
        [55430000,55449999,"CLARO"],
        [55450000,55499999,"MOVISTAR"],
        [55500000,55539999,"TIGO"],
        [55540000,55799999,"CLARO"],
        [55800000,55819999,"TIGO"],
        [55820000,55999999,"CLARO"],
        [56000000,56089999,"MOVISTAR"],
        [56100000,56399999,"CLARO"],
        [56400000,56899999,"MOVISTAR"],
        [56900000,56999999,"CLARO"],
        [57000000,57099999,"TIGO"],
        [57100000,57189999,"CLARO"],
        [57190000,57899999,"TIGO"],
        [57900000,57999999,"MOVISTAR"],
        [58000000,58099999,"TIGO"],
        [58100000,58189999,"CLARO"],
        [58190000,58199999,"TIGO"],
        [58200000,58799999,"CLARO"],
        [58800000,59099999,"TIGO"],
        [59100000,59149999,"CLARO"],
        [59150000,59179999,"MOVISTAR"],
        [59180000,59199999,"TIGO"],
        [59200000,59899999,"CLARO"],
        [59900000,59999999,"TIGO"]],

    lengthRangos = rangos.length;

    var num = numero;
    let len = num.length; 
    let nnum = parseInt(num,10);
    let found;

    if (len == 8 ) {
    for (var i = lengthRangos - 1; i >= 0; i--) {
    if (rangos[i][0] <= nnum && nnum <= rangos[i][1]) {
        if (hablado=='SI'){     
            funciones.hablar("Su l??nea telef??nica es " + rangos[i][2]);
        }else{
            return rangos[i][2];
        }
        found = true;
    }
    };

    if (!found) {
    if (hablado=='SI'){ 
        funciones.hablar("El n??mero indicado no aparece en la lista");
    }else{
        return "No Disponible";
    }
    }

    } else {
    return "Ingrese 8 d??gitos";
    }
    },
    crearBusquedaTabla: function(idTabla,idBusqueda){
    var tableReg = document.getElementById(idTabla);
    var searchText = document.getElementById(idBusqueda).value.toLowerCase();
      var cellsOfRow="";
      var found=false;
      var compareWith="";
   
      // Recorremos todas las filas con contenido de la tabla
        for (var i = 1; i < tableReg.rows.length; i++)
                {
                  cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
                    found = false;
                    // Recorremos todas las celdas
                    for (var j = 0; j < cellsOfRow.length && !found; j++)
                    {
                      compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                      // Buscamos el texto en el contenido de la celda
                      if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
                      {
                          found = true;
                      }
                  }
                  if(found)
                  {
                      tableReg.rows[i].style.display = '';
                  } else {
                      // si no ha encontrado ninguna coincidencia, esconde la
                      // fila de la tabla
                      tableReg.rows[i].style.display = 'none';
                  }
              }
    },
    FiltrarTabla: function(idTabla,idfiltro){
    var tableReg = document.getElementById(idTabla);
    let filtro = document.getElementById(idfiltro).value;

    var searchText = filtro.toLowerCase();
      var cellsOfRow="";
      var found=false;
      var compareWith="";
   
      // Recorremos todas las filas con contenido de la tabla
        for (var i = 1; i < tableReg.rows.length; i++)
                {
                  cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
                    found = false;
                    // Recorremos todas las celdas
                    for (var j = 0; j < cellsOfRow.length && !found; j++)
                    {
                      compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                      // Buscamos el texto en el contenido de la celda
                      if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
                      {
                          found = true;
                      }
                  }
                  if(found)
                  {
                      tableReg.rows[i].style.display = '';
                  } else {
                      // si no ha encontrado ninguna coincidencia, esconde la
                      // fila de la tabla
                      tableReg.rows[i].style.display = 'none';
                  }
              }
        //funciones.scrollUp(1000, 'easing');
    },
    OcultarRows: function(idTabla){
    var tableReg = document.getElementById(idTabla);
        // Recorremos todas las filas con contenido de la tabla
        for (var i = 1; i < tableReg.rows.length; i++)
        {
            if(i>15){
                tableReg.rows[i].style.display = 'none';
            }
        }
    },
    PingInternet: async (url)=>{
    var peticion = new Request(url, {
        method: 'POST',
        headers: new Headers({
            // Encabezados
           'Content-Type': 'application/json'
        })
      });

      await fetch(peticion)
         .then(function(res) {
           if (res.status==200)
               {
                   funciones.hablar('parece que ya hay internet');
                }
      })
      .catch(
          ()=>{
            funciones.hablar('por lo visto no hay se??al');
          }
      )
    },
    NotificacionPersistent : (titulo,msn)=>{

    function InicializarServiceWorkerNotif(){
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () =>
       navigator.serviceWorker.register('sw.js')
        .then(registration => console.log('Service Worker registered'))
        .catch(err => 'SW registration failed'));
      };
      
      requestPermission();
    }
    
    if ('Notification' in window) {};
    
    function requestPermission() {
      if (!('Notification' in window)) {
        alert('Notification API not supported!');
        return;
      }
      
      Notification.requestPermission(function (result) {
        //$status.innerText = result;
      });
    }

    InicializarServiceWorkerNotif();
    
    const options = {
        body : titulo,
        icon: "../favicon.png",
        vibrate: [1,2,3],
      }
      //image: "../favicon.png",
         if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
          console.log('Persistent Notification API not supported!');
          return;
        }
        
        try {
          navigator.serviceWorker.getRegistration()
            .then(reg => 
                    reg.showNotification(msn, options)
                )
            .catch(err => console.log('Service Worker registration error: ' + err));
        } catch (err) {
          console.log('Notification API error: ' + err);
        }
      
    },
    ObtenerUbicacion: async(idlat,idlong)=>{
        let lat = document.getElementById(idlat);
        let long = document.getElementById(idlong);
        
        try {
            navigator.geolocation.getCurrentPosition(function (location) {
                lat.innerText = location.coords.latitude.toString();
                long.innerText = location.coords.longitude.toString();
            })
        } catch (error) {
            funciones.AvisoError(error.toString());
        }
    },
    ComboSemana :(letnum)=>{
      let str = '';
      if(letnum=="LETRAS"){
        str =  `<option value="LUNES">LUNES</option>
                <option value="MARTES">MARTES</option>
                <option value="MIERCOLES">MIERCOLES</option>
                <option value="JUEVES">JUEVES</option>
                <option value="VIERNES">VIERNES</option>
                <option value="SABADO">SABADO</option>
                <option value="DOMINGO">DOMINGO</option>
                <option value="OTROS">OTROS</option>
                `
      }else{
        str =  `<option value="1">LUNES</option>
                <option value="2">MARTES</option>
                <option value="3">MIERCOLES</option>
                <option value="4">JUEVES</option>
                <option value="5">VIERNES</option>
                <option value="6">SABADO</option>
                <option value="7">DOMINGO</option>
                <option value="0">OTROS</option>
                `
      };

      return str;
      
    },
    getDiaSemana:(numdia)=>{
      switch (numdia) {
        case 0:
          return 'DOMINGO';
          break;
        case 1:
          return 'LUNES';
          break;
        case 2:
          return 'MARTES';
          break;
        case 3:
          return 'MIERCOLES';
          break;
        case 4:
          return 'JUEVES';
          break;
        case 5:
          return 'VIERNES';
          break;
        case 6:
          return 'SABADO';
          break;
      
        default:
          break;
      }
    },
    ComboMeses: ()=>{
    let str =`<option value='1'>Enero</option>
              <option value='2'>Febrero</option>
              <option value='3'>Marzo</option>
              <option value='4'>Abril</option>
              <option value='5'>Mayo</option>
              <option value='6'>Junio</option>
              <option value='7'>Julio</option>
              <option value='8'>Agosto</option>
              <option value='9'>Septiembre</option>
              <option value='10'>Octubre</option>
              <option value='11'>Noviembre</option>
              <option value='12'>Diciembre</option>`
    return str;
    },
    ComboAnio: ()=>{
    let str =`<option value='2017'>2017</option>
              <option value='2018'>2018</option>
              <option value='2019'>2019</option>
              <option value='2020'>2020</option>
              <option value='2021'>2021</option>
              <option value='2022'>2022</option>
              <option value='2023'>2023</option>
              <option value='2024'>2024</option>
              <option value='2025'>2025</option>
              <option value='2026'>2026</option>
              <option value='2027'>2027</option>
              <option value='2028'>2028</option>
              <option value='2029'>2029</option>
              <option value='2030'>2030</option>`
    return str;
    },
    getFecha(){
      let fecha
      let f = new Date(); 
      let d = f.getDate(); 
      let m = f.getUTCMonth()+1; 

      switch (d.toString()) {
        case '30':
          m = f.getMonth()+1; 
          break;
        case '31':
          m = f.getMonth()+1; 
            break;
      
        default:

          break;
      }

      
      let y = f.getFullYear();
     
      di = d;
      var D = '0' + di;
      let DDI 
      if(D.length==3){DDI=di}else{DDI=D}
      
      ma = m;
      var MA = '0' + ma;
      let DDM 
      if(MA.length==3){DDM=ma}else{DDM=MA}


      fecha = y + '-' + DDM + '-' + DDI;
      return fecha;
    },
    quitarCaracteres: ( texto, reemplazarQue, reemplazarCon, ignorarMayMin) =>{
      var reemplazarQue = reemplazarQue.replace(/[\\^$.|?*+()[{]/g, "\\$&"),
      reemplazarCon = reemplazarCon.replace(/\$(?=[$&`"'\d])/g, "$$$$"),
      modif = "g" + (ignorarMayMin ? "i" : ""),
      regex = new RegExp(reemplazarQue, modif);
      return texto.replace(regex,reemplazarCon);
    },
    devuelveFecha: (idInputFecha)=>{
      let fe = new Date(document.getElementById(idInputFecha).value);
      let ae = fe.getFullYear();
      let me = fe.getUTCMonth()+1;
      let de = fe.getUTCDate() 
      let fret = ae + '-' + me + '-' + de;
      return fret;
    },
    getComboMunicipios:(idcontainer)=>{
      let container = document.getElementById(idcontainer);
      let str = `
        <option value="2">Guatemala</option>
        <option value="3">Pochuta</option>
        <option value="4">Patzicia</option>
        <option value="5">Santa Cruz Balany??</option>
        <option value="6">Acatenango</option>
        <option value="7">Yepocapa</option>
        <option value="8">San Andr??s Iztapa</option>
        <option value="9">Parramos</option>
        <option value="10">Zaragoza</option>
        <option value="11">El Tejar</option>
        <option value="12">Escuintla</option>
        <option value="13">Santa Luc??a Cotzumalguapa</option>
        <option value="14">La Democracia</option>
        <option value="15">Siquinal??</option>
        <option value="16">Masagua</option>
        <option value="17">Tiquisate</option>
        <option value="18">La Gomera</option>
        <option value="19">Guanagazapa</option>
        <option value="20">San Jos??</option>
        <option value="21">Iztapa</option>
        <option value="22">Pal??n</option>
        <option value="23">San Vicente Pacaya</option>
        <option value="24">Nueva Concepci??n</option>
        <option value="25">Cuilapa</option>
        <option value="26">Barberena</option>
        <option value="27">Santa Rosa de Lima</option>
        <option value="28">Casillas</option>
        <option value="29">San Rafael Las Flores</option>
        <option value="30">Oratorio</option>
        <option value="31">San Juan Tecuaco</option>
        <option value="32">Chiquimulilla</option>
        <option value="33">Taxisco</option>
        <option value="34">Santa Mar??a Ixhuat??n</option>
        <option value="35">Guazacap??n</option>
        <option value="36">Santa Cruz Naranjo</option>
        <option value="37">Pueblo Nuevo Vi??as</option>
        <option value="38">Nueva Santa Rosa</option>
        <option value="39">Solol??</option>
        <option value="40">San Jos?? Chacay??</option>
        <option value="41">Santa Mar??a Visitaci??n</option>
        <option value="42">Santa Luc??a Utatl??n</option>
        <option value="43">Nahual??</option>
        <option value="44">Santa Catarina Ixtahuac??n</option>
        <option value="45">Santa Clara La Laguna</option>
        <option value="46">Concepci??n</option>
        <option value="47">San Andr??s Semetabaj</option>
        <option value="48">Panajachel</option>
        <option value="49">Santa Catarina Palop??</option>
        <option value="50">San Antonio Palop??</option>
        <option value="51">San Lucas Tolim??n</option>
        <option value="52">Samayac</option>
        <option value="53">San Pablo Jocopilas</option>
        <option value="54">San Antonio Suchitep??quez</option>
        <option value="55">San Miguel Pan??n</option>
        <option value="56">San Gabriel</option>
        <option value="57">Chicacao</option>
        <option value="58">Patulul</option>
        <option value="59">Santa B??rbara</option>
        <option value="60">San Juan Bautista</option>
        <option value="61">Santo Tom??s La Uni??n</option>
        <option value="62">Zunilito</option>
        <option value="63">Pueblo Nuevo</option>
        <option value="64">R??o Bravo</option>
        <option value="65">Retalhuleu</option>
        <option value="66">San Sebasti??n</option>
        <option value="67">Santa Cruz Mulu??</option>
        <option value="68">San Mart??n Zapotitl??n</option>
        <option value="69">San Felipe Retalhuleu</option>
        <option value="70">San Andr??s Villa Seca</option>
        <option value="71">Champerico</option>
        <option value="72">Nuevo San Carlos</option>
        <option value="73">El Asintal</option>
        <option value="74">San Marcos</option>
        <option value="75">San Pedro Sacatep??quez</option>
        <option value="76">San Antonio Sacatep??quez</option>
        <option value="77">Comitancillo</option>
        <option value="78">San Miguel Ixtahuac??n</option>
        <option value="79">Concepci??n Tutuapa</option>
        <option value="80">Tacan??</option>
        <option value="81">Sibinal</option>
        <option value="82">Tajumulco</option>
        <option value="83">Tejutla</option>
        <option value="84">San Rafael Pie de la Cuesta</option>
        <option value="85">Nuevo Progreso</option>
        <option value="86">El Tumbador</option>
        <option value="87">El Rodeo</option>
        <option value="88">Malacat??n</option>
        <option value="89">Catarina</option>
        <option value="90">Ayutla</option>
        <option value="91">Oc??s</option>
        <option value="92">San Pablo</option>
        <option value="93">El Quetzal</option>
        <option value="94">La Reforma</option>
        <option value="95">Pajapita</option>
        <option value="96">Ixchigu??n</option>
        <option value="97">San Jos?? Ojetenam</option>
        <option value="98">San Crist??bal Cucho</option>
        <option value="99">Sipacapa</option>
        <option value="100">Esquipulas Palo Gordo</option>
        <option value="101">R??o Blanco</option>
        <option value="102">San Lorenzo</option>
        <option value="103">Huehuetenango</option>
        <option value="104">Chiantla</option>
        <option value="105">Malacatancito</option>
        <option value="106">Cuilco</option>
        <option value="107">Nent??n</option>
        <option value="108">San Pedro Necta</option>
        <option value="109">Jacaltenango</option>
        <option value="110">Soloma</option>
        <option value="111">San Idelfonso Ixtahuac??n</option>
        <option value="112">Santa B??rbara</option>
        <option value="113">La Libertad</option>
        <option value="114">La Democracia</option>
        <option value="115">San Miguel Acat??n</option>
        <option value="116">San Rafael La Indepencia</option>
        <option value="117">Todos Santos Cuchumat??n</option>
        <option value="118">San Juan Atit??n</option>
        <option value="119">Santa Eulalia</option>
        <option value="120">San Mateo Ixtat??n</option>
        <option value="121">Colotenango</option>
        <option value="122">San Sebasti??n Huehuetenango</option>
        <option value="123">Tectit??n</option>
        <option value="124">Concepci??n Huista</option>
        <option value="125">San Juan Ixcoy</option>
        <option value="126">San Antonio Huista</option>
        <option value="127">San Sebasti??n Coat??n</option>
        <option value="128">Barillas</option>
        <option value="129">Aguacat??n</option>
        <option value="130">San Rafael P??tzal</option>
        <option value="131">San Gaspar Ixchil</option>
        <option value="132">Santiago Chimaltenango</option>
        <option value="133">Santa Ana Huista</option>
        <option value="134">Santa Cruz del Quich??</option>
        <option value="135">Chich??</option>
        <option value="136">Chinique</option>
        <option value="137">Zacualpa</option>
        <option value="138">Chajul</option>
        <option value="139">Chichicastenango</option>
        <option value="140">Patzit??</option>
        <option value="141">San Antonio Ilotenango</option>
        <option value="142">San Pedro Jocopilas</option>
        <option value="143">Cun??n</option>
        <option value="144">San Juan Cotzal</option>
        <option value="145">Joyabaj</option>
        <option value="146">Nebaj</option>
        <option value="147">San Andr??s Sajcabaj??</option>
        <option value="148">Uspant??n</option>
        <option value="149">Sacapulas</option>
        <option value="150">San Bartolom?? Jocotenango</option>
        <option value="151">Canill??</option>
        <option value="152">Chicam??n</option>
        <option value="153">Playa Grande -Ixc??n</option>
        <option value="154">Pachalum</option>
        <option value="155">Salam??</option>
        <option value="156">San Miguel Chicaj</option>
        <option value="157">Rabinal</option>
        <option value="158">Cubulco</option>
        <option value="159">Granados</option>
        <option value="160">El Chol</option>
        <option value="161">San Jer??nimo</option>
        <option value="162">Purulh??</option>
        <option value="163">Cob??n</option>
        <option value="164">Santa Cruz Verapaz</option>
        <option value="165">San Crist??bal Verapaz</option>
        <option value="166">Tactic</option>
        <option value="167">Tamah??</option>
        <option value="168">Tucur??</option>
        <option value="169">Panz??s</option>
        <option value="170">Senah??</option>
        <option value="171">San Pedro Carch??</option>
        <option value="172">San Juan Chamelco</option>
        <option value="173">Lanqu??n</option>
        <option value="174">Cahab??n</option>
        <option value="175">Chisec</option>
        <option value="176">Chahal</option>
        <option value="177">Fray Bartolom?? de las Casas</option>
        <option value="178">La Tinta</option>
        <option value="179">Flores</option>
        <option value="180">San Jos??</option>
        <option value="181">San Benito</option>
        <option value="182">San Andr??s</option>
        <option value="183">La Libertad</option>
        <option value="184">San Francisco</option>
        <option value="185">Santa Ana</option>
        <option value="186">Dolores</option>
        <option value="187">San Luis</option>
        <option value="188">Sayaxch??</option>
        <option value="189">Melchor de Mencos</option>
        <option value="190">Popt??n</option>
        <option value="191">Puerto Barrios</option>
        <option value="192">Livingston</option>
        <option value="193">El Estor</option>
        <option value="194">Morales</option>
        <option value="195">Los Amates</option>
        <option value="196">Zacapa</option>
        <option value="197">Estanzuela</option>
        <option value="198">R??o Hondo</option>
        <option value="199">Gual??n</option>
        <option value="200">Teculut??n</option>
        <option value="201">Usumatl??n</option>
        <option value="202">Caba??as</option>
        <option value="203">San Diego</option>
        <option value="204">La Uni??n</option>
        <option value="205">Huit??</option>
        <option value="206">Chiquimula</option>
        <option value="207">San Jos?? La Arada</option>
        <option value="208">San Juan Ermita</option>
        <option value="209">Jocot??n</option>
        <option value="210">Camot??n</option>
        <option value="211">Olopa</option>
        <option value="212">Esquipulas</option>
        <option value="213">Concepci??n Las Minas</option>
        <option value="214">Quetzaltepeque</option>
        <option value="215">San Jacinto</option>
        <option value="216">Ipala</option>
        <option value="217">Jalapa</option>
        <option value="218">San Pedro Pinula</option>
        <option value="219">San Luis Jilotepeque</option>
        <option value="220">San Manuel Chaparr??n</option>
        <option value="221">San Carlos Alzatate</option>
        <option value="222">Monjas</option>
        <option value="223">Mataquescuintla</option>
        <option value="224">Jutiapa</option>
        <option value="225">El Progreso</option>
        <option value="226">Santa Catarina Mita</option>
        <option value="227">Agua Blanca</option>
        <option value="228">Asunci??n Mita</option>
        <option value="229">Yupiltepeque</option>
        <option value="230">Atescatempa</option>
        <option value="231">Jerez</option>
        <option value="232">El Adelanto</option>
        <option value="233">Zapotitl??n</option>
        <option value="234">Comapa</option>
        <option value="235">Jalpatagua</option>
        <option value="236">Conguaco</option>
        <option value="237">Moyuta</option>
        <option value="238">Pasaco</option>
        <option value="239">San Jos?? Acatempa</option>
        <option value="240">Quesada</option>
        <option value="241">Patz??n</option>
        <option value="242">Santa Catarina Pinula</option>
        <option value="243">San Jos?? Pinula</option>
        <option value="244">San Jos?? del Golfo</option>
        <option value="245">Palencia</option>
        <option value="246">Chinautla</option>
        <option value="247">San Pedro Ayampuc</option>
        <option value="248">Mixco</option>
        <option value="249">San Pedro Sacatep??quez</option>
        <option value="250">San Juan Sacat??pequez</option>
        <option value="251">San Raymundo</option>
        <option value="252">Chuarrancho</option>
        <option value="253">Fraijanes</option>
        <option value="254">Amatitl??n</option>
        <option value="255">Villa Nueva</option>
        <option value="256">Villa Canales</option>
        <option value="257">Petapa</option>
        <option value="258">Guastatoya</option>
        <option value="259">Moraz??n</option>
        <option value="260">San Agust??n Acasaguastl??n</option>
        <option value="261">San Crist??bal Acasaguastl??n</option>
        <option value="262">El J??caro</option>
        <option value="263">Sansare</option>
        <option value="264">Sanarate</option>
        <option value="265">San Antonio La Paz</option>
        <option value="266">Antigua Guatemala</option>
        <option value="267">Jocotenango</option>
        <option value="268">Pastores</option>
        <option value="269">Sumpango</option>
        <option value="270">Sto. Domingo Xenacoj</option>
        <option value="271">Santiago Sacatep??quez</option>
        <option value="272">San Bartolom?? Millpas Altas</option>
        <option value="273">San Lucas Sacatep??quez</option>
        <option value="274">Santa Lucia Milpas Altas</option>
        <option value="275">Magdalena Milpas Altas</option>
        <option value="276">Santa Mar??a de Jes??s</option>
        <option value="277">Ciudad Vieja</option>
        <option value="278">San Miguel Due??as</option>
        <option value="279">Alotenango</option>
        <option value="280">San Antonio Aguas Calientes</option>
        <option value="281">Santa Catarina Barahona</option>
        <option value="282">Chimaltenango</option>
        <option value="283">San Jos?? Poaquil</option>
        <option value="284">San Mart??n Jilotepeque</option>
        <option value="285">Comalapa</option>
        <option value="286">Santa Apolonia</option>
        <option value="287">Tecp??n Guatemala</option>
        <option value="288">Mazatenango</option>
        <option value="289">Chicacao</option>
        <option value="290">Cuyotenango</option>
        <option value="291">Patulul</option>
        <option value="292">Pueblo Nuevo</option>
        <option value="293">R??o Bravo</option>
        <option value="294">Samayac</option>
        <option value="295">San Antonio Suchitep??quez</option>
        <option value="296">San Bernardino</option>
        <option value="297">San Jos?? El ??dolo</option>
        <option value="298">San Francisco Zapotitl??n</option>
        <option value="299">San Gabriel</option>
        <option value="300">San Juan Bautista</option>
        <option value="301">San Lorenzo</option>
        <option value="302">San Miguel Pan??n</option>
        <option value="303">San Pablo Jocopilas</option>
        <option value="304">Santa Barbara</option>
        <option value="305">Santo Domingo Suchitepequez</option>
        <option value="306">Santo Tomas La Uni??n</option>
        <option value="307">Zunilito</option>
        <option value="308">Quetzaltenango</option>
        <option value="309">Salcaj??</option>
        <option value="310">Olintepeque</option>
        <option value="311">San Carlos Sija</option>
        <option value="312">Sibilia</option>
        <option value="313">Cabric??n</option>
        <option value="314">Cajol??</option>
        <option value="315">San Miguel Sig??il??</option>
        <option value="316">Ostuncalco</option>
        <option value="317">San Mateo</option>
        <option value="318">Concepci??n Chiquirichapa</option>
        <option value="319">San Mart??n Sacatep??quez</option>
        <option value="320">Almolonga</option>
        <option value="321">Cantel</option>
        <option value="322">Huit??n</option>
        <option value="323">Zunil</option>
        <option value="324">Colomba</option>
        <option value="325">San Francisco La Uni??n</option>
        <option value="326">El Palmar</option>
        <option value="327">Coatepeque</option>
        <option value="328">G??nova</option>
        <option value="329">Flores Costa Cuca</option>
        <option value="330">La Esperanza</option>
        <option value="331">Palestina de Los Altos</option>
        <option value="332">San Jos?? (Escuintla)</option>
        <option value="333">Sipacate</option>
      `
      container.innerHTML = str;
    },
    getComboDepartamentos: (idcontainer)=>{
      let container = document.getElementById(idcontainer);
      let str = `
      <option value="2">Guatemala</option>
      <option value="3">Baja Verapaz</option>
      <option value="4">Chimaltenango</option>
      <option value="5">Chiquimula</option>
      <option value="6">El Progreso</option>
      <option value="7">Escuintla</option>
      <option value="8">Alta Verapaz</option>
      <option value="9">Huehuetenango</option>
      <option value="10">Izabal</option>
      <option value="11">Jalapa</option>
      <option value="12">Jutiapa</option>
      <option value="13">Pet??n</option>
      <option value="14">Quich??</option>
      <option value="15">Retalhuleu</option>
      <option value="16">Sacatep??quez</option>
      <option value="17">San Marcos</option>
      <option value="18">Santa Rosa</option>
      <option value="19">Solol??</option>
      <option value="20">Suchitep??quez</option>
      <option value="21">Zacapa</option>
      <option value="22">Quetzaltenango</option>      
      `
      container.innerHTML = str;
    },
    getComboTipoEmpleados: (idcontainer)=>{
      let str = `
        <option value="VENDEDOR">VENDEDORES</option>
        <option value="SUPERVISOR">SUPERVISOR</option>
        <option value="REPARTIDOR">REPARTIDORES</option>
      `
      document.getElementById(idcontainer).innerHTML = str;

    },
    showToast: (text)=>{
      //depente de la libreria noty
      new Noty({
        type: 'info',
        layout: 'topRight',
        timeout: '500',
        theme: 'metroui',
        progressBar: false,
        text,
      }).show();
    },
    setReminder: async (msg,minutos)=>{

      
        if (!('Notification' in window)) {
          alert('Notification API not supported');
          return;
        }
        if (!('showTrigger' in Notification.prototype)) {
          alert('Notification Trigger API not supported');
          return;
        }
        
        await Notification.requestPermission()
          .then(() => {
            if (Notification.permission !== 'granted') {
              throw 'Notification permission is not granted';
            }
          })
          .then(() => navigator.serviceWorker.getRegistration())
          .then((reg) => {
            reg.showNotification(msg, {
                showTrigger: new TimestampTrigger(new Date().getTime() + Number(minutos) * 60000)
            })
          })
          .catch((err) => {
            alert('Notification Trigger API error: ' + err);
          });
      
    
    },
    getComboSucursales: ()=>{
      let str = '';
      let data = [
        {codsucursal:"DIST000",nomsucursal:"POPULAR",color:"success"}
      ];

      data.map((rows)=>{
        str = str + `<option value='${rows.codsucursal}'>${rows.nomsucursal}</option>`;
      });

      return str;
      
    },
    getComboTipoClientes:()=>{
      return `
        <option value="TIENDITA">TIENDITA</option>
        <option value="ABARROTERIA">ABARROTERIA</option>
        <option value="FARMACIA">FARMACIA</option>
        <option value="LIBRERIA">LIBRERIA</option>
        <option value="PI??ATERIA">PI??ATERIA</option>
        <option value="MUNDO DE 3">MUNDO DE 3</option>
        <option value="RESTAURANTE">RESTAURANTE</option>
        <option value="COMEDOR">COMEDOR</option>
        <option value="PAPEROS">PAPEROS</option>
        <option value="HOTEL">HOTEL</option>
        <option value="AUTOHOTEL">AUTOHOTEL</option>
        <option value="CARNICERIA">CARNICERIA</option>
        <option value="MERCERIA">MERCERIA</option>
        <option value="BAR">BAR</option>
        <option value="BARBERIA">BARBERIA</option>
        <option value="SALON DE BELLEZA">SALON DE BELLEZA</option>
        <option value="COLEGIO">COLEGIO</option>
        <option value="MINISUPER">MINISUPER</option>
        <option value="SUPERMERCADO">SUPERMERCADO</option>
        <option value="RUTEROS">RUTEROS</option>
        <option value="PASTELERIA">PASTELERIA</option>
        <option value="OTROS">OTROS</option>
      `
    }
    
};

//export default funciones;