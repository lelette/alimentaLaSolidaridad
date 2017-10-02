/* Variable unica global */
  var primeAppVar = {};
/* Variable unica global */

/* variables de selectores */
  primeAppVar.customModalBox = $('.custom-modal-box');
  primeAppVar.internalModalBox = $('.internal-modal-box');
  primeAppVar.window = $(window);
  primeAppVar.optionsNeeruSelectBox = $('.options-neeru-select-box');
/* variables de selectores */

/* Apertura del modal */
  primeAppVar.modalOpen = function(html){
    primeAppVar.customModalBox.css('display','flex').attr('data-modal','true')
    setTimeout(function(){
      primeAppVar.customModalBox.css('opacity','1')
      primeAppVar.fillModal(html)
    })
  }
/* Apertura del modal */

/* Cierre del modal */
  /* Cierre principal */
    primeAppVar.modalClose = function(){
      primeAppVar.customModalBox.css('opacity','0')
      setTimeout(function(){
        primeAppVar.customModalBox.removeAttr('style')
        primeAppVar.internalModalBox.children().remove()
      },100)
    }
  /* Cierre principal */
  /* Cierre secundario */
    /**
    * Al darle click al fondo negro transparente del modal este se cerrara
    */
    primeAppVar.window.click(function(e){
      if (primeAppVar.customModalBox.css('display') == 'flex') {
        if ($(e.target).data('modal')) {
          primeAppVar.modalClose();
        }
      }
    })
    /**
    * Al darle a la tecla Esc el modal se cerrara
    */
    primeAppVar.window.keyup(function(e) {
      if (primeAppVar.customModalBox.css('display') == 'flex') {
        if (e.keyCode == 27) { 
          primeAppVar.modalClose();
        }
      }
    });
  /* Cierre secundario */
/* Cierre del modal */

/* Mostrar elementos internos del modal */
  primeAppVar.fillModal = function(html){
    if (html == 'selectOperator') {
      primeAppVar.internalModalBox.append(primeAppVar.reloadViewHtml.selectOperatorHtml)
    }else if(html == 'congratulationMsn'){
      primeAppVar.internalModalBox.append(primeAppVar.reloadViewHtml.congratulationMsn)
    }
  }
/* Mostrar elementos internos del modal */

/* Abrir el select de neeru */
  primeAppVar.openOptionBox = function(){
    if (primeAppVar.optionsNeeruSelectBox.css('display') == 'none') {
      primeAppVar.optionsNeeruSelectBox.css('display','block')
      primeAppVar.selectNeeruOpen = true;
    }
  }   
/* Abrir el select de neeru */

/* Cerrar el select de neeru */
  primeAppVar.closeOptionBox = function(){
    primeAppVar.optionsNeeruSelectBox.removeAttr('style')
    primeAppVar.selectNeeruOpen = false;
  }
/* Cerrar el select de neeru */