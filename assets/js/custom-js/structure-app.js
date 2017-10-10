/* varibales */
	primeAppVar.windowWidth;
	primeAppVar.window = $(window)
/* varibales */

/* Iniciador visual */
	primeAppVar.init = function(){
		primeAppVar.addPanelAndBurgerBtn()
	}
/* Iniciador visual */

/* Reposnive js */
	$(window).resize(function () {
		primeAppVar.addPanelAndBurgerBtn()
	})
/* Reposnive js */

/* Elementos html para agregar */
	primeAppVar.structureAppHtml = {
		burgerBtn: '\
			<span class="btn-burger" onclick="primeAppVar.openVerticalPanel()">\
				<i class="fa fa-bars" aria-hidden="true"></i>\
			</span>\
		',
		verticalPanel: '\
			<div class="vertical-panel" data-panel="true">\
				<div class="internal-vertical-panel">\
					<nav>\
						<div>\
							<i class="fa fa-home" aria-hidden="true"></i>\
						</div>\
						<div>\
							<p>enviar recarga</p>\
						</div>\
						<div>\
							<p>añadir saldo</p>\
						</div>\
						<div>\
							<p>mi cuenta</p>\
						</div>\
						<div onclick="primeAppVar.notifyBox(this)">\
							<img src="images/icoCartEmpty.png">\
						</div>\
					</nav>\
					<div>\
						<div>\
							<p class="p-small">ID 99999999</p>\
							<p class="p-tiny">Cerrar Sesión</p>\
						</div>\
						<div>\
							<img class="aux-img-1-SA" src="images/donald-trump.jpg">\
						</div>\
						<div class="aux-1-SA">\
							<div class="vertical-line"></div>\
							<p class="p-small p-500">EN</p>\
						</div>\
					</div>\
				</div>\
			</div>\
		',
		notifyBox : '\
			<div class="card-notify-box">\
				<div class="line-100">\
					<div class="pillar-100p notify">\
						<div class="pillar-auto">\
							<div class="line-100">\
								<p class="p-black p-300">+57 1111-2222</p>\
							</div>\
							<div class="line-100">\
								<p class="p-black p-300"><span class="p-short">\USD</span> 999,999,999.00</p>\
							</div>\
						</div>\
						<div class="pillar-auto">\
							<img src="images/icoEliminar.png">\
						</div>\
					</div>\
				</div>\
				<div class="line-100">\
					<button data-standard class="btn-green-on">\
						<p>realizar el pago</p>\
					</button>\
				</div>\
				<div class="line-100">\
					<button data-standard class="btn-gray-on">\
						<p>añadir recarga</p>\
					</button>\
				</div>\
			</div>\
		',
		notifyBoxMyAcount : '\
			<div class="card-notify-box1">\
				<div class="line-100">\
					<div class="pillar-100p notify" style="background-color:gray; width:170px;">\
						<div class="pillar-auto">\
							<div class="line-100">\
								<img src="images/icoMovimientos.png"> <a href="app/page/transactions"><p class="p-black p-tiny">MOVIMIENTOS</p></a>\
							</div>\
							<div class="line-100">\
								<img src="images/icoNumFrec.png"> <a ui-sref="app.page.transactions"><p class="p-black p-tiny">NUMEROS FRECUENTES</p></a>\
							</div>\
							<div class="line-100">\
								<img src="images/icoTDCAfiliada.png"> <a ui-sref="app.page.recharge"> <p class="p-black p-tiny">TDC AFILIADAS</p></a>\
							</div>\
							<div class="line-100">\
								<img src="images/icoMiPerfil.png"> <a href="app/page/profile"><p class="p-black p-tiny">MI PERFIL</p></a>\
							</div>\
						</div>\
					</div>\
				</div>\
			</div>\
		'
	}
/* Elementos html para agregar */

/* Añadir boton hamburguesa */
	primeAppVar.addPanelAndBurgerBtn = function(){
		primeAppVar.windowWidth = $(window).width();
		if (primeAppVar.windowWidth < 993) {
			if ($('.btn-burger').length == 0) {
				$('body > header > section:first-child').append(primeAppVar.structureAppHtml.burgerBtn)
				$('body').prepend(primeAppVar.structureAppHtml.verticalPanel)
				primeAppVar.fushionSelect1 = $('.vertical-panel, .internal-vertical-panel, .internal-vertical-panel > nav, .internal-vertical-panel > div')
				primeAppVar.verticalpanel = $('.vertical-panel')
			}
		}else{
			$('.btn-burger, .vertical-panel').remove()
		}
	}
	primeAppVar.window.click(function(e){
		primeAppVar.windowWidth = $(window).width();
		if (primeAppVar.windowWidth < 993) {
			if (primeAppVar.verticalpanel.css('display') == 'flex') {
	      if ($(e.target).data('panel')) {
	        primeAppVar.fushionSelect1.removeAttr('style')
	        primeAppVar.closeNotifyBox();
	      }
	    }
		}

  })
/* Añadir boton hamburguesa */

/* Abrir y cerrar el panel vertical */
	primeAppVar.openVerticalPanel = function(){
		if (primeAppVar.verticalpanel.css('display') != "flex"){
			primeAppVar.verticalpanel.css('display','flex')
			setTimeout(function(){
				$('.internal-vertical-panel').css('height', 'auto')
				setTimeout(function(){
					$('.internal-vertical-panel > nav, .internal-vertical-panel > div').css('opacity','1')
				},100)
			}, 200)
		}else{
			primeAppVar.fushionSelect1.removeAttr('style')
			primeAppVar.closeNotifyBox();
		}
	}
/* Abrir y cerrar el panel vertical */

/* Agregar caja de notificaciones */
	primeAppVar.notifyBox = function(e){
		if ($('.card-notify-box').length == 0) {
			primeAppVar.showNotifyBox(e);
		}else{
			primeAppVar.closeNotifyBox(e);
		}
	}
	/* funciones complementarias */
		primeAppVar.showNotifyBox = function(e){
			if ($('.card-notify-box').length == 0) {
				$(e).append(primeAppVar.structureAppHtml.notifyBox)
				$(e).children('img').attr('src','images/icoCartFull.png')
				$(e).css('border-bottom','2px solid #FFFF00')
			}
		}
		primeAppVar.closeNotifyBox = function(e){
			var selector = $('.internal-vertical-panel > nav > div:last-child')
			if (primeAppVar.windowWidth < 993) {
				if ($('.card-notify-box').length > 0) {
					$('.card-notify-box').remove()
					selector.children('img').attr('src','images/icoCartEmpty.png')
					selector.removeAttr('style')
				}
			}else{
				if ($('.card-notify-box').length > 0) {
					$('.card-notify-box').remove()
					$(e).children('img').attr('src','images/icoCartEmpty.png')
					$(e).removeAttr('style')
				}
			}
		}
	/* funciones complementarias */
/* Agregar caja de notificaciones */

/* Agregar caja mi cuenta */
	primeAppVar.notifyBoxMyAcount = function(e){
		if ($('.card-notify-box1').length == 0) {
			primeAppVar.showNotifyBoxMyAcount(e);
		}else{
			primeAppVar.closeNotifyBoxMyAcount(e);
		}
	}
	/* funciones complementarias */
		primeAppVar.showNotifyBoxMyAcount = function(e){
			if ($('.card-notify-box1').length == 0) {
				$(e).append(primeAppVar.structureAppHtml.notifyBoxMyAcount)
				$(e).children('img').attr('src','images/icoCartFull.png')
				$(e).css('border-bottom','2px solid #FFFF00')
			}
		}
		primeAppVar.closeNotifyBoxMyAcount = function(e){
			var selector = $('.internal-vertical-panel > nav > div:last-child')
			if (primeAppVar.windowWidth < 993) {
				if ($('.card-notify-box1').length > 0) {
					$('.card-notify-box1').remove()
					selector.children('img').attr('src','images/icoCartEmpty.png')
					selector.removeAttr('style')
				}
			}else{
				if ($('.card-notify-box1').length > 0) {
					$('.card-notify-box1').remove()
					$(e).children('img').attr('src','images/icoCartEmpty.png')
					$(e).removeAttr('style')
				}
			}
		}
	/* funciones complementarias */
/* Agregar caja de notificaciones */
