var myURLClientes = "http://localhost:6030/api/clientes";
var myURLProductos = "http://localhost:6030/api/productos";
var myURLPedidos = "http://localhost:6030/api/pedidos";

var listaDePrecios = {};

$(function () {
    actualizarSelects();
    actualizarGrilla();
    $('#btnGuardar').click(function () { guardarPedido(); });
    $('#btnCancelar').click(function () { limpiarControles(); });
    $('#txtCantidad').change(function () {
        actualizarPrecio();
    });
    $('#selProductos').change(function () {
        actualizarPrecio();
    });
    $('#selClientes').change(function () {
        actualizarGrilla();
    });
});

function mostrarMensaje(mensaje, tipo) {
    $('#alertContainer').fadeOut("fast", function () {
        $('.alert').remove();
        $('#alertContainer').hide()
            .prepend('<div class="alert alert-' + tipo + '" role="alert">' + mensaje + '</div>')
            .fadeIn();
    });
}

function actualizarPrecio() {
    $('#txtPrecioTotal').attr("placeholder", '$' + $('#txtCantidad').val() *
        listaDePrecios[$('#selProductos').val()]);
}

function actualizarSelects() {
    var data = ajaxGETClientes();
    construyeSelectClientes(data);
    data = ajaxGETProductos();
    construyeSelectProductos(data)
};

function ajaxGETClientes() {
    var result;
    $.ajax({
        url: myURLClientes,
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

function ajaxGETProductos() {
    var result;
    $.ajax({
        url: myURLProductos,
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

function construyeSelectClientes(data) {
    var sel = $('#selClientes');
    sel.html("");

    for (d in data) {
        var opt = $('<option value="' + data[d].ID + '">' + data[d].Nombre + ' ' + data[d].Apellido + ' ' + data[d].Nro_Doc + '</option>');
        sel.append(opt);
    }
}

function construyeSelectProductos(data) {
    var sel = $('#selProductos');
    sel.html("");

    for (d in data) {
        var opt = $('<option value="' + data[d].ID + '">' + data[d].Nombre + ' (' + data[d].Descripcion + ')</option>');
        sel.append(opt);
        listaDePrecios[data[d].ID] = data[d].Precio;
    }
}

function construyeGrilla(data) {
    var grd = $('#grdPedidos');
    grd.html("");
    var tbl = $('<table class="table table-striped table-bordered table-dark"></table>');

    var header = $('<tr></tr>');
    header.append('<th>Apellido</th>');
    header.append('<th>Nombre</th>');
    header.append('<th>Producto</th>');
    header.append('<th>Descripcion</th>');
    header.append('<th>Cantidad</th>');
    header.append('<th>Precio Total</th>');
    tbl.append(header);

    for (d in data) {
        var row = $('<tr></tr>');
        row.append('<td>' + data[d].Apellido + '</td>');
        row.append('<td>' + data[d].Nombre + '</td>');
        row.append('<td>' + data[d].NombreProducto + '</td>');
        row.append('<td>' + data[d].Descripcion + '</td>');
        row.append('<td>' + data[d].Cantidad + '</td>');
        row.append('<td>' + data[d].PrecioTotal + '</td>');
        tbl.append(row);
    }
    grd.append(tbl);
}

function actualizarGrilla() {
    var data = ajaxGETPedidosPorCliente();
    construyeGrilla(data);
};

function ajaxGETPedidosPorCliente() {
    var result;
    $.ajax({
        url: myURLPedidos + '?idCliente=' + $('#selClientes').val(),
        type: 'GET',
        async: false
    }).done(function (data) {
        result = data;
        console.log(result);
    }).error(function (xhr, status, error) {
        mostrarMensaje(error, 'danger');
        var s = status;
        var e = error;
    });
    return result;
}

function guardarPedido() {
    ajaxPOSTPedidos();
    actualizarGrilla();
    limpiarControles();
}

function ajaxPOSTPedidos() {
    var result;
    var obj = obtenerPedido();
    console.log(obj);
    $.ajax({
        url: myURLPedidos,
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

function obtenerPedido() {
    var pedido = {};
    pedido.IDCliente = $('#selClientes').val()
    pedido.IDProducto = $('#selProductos').val()
    pedido.Cantidad = $('#txtCantidad').val();
    pedido.PrecioTotal = $('#txtCantidad').val() *
        listaDePrecios[$('#selProductos').val()]
    
    return pedido;
}

function limpiarControles() {
    $('#txtCantidad').val('1');
}