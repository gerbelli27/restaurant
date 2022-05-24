import axios from 'axios';
import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import IPaginacao from '../../interfaces/IPaginacao'
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [nextPage, setNextPage] = useState('')

  useEffect(() => {
    // get restaurants
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(response => {
        setRestaurantes(response.data.results)
        setNextPage(response.data.next)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const moreRestaurants = () => {
    axios.get<IPaginacao<IRestaurante>>(nextPage)
    .then(response => {
      setRestaurantes([...restaurantes,...response.data.results])
      setNextPage(response.data.next)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const pratos = () => {
    
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {nextPage && <button onClick={moreRestaurants}>More</button>}
  </section>)
}

export default ListaRestaurantes