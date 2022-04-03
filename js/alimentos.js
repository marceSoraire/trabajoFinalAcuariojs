const itemsAlimentos = document.getElementById("itemsAlimentos");
const agregarAlimento = document.getElementById('agregarAlimento');
const final = document.getElementById('compraFinal');
const cerrado = document.getElementById('cerrado');
const end = document.getElementById('end');
const templateCardAlimentos = document.getElementById("template-card-alimentos").content;
const templateProductoAlimentos = document.getElementById('template-productos').content;
const templatePagoAlimentos = document.getElementById('template-pago').content;
const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener('DOMContentLoaded', e => { 
    fetchData();

    localStorage.getItem('carrito') ? carrito = JSON.parse(localStorage.getItem('carrito')) : localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCompra();
});

const fetchData = async () => {
    const res = await fetch('../json/alimentos.json');
    const data = await res.json();
    mostrarCards(data)
}

mostrarCards = data => {
    data.forEach(e => {
        templateCardAlimentos.querySelector('h5').textContent = e.marca;
        templateCardAlimentos.querySelector('p').textContent = e.precio;
        templateCardAlimentos.querySelector('img').setAttribute('src', e.imgAlimento);
        templateCardAlimentos.querySelectorAll('.btn')[0].dataset.id = e.id;

        const clone = templateCardAlimentos.cloneNode(true);
        fragment.appendChild(clone);
    });
    itemsAlimentos.appendChild(fragment);
}

crearCompra = e =>{
    //operacion avanzada AND
    e.target.classList.contains('btn') && agregarCarrito(e.target.parentElement);
    e.stopPropagation();
};

agregarCarrito = e =>{
    const productos = {
        id: e.querySelector('.btn').dataset.id,
        marca: e.querySelector('h5').textContent,
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
    agregarAlimento.innerHTML ='';
    Object.values(carrito).forEach(producto =>{
        templateProductoAlimentos.querySelector('th').textContent = producto.id,
        templateProductoAlimentos.querySelectorAll('td')[0].textContent = producto.marca,
        templateProductoAlimentos.querySelectorAll('td')[1].textContent = producto.cantidad,
        templateProductoAlimentos.querySelector('button').dataset.id = producto.id,
        templateProductoAlimentos.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateProductoAlimentos.cloneNode(true);
        fragment.appendChild(clone);
    });
    agregarAlimento.appendChild(fragment);
}

compraConfirmada =()=> {

    cerrado.innerHTML ='';
    const ticket = Object.values(carrito).reduce((acc,{cantidad,precio})=> acc + cantidad*precio,0);
    templatePagoAlimentos.querySelectorAll('button')[0].textContent = `1 Pago de $${ticket}`;
    templatePagoAlimentos.querySelectorAll('button')[1].textContent = '3 cuotas 10% recargo';
    templatePagoAlimentos.querySelectorAll('button')[2].textContent = '6 cuotas 15% recargo';
    templatePagoAlimentos.querySelectorAll('button')[3].textContent = '12 cuotas 20% recargo';
    const clone = templatePagoAlimentos.cloneNode(true);
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
