var socket = io.connect('http://192.168.50.8:6677', {
	forceNew: true
});
$(document).ready(function () {

	socket.on('mensajes', function (mensajes) {
		render(mensajes);
	});

	$("#formulario").submit(sendMensaje);
});

var render = function (data) {
	var html = data.map(function (item, index) {
		return (`
			<div class="alert alert-primary" role="alert">
				<strong>${item.nickname}</strong>
				<p>${item.mensaje}</p>
			</div>
		`);
	}).join('<hr>');

	$('#mensajes').html(html);

	$("#mensajes").animate({
		scrollTop: $('#mensajes').prop("scrollHeight")
	}, 1000);

}

var sendMensaje = function (e) {
	var mensaje = {
		nickname: $("#nickname").val(),
		mensaje: $("#mensaje").val()
	};
	$("#nickname").hide();

	socket.emit('agregar-mensaje', mensaje);

	$("#mensaje").val("");

	return false;
}
