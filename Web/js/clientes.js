var myURL = "http://localhost:6030/api/clientes";
sessionStorage.setItem("IDCliente", 0);

$(function () {
    actualizarGrilla();
    $('#btnGuardar').click(function () { guardarCliente(); });
    $('#btnEliminar').click(function () { borrarCliente(); });
    $('#btnCancelar').click(function () { limpiarControles(); });
    $('#btnGuardar').html("Nuevo");
});

function mostrarMensaje(mensaje, tipo) {
    $('#alertContainer').fadeOut("fast", function () {
        $('.alert').remove();
        $('#alertContainer').hide().prepend('<div class="alert alert-' + tipo + '" role="alert">' + mensaje + '</div>')
            .fadeIn();
    });
}

function actualizarGrilla() {
    var data = ajaxGET();
    construyeGrilla(data);
};

function ajaxGET() {
    var result;

    $.ajax({
        url: myURL,
        type: 'GET',
        async: false
    }).done(function (data) {
        result = data;
    }).error(function (xhr, status, error) {
        mostrarMensaje(error, 'danger');
        var s = status;
        var e = error;
    });

    return result;
}

function ajaxPOST() {
    var result;
    var obj = obtenerCliente();
    $.ajax({
        url: myURL,
        type: 'POST',
        async: false,
        data: obj
    }).done(function (data) {
        result = data;
        if (result.codigo == 1) {
            mostrarMensaje('Elemento insertado', 'success');
        } else if (result.codigo == 0) {
            mostrarMensaje(result.mensaje, 'danger');
        }
    }).error(function (xhr, status, error) {
        mostrarMensaje(error, 'danger');
        var s = status;
        var e = error;
    });
    return result;
}

function ajaxPUT() {
    var result;
    var obj = obtenerCliente();
    $.ajax({
        url: myURL,
        type: 'PUT',
        async: false,
        data: obj
    }).done(function (data) {
        result = data;
        if (result.codigo == 1) {
            mostrarMensaje('Elemento actualizado', 'success');
        } else if (result.codigo == 0) {
            mostrarMensaje(result.mensaje, 'danger');
        }
    }).error(function (xhr, status, error) {
        mostrarMensaje(error, 'danger');
        var s = status;
        var e = error;
    });
    return result;
}

function ajaxDELETE(id) {
    var result;
    $.ajax({
        url: myURL + '/' + id,
        type: 'DELETE',
        async: false
    }).done(function (data) {
        result = data;
        mostrarMensaje('Elemento eliminado', 'success');
    }).error(function (xhr, status, error) {
        mostrarMensaje(error, 'danger');
        var s = status;
        var e = error;
    });
    return result;
}

function construyeGrilla(data) {
    var grd = $('#grdClientes');
    grd.html("");
    var tbl = $('<table class="table table-striped table-bordered table-dark"></table>');

    var header = $('<tr></tr>');
    header.append('<th scope="row">Id</th>');
    header.append('<th>Nombre</th>');
    header.append('<th>Apellido</th>');
    header.append('<th>Fecha de Nacimiento</th>');
    header.append('<th>Numero de Documento</th>');
    header.append('<th>Dirección</th>');
    tbl.append(header);

    for (d in data) {
        var row = $('<tr class="jqClickeable"></tr>');
        row.append('<td>' + data[d].ID + '</td>');
        row.append('<td>' + data[d].Nombre + '</td>');
        row.append('<td>' + data[d].Apellido + '</td>');
        row.append('<td>' + data[d].Fecha_Nac + '</td>');
        row.append('<td>' + data[d].Nro_Doc + '</td>');
        row.append('<td>' + data[d].Direccion + '</td>');
        tbl.append(row);
    }
    grd.append(tbl);
    $('.jqClickeable').click(function () { mostrarElemento($(this)); });
}

function borrarCliente() {
    if (sessionStorage.getItem("IDCliente") != 0) {
        ajaxDELETE(sessionStorage.getItem("IDCliente"));
    } else {
        mostrarMensaje('No hay ningún elemento seleccionado', 'warning');
    }
    actualizarGrilla();
    limpiarControles();
}

function guardarCliente() {
    if (sessionStorage.getItem("IDCliente") == 0) {
        ajaxPOST();
    }
    else {
        ajaxPUT();
    }
    actualizarGrilla();
    limpiarControles();
}

function mostrarElemento(elem) {
    sessionStorage.setItem("IDCliente", elem.children().eq(0).text());
    $('#txtNombre').val(elem.children().eq(1).text());
    $('#txtApellido').val(elem.children().eq(2).text());
    $('#txtFecha').val(elem.children().eq(3).text());
    $('#txtDocumento').val(elem.children().eq(4).text());
    $('#txtDireccion').val(elem.children().eq(5).text());
    $('#btnGuardar').html("Modificar");
}

function obtenerCliente() {
    var cliente = {};
    cliente.Id = sessionStorage.getItem("IDCliente");
    cliente.Nombre = $('#txtNombre').val();
    cliente.Apellido = $('#txtApellido').val();
    cliente.Fecha_Nac = $('#txtFecha').val();
    cliente.Nro_Doc = $('#txtDocumento').val();
    cliente.Direccion = $('#txtDireccion').val();
    return cliente;
}
function limpiarControles() {
    sessionStorage.setItem("IDCliente", 0);
    $('#txtNombre').val("");
    $('#txtApellido').val("");
    $('#txtFecha').val("");
    $('#txtDocumento').val("");
    $('#txtDireccion').val("");
    $('#btnGuardar').html("Nuevo");
}