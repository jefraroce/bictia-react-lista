import React from 'react'
import './App.scss'
import Header from './components/Header'
import Button from './components/Button'

function crearProducto(nombre) {
  return {
    nombre: nombre,
    estado: 'pendiente'
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)

    // Variables globales de nuestro componente
    this.state = {
      nombreProducto: '',
      listaDeProductos: []
    }

    // Enlazamos nuestros metodos con nuestra clase
    this.actualizarNombre = this.actualizarNombre.bind(this)
    this.agregarProducto = this.agregarProducto.bind(this)
  }

  agregarProducto(event) {
    event.preventDefault()
    const producto = crearProducto(this.state.nombreProducto)

    // Hacemos una copia del listado actual de productos
    const lista = this.state.listaDeProductos.slice()
    // Agregamos un nuevo producto a nuestra lista
    lista.push( producto )

    // Actualizamos la lista de productos
    this.setState({ listaDeProductos: lista, nombreProducto: '' })
  }

  actualizarNombre(event) {
    this.setState({ nombreProducto: event.target.value })
  }

  pintarLista() {
    if (this.state.listaDeProductos.length === 0) {
      return null
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Producto</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.listaDeProductos.map((producto, index) => {
            return (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{ index + 1 }</td>
                <td>{producto.nombre}</td>
                <td>{producto.estado}</td>
                <td>
                  <button className="btn btn-link text-danger" title="Eliminar">
                    Eliminar
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  // Render es la función que utiliza React para saber que es lo el debe agregar al HTML
  render() {
    return (
      <div className="mi-contenedor card text-center">
        <Header></Header>
        <h1>¿Que voy a comprar hoy?</h1>

        <form className="p-2" onSubmit={this.agregarProducto}>
          <div className="input-group mb-3">
            <input type="text" className="form-control" value={this.state.nombreProducto} onChange={this.actualizarNombre} required />
            <div className="input-group-append">
              <Button>
                Agregar
              </Button>
            </div>
          </div>
        </form>

        <div className="card-body">
          {this.pintarLista()}
        </div>
      </div>
    )
  }
}

export default App


/**
 * Taller
 * 
 * 1. Agregar la opción de eliminar elementos de la lista
 * 2. Agregar la posibilidad de marcar como en el carrito los productos pendientes
 */
