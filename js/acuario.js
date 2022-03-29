const items = document.getElementById("items");
const agregados = document.getElementById('agregados');
const final = document.getElementById('compraFinal');
const cerrado = document.getElementById('cerrado');
const end = document.getElementById('end');
const templateCard = document.getElementById("template-card").content;
const templateProducto = document.getElementById('template-productos').content;
const templatePago = document.getElementById('template-pago').content;
const fragment = document.createDocumentFragment();
let carrito = {};

items.addEventListener('click', e => crearCompra(e));
agregados.addEventListener('click', e=> restarProducto(e));

// DOMContentLoaded se dispara cuando el documento html fue cargado y parseado
document.addEventListener('DOMContentLoaded', e => { 
    fetchData();

    //operacion avanzada
    localStorage.getItem('carrito') ? carrito = JSON.parse(localStorage.getItem('carrito')) : localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCompra();
});

///////consume la api.json
const fetchData = async () => {
    const res = await fetch('../api.json');
    const data = await res.json();
    mostrarCards(data)
}

mostrarCards = data => {
    data.forEach(element => {
        templateCard.querySelector('h5').textContent = element.title;
        templateCard.querySelector('p').textContent = element.precio;
        templateCard.querySelector('img').setAttribute('src', element.imgPez);
        templateCard.querySelectorAll('.btn')[0].dataset.id = element.id;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    items.appendChild(fragment);
}

crearCompra = e =>{
    //operacion avanzada AND
    e.target.classList.contains('btn') && agregarCarrito(e.target.parentElement);
    e.stopPropagation();
};

agregarCarrito = e =>{
    const productos = {
        id: e.querySelector('.btn').dataset.id,
        title: e.querySelector('h5').textContent,
        precio: e.querySelector('p').textContent,
        cantidad: 1,
    }

    // El método hasOwnProperty() devuelve un booleano indicando si el objeto tiene la propiedad especificada.
    if (carrito.hasOwnProperty(productos.id)) {
        productos.cantidad = carrito[productos.id].cantidad + 1;
    }

    //Spread que suma un producto
    carrito[productos.id] = {...productos};
    localStorage.setItem("carrito",JSON.stringify(carrito));
    mostrarCompra();
}

mostrarCompra =()=> {
    agregados.innerHTML ='';
    Object.values(carrito).forEach(producto =>{
        templateProducto.querySelector('th').textContent = producto.id,
        templateProducto.querySelectorAll('td')[0].textContent = producto.title,
        templateProducto.querySelectorAll('td')[1].textContent = producto.cantidad,
        templateProducto.querySelector('button').dataset.id = producto.id,
        templateProducto.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateProducto.cloneNode(true);
        fragment.appendChild(clone);
    });
    agregados.appendChild(fragment);
}

compraConfirmada =()=> {

    cerrado.innerHTML ='';
    const ticket = Object.values(carrito).reduce((acc,{cantidad,precio})=> acc + cantidad*precio,0);
    templatePago.querySelectorAll('button')[0].textContent = `1 Pago de $${ticket}`;
    templatePago.querySelectorAll('button')[1].textContent = '3 cuotas 10% recargo';
    templatePago.querySelectorAll('button')[2].textContent = '6 cuotas 15% recargo';
    templatePago.querySelectorAll('button')[3].textContent = '12 cuotas 20% recargo';
    const clone = templatePago.cloneNode(true);
    fragment.appendChild(clone);
    cerrado.appendChild(fragment);

    const uno = document.getElementById('uno');
    const dos = document.getElementById('dos');
    const tres = document.getElementById('tres');
    const cuatro = document.getElementById('cuatro');

    uno.addEventListener('click', e => opcionPago(ticket,e));
    dos.addEventListener('click', e => opcionPago(ticket,e));
    tres.addEventListener('click', e => opcionPago(ticket,e));
    cuatro.addEventListener('click', e => opcionPago(ticket,e));
}

final.onclick = compraConfirmada;

opcionPago = (ticket,e) =>{

    //operadores avanzados AND
    e.target.classList.contains('one') && unPago(ticket);
    e.target.classList.contains('two') && tresPagos(ticket);
    e.target.classList.contains('thre') && seisPagos(ticket);
    e.target.classList.contains('four') && docePagos(ticket);
}
