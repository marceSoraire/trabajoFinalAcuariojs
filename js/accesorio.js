const itemsAccesorios = document.getElementById("itemsAccesorios");
const agregarAccesorio = document.getElementById('agregarAccesorio');
const final = document.getElementById('compraFinal');
const cerrado = document.getElementById('cerrado');
const end = document.getElementById('end');
const templateCardAccesorio = document.getElementById("template-card-accesorios").content;
const templateProductoAccesorio = document.getElementById('template-accesorio').content;
const templatePagoAccesorio = document.getElementById('template-pago').content;
const alimentos = document.getElementById('Alimentos');
const ramas = document.getElementById('Ramas');
const algas = document.getElementById('Algas');
const peceras = document.getElementById('Peceras');
const titleProducto = document.querySelector('h1');
const fragment = document.createDocumentFragment();
let carrito = {};

itemsAccesorios.addEventListener('click', e => crearCompra(e));
agregarAccesorio.addEventListener('click', e=> restarProducto(e));


document.addEventListener('DOMContentLoaded', e => { 
    fetchData();

    localStorage.getItem('carrito') ? carrito = JSON.parse(localStorage.getItem('carrito')) : localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCompra();
});

const fetchData = async () => {
    const res = await fetch('../json/api.json');
    const data = await res.json();
    filtrar(alimentos,data.productos);
    filtrar(ramas,data.productos);
    filtrar(algas,data.productos);
    filtrar(peceras,data.productos);
    mostrarCards(data.productos);
}

mostrarCards = (data) => {
    data.forEach(e => {
        templateCardAccesorio.querySelector('h5').textContent = e.title;
        templateCardAccesorio.querySelector('p').textContent = e.precio;
        templateCardAccesorio.querySelector('img').setAttribute('src', e.img);
        templateCardAccesorio.querySelectorAll('.btn')[0].dataset.id = e.id;

        const clone = templateCardAccesorio.cloneNode(true);
        fragment.appendChild(clone);
    });
    itemsAccesorios.appendChild(fragment);
}

crearCompra = e =>{
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

    if (carrito.hasOwnProperty(productos.id)) {
        productos.cantidad = carrito[productos.id].cantidad + 1;
    }

    carrito[productos.id] = {...productos};
    localStorage.setItem("carrito",JSON.stringify(carrito));
    mostrarCompra();
}

mostrarCompra =()=> {
    agregarAccesorio.innerHTML ='';
    Object.values(carrito).forEach(producto =>{
        templateProductoAccesorio.querySelector('th').textContent = producto.id,
        templateProductoAccesorio.querySelectorAll('td')[0].textContent = producto.title,
        templateProductoAccesorio.querySelectorAll('td')[1].textContent = producto.cantidad,
        templateProductoAccesorio.querySelector('button').dataset.id = producto.id,
        templateProductoAccesorio.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateProductoAccesorio.cloneNode(true);
        fragment.appendChild(clone);
    });
    agregarAccesorio.appendChild(fragment);
}

compraConfirmada =()=> {

    cerrado.innerHTML ='';
    const ticket = Object.values(carrito).reduce((acc,{cantidad,precio})=> acc + cantidad*precio,0);
    templatePagoAccesorio.querySelectorAll('button')[0].textContent = `1 Pago de $${ticket}`;
    templatePagoAccesorio.querySelectorAll('button')[1].textContent = '3 cuotas 10% recargo';
    templatePagoAccesorio.querySelectorAll('button')[2].textContent = '6 cuotas 15% recargo';
    templatePagoAccesorio.querySelectorAll('button')[3].textContent = '12 cuotas 20% recargo';
    const clone = templatePagoAccesorio.cloneNode(true);
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

    e.target.classList.contains('one') && unPago(ticket);
    e.target.classList.contains('two') && tresPagos(ticket);
    e.target.classList.contains('thre') && seisPagos(ticket);
    e.target.classList.contains('four') && docePagos(ticket);
}
