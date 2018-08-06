/* Variables */
  primeAppVar.openResumenPanel;
/* Variables */

/* Elementos html para agregar al modal */
  primeAppVar.reloadViewHtml = {
    selectOperatorHtml :
    '<div class="select-operator-box">\
      <div class="line-100">\
        <p class="p-green p-3">Seleccione una operadora...</p>\
      </div>\
      <div class="line-100">\
        <div class="pillar-auto operator">\
          <div class="line-100">\
            <div class="neeru-checkbox-1">\
              <input type="radio" name="operator" value="digitel">\
              <span></span>\
            </div>\
            <div class="pillar-100p">\
              <p class="aux-text-1-R">Digitel</p>\
            </div>\
          </div>\
          <div class="line-100 operator-logo-box">\
            <img src="images/logos/digitel.png">\
          </div>\
        </div>\
        <div class="pillar-auto operator">\
          <div class="line-100">\
            <div class="neeru-checkbox-1">\
              <input type="radio" name="operator" value="movistar">\
              <span></span>\
            </div>\
            <div class="pillar-100p">\
              <p class="aux-text-1-R">Movistar</p>\
            </div>\
          </div>\
          <div class="line-100 operator-logo-box">\
            <img src="images/logos/movistar.png">\
          </div>\
        </div>\
        <div class="pillar-auto operator">\
          <div class="line-100">\
            <div class="neeru-checkbox-1">\
              <input type="radio" name="operator" value="claro">\
              <span></span>\
            </div>\
            <div class="pillar-100p">\
              <p class="aux-text-1-R">Claro</p>\
            </div>\
          </div>\
          <div class="line-100 operator-logo-box">\
            <img src="images/logos/claro.png">\
          </div>\
        </div>\
        <div class="pillar-auto operator">\
          <div class="line-100">\
            <div class="neeru-checkbox-1">\
              <input type="radio" name="operator" value="+movil">\
              <span></span>\
            </div>\
            <div class="pillar-100p">\
              <p class="aux-text-1-R">+movil</p>\
            </div>\
          </div>\
          <div class="line-100 operator-logo-box">\
            <img src="images/logos/+movil.png">\
          </div>\
        </div>\
      </div>\
      <div class="line-100">\
        <button data-standard class="btn-green-on" onclick="primeAppVar.selectedOperator()">\
          <p>Aceptar</p>\
        </button>\
      </div>\
    </div>',
    congratulationMsn :
    '<div class="congratulation-box">\
      <div class="line-100">\
        <img src="images/logoNeeru1.png">\
      </div>\
      <div class="line-100">\
        <img class="aux-img-2-R" src="images/icoOrdenVrd.png">\
        <p class="p-5 p-green">¡Recarga Exitosa!</p>\
      </div>\
      <div class="line-100">\
        <div class="pillar-80p">\
          <p>Mensaje Enviado</p>\
          <img class="aux-img-3-R" src="images/carita1.png">\
        </div>\
      </div>\
      <div class="line-100">\
        <button data-standard class="btn-green-on">\
          <p>Regresar a la web</p>\
        </button>\
      </div>\
    </div>'
  }
/* Elementos html para agregar al modal */

/* Acciones luego de seleccionar una operadora */
  primeAppVar.selectedOperator = function (operator) {
    /** 1)
    * Se captura el valor de la operadora seleccionada
    */
      primeAppVar.selectOperator = $('.select-operator-box input[name="operator"]:checked').val();
    // End 1 //

    if (primeAppVar.selectOperator != undefined) {
      /** 2)
      * Se le remueve la clase 'btn-neeru' que es la encargada de convertir a dicha caja en boton;
      * Ademas se remueven los elementos internos de dicha caja pa posteriormente poder agregar el
      * logo de la operadora selecccionada
      */
        $('.aux-3-R > .pillar-45p:last-child').removeClass('btn-neeru').children().remove()
      // End 2 //

      /** 3)
      * Dependiendo del valor seleccionado, se busca el logo correspondiente y se le agrega el logo a la caja
      * manipulada anteriormente.
      */
        $('.aux-3-R > .pillar-45p:last-child').append('\
          <img class="selectOperatorImg" src="images/logos/'+primeAppVar.selectOperator+'.png" data-value="'+primeAppVar.selectOperator+'">\
        ')
      // End 3 //
    }

    /** 4)
    * Cierre del modal
    */
      primeAppVar.modalClose();
    // End 4 //

    /** 5)
    * Se valida que se haya ingresado un numero de telefono completo y la operadora,
    * para remover los numeros frecuentes, si aplica, y mostrar la caja de planes de pago
    */
      primeAppVar.payPlansReloadBox();
    // End 5 //
  }
/* Acciones luego de seleccionar una operadora */

/* Cambiar valor por defecto del select por el valor escogido */
  primeAppVar.window.click(function(e){
    /** 1)
    * Capturamos el elemento que acciono la accion click
    */
      var option = $(e.target);
    /* End 1 */

    /** 2)
    * Verificamos que el selectbox tengo las opciones abiertas
    */
      if (primeAppVar.selectNeeruOpen) {
        /**
        * Verificamos que el elemento clickeado sea una opcion valida y no cualquier otro elemento
        */
          if (option.data('countryCode') || option.parents('.option-neeru').data('countryCode')) {

            /**4)
            * Almacenamos el codigo telefonico del pais seleccionado
            */
              var country = option.data('countryCode') ||  option.parents('.option-neeru').data('countryCode')
            /* End  4*/

            /** 5)
            * Almacenamos el selector de la caja donde se encontrara el codigo del pais seleccionado, ubicando al
            * select al cual corresponde.
            */
              var countrySelector = option.parents('.neeru-select').children('.country-selected')
            /* End 5*/

            /** 6)
            * Se le asigna el codigo telefonico seleccionado a la caja donde anteriormente se visualizaba
            * "Pais" como "placeholder"
            */
              countrySelector.children('p').html(country)
            /* End 6*/

            /** 7)
            * Se le da un color verde en los border del select para indicar que se selecciono un codigo
            * de forma correcta
            */
              $('.neeru-select').css('border','1.5px solid #0DB731')
            /* End 7*/

            /** 8)
            * Se cierra el select
            */
              primeAppVar.closeOptionBox();
            /* End 8*/

            /** 9
            * Se realiza la verificion de cambio de estado visual
            * donde se eliminan lo numeros frecuentes, si aplica, y se muestra
            * la caja donde se muestran los planes de pago.
            */
              primeAppVar.payPlansReloadBox()
            /* End 9 */
          }
        /* End 3*/
      }
    /* End 2 */
  })
/* Cambiar valor por defecto del select por el valor escogido */

/* Validacion de input phone */
  primeAppVar.validateInputPhone = function(e){
    var valueInputPhone = $(e).val();
    var reg = /[0-9]/;
    // console.log(valueInputPhone);
    // console.log(reg.test(valueInputPhone));
    if (reg.test(valueInputPhone)) {
      primeAppVar.payPlansReloadBox();
      $(e).css('border','1.5px solid #0DB731');
    }else {
      primeAppVar.payPlansReloadBox();
      $(e).css('border','1.5px solid red');
    }
  }
/* Validacion de input phone */


/* Validacion de input alias */
  primeAppVar.validateInputAlias = function(e){
    var valueInputPhone = $(e).val();
    var reg = /^[a-zA-Z0-9]*$/;

    if (reg.test(valueInputPhone)) {
      $(e).css('border','1.5px solid #0DB731');
    }else {
      $(e).css('border','1.5px solid red');
    }
  }
/* Validacion de input alias */

/* Cambio de estado visual 1 */
  primeAppVar.payPlansReloadBox = function(){
    if (primeAppVar.selectOperator != '' && primeAppVar.selectOperator != undefined && $('.country-selected p').html() != 'Pais' && $('input[name="phone"]').val() != '') {
      if ($('.frecuency-phones-box').length > 0) {
        primeAppVar.frecuencyPhoneBoxHtml = $('.frecuency-phones-box').html();
        $('.frecuency-phones-box').remove();
        $('.pay-plans-box').css('display','flex')
      }
    }
  }
/* Cambio de estado visual 1 */

/* Cambio de estado visual 2 */
  primeAppVar.payBox = function(btn){
    if ($(btn).attr('class') != 'btn-off') {
      primeAppVar.complemetaryFunction1();
    }
  }
/* Cambio de estado visual 2 */

/* Cambios de estado visual 3 - middlerware */
  primeAppVar.changeStateMW = function(activeTab){
    var activeState = $(activeTab).data('active-tab')
    if (activeState == '2') {
      primeAppVar.complemetaryFunction1()
    }else{
      primeAppVar.complemetaryFunction2()
    }
  }
/* Cambios de estado visual 3 - middlerware */

/* Funciones complementarias de cambio de estado */
  primeAppVar.complemetaryFunction1 = function(){
    $('.selecting-internal-box-R').css('display','none')
    $('.pay-box').css('display','flex')
    $('.aux-1-R > .tab-box:first-child')
      .removeClass('tab-on')
      .addClass('tab-off')
      .children('img')
      .attr('src','images/icoOrdenGrs.png')
    $('.aux-1-R > .tab-box:last-child')
      .removeClass('tab-off')
      .addClass('tab-on')
      .children('img')
      .attr('src','images/icoPagoVrd.png')
  }
  primeAppVar.complemetaryFunction2 = function(){
    $('.selecting-internal-box-R, .pay-box').removeAttr('style')
    $('.aux-1-R > .tab-box:last-child')
      .removeClass('tab-on')
      .addClass('tab-off')
      .children('img')
      .attr('src','images/icoPagoGrs.png')
    $('.aux-1-R > .tab-box:first-child')
      .removeClass('tab-off')
      .addClass('tab-on')
      .children('img')
      .attr('src','images/icoOrdenVrd.png')
  }
/* Funciones complementarias de cambio de estado */

/* Habilitar boton de elegir pago y finalizar pago */
  primeAppVar.ableBtn = function(){
    $('.aux-2-R button, .total-box button').removeClass('btn-off').addClass('btn-green-on')
  }
/* Habilitar boton de elegir pago y finalizar pago */

/* Cambio de color de border de tarjetas de creditos afiliadas */
  $('input[name="tdc-member"]').change(function(e){
    $('.member-card').removeAttr('style')
    $(e.target).parents('.member-card').css('border','1.5px solid #0DB731')
  })
/* Cambio de color de border de tarjetas de creditos afiliadas */

/* Mostrar el panel de resumen de operaciones en modalidades tablet y mobile */
  primeAppVar.showResumePanel = function(){
    primeAppVar.resumenPanel = $('.reload-master-box > section:last-child')
    if (primeAppVar.windowWidth < 501) {
      if (primeAppVar.resumenPanel.css('top') != '150px') {
        primeAppVar.resumenPanel.css('top','150px')
        primeAppVar.openResumenPanel = true;
      }else{
        primeAppVar.resumenPanel.removeAttr('style')
        primeAppVar.openResumenPanel = false;
      }
    }else if(primeAppVar.windowWidth > 500 && primeAppVar.windowWidth < 993){
      if (primeAppVar.resumenPanel.css('top') != '125px') {
        primeAppVar.resumenPanel.css('top','125px')
        primeAppVar.openResumenPanel = true;
      }else{
        primeAppVar.resumenPanel.removeAttr('style')
        primeAppVar.openResumenPanel = false;
      }
    }else{
      primeAppVar.resumenPanel.removeAttr('style')
      primeAppVar.openResumenPanel = false;
    }
  }

/* Mostrar el panel de resumen de operaciones en modalidades tablet y mobile */

/* Funciones ejecutadas al cambiar el size de la pantalla */
  primeAppVar.window.resize(function(){
    if (primeAppVar.openResumenPanel) {
      primeAppVar.showResumePanel()
    }
  })
/* Funciones ejecutadas al cambiar el size de la pantalla */
