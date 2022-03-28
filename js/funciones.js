// crearCompra = e =>{
//     //operacion avanzada AND
//     e.target.classList.contains('btn') && agregarCarrito(e.target.parentElement);
//     e.stopPropagation();
// };

///////// funciones
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

restarProducto = e => {
    if(e.target.classList.contains('brr')){
       const restar = carrito[e.target.dataset.id];
       
        if (restar.cantidad <= 0) {   
           //incorporando libreria
            Swal.fire({
                icon: 'error',
                title: 'Vacio',
                text: 'El carrito quedo vacio con este producto'
            })
        } else {
            restar.cantidad = carrito[e.target.dataset.id].cantidad - 1;
            //Spread que resta un producto
            carrito[restar.id] = {...restar};
        }
    }
    localStorage.setItem("carrito",JSON.stringify(carrito));
    mostrarCompra();
}

// compraConfirmada =()=> {

//     cerrado.innerHTML ='';
//     const ticket = Object.values(carrito).reduce((acc,{cantidad,precio})=> acc + cantidad*precio,0);
//     templatePago.querySelectorAll('button')[0].textContent = `1 Pago de $${ticket}`;
//     templatePago.querySelectorAll('button')[1].textContent = '3 cuotas 10% recargo';
//     templatePago.querySelectorAll('button')[2].textContent = '6 cuotas 15% recargo';
//     templatePago.querySelectorAll('button')[3].textContent = '12 cuotas 20% recargo';
//     const clone = templatePago.cloneNode(true);
//     fragment.appendChild(clone);
//     cerrado.appendChild(fragment);

//     const uno = document.getElementById('uno');
//     const dos = document.getElementById('dos');
//     const tres = document.getElementById('tres');
//     const cuatro = document.getElementById('cuatro');

//     uno.addEventListener('click', e => opcionPago(ticket,e));
//     dos.addEventListener('click', e => opcionPago(ticket,e));
//     tres.addEventListener('click', e => opcionPago(ticket,e));
//     cuatro.addEventListener('click', e => opcionPago(ticket,e));
// }

unPago =(ticket)=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Confirmar compra?',
            text: `un pago de $${ticket}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Comprar!',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Exito!',
                    `Su pago de $${ticket} fue aceptado`,
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Error',
                    `su compra de $${ticket} fue cancelada`,
                    'error'
                )
            }
        localStorage.clear();
        agregados.innerHTML ="";
        return ticket;
    }) 
}
tresPagos=(ticket)=>{
    let tresCuotas = (ticket / 3) * 1.10;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Confirmar compra?',
            text: `3 cuotas de $${Math.round(tresCuotas)}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Comprar!',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Exito!',
                    `Su primer pago de $${Math.round(tresCuotas)} fue aceptado`,
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Error',
                    `su compra en 3 cuotas de $${Math.round(tresCuotas)} fue cancelada`,
                    'error'
                )
            }
        localStorage.clear();
        agregados.innerHTML ="";
        return tresCuotas;
    }) 
}
seisPagos=(ticket)=>{
    let seisCuotas = (ticket / 6) * 1.15;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Confirmar compra?',
            text: `6 cuotas de $${Math.round(seisCuotas)}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Comprar!',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Exito!',
                    `Su primer pago de $${Math.round(seisCuotas)} fue aceptado`,
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Error',
                    `su compra en 6 cuotas de $${siesCuotas} fue cancelada`,
                    'error'
                )
            }
        localStorage.clear();
        agregados.innerHTML ="";
        return seisCuotas;
    }) 
}
docePagos=(ticket)=>{
    let doceCuotas = (ticket / 12) * 1.20;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Confirmar compra?',
            text: `12 cuotas de $${Math.round(doceCuotas)}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Comprar!',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Exito!',
                    `Su primer pago de $${Math.round(doceCuotas)} fue aceptado`,
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Error',
                    `su compra en 12 cuotas de $${Math.round(doceCuotas)} fue cancelada`,
                    'error'
                )
            }
        localStorage.clear();
        agregados.innerHTML ="";
        return doceCuotas;
    })
}