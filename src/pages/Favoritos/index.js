import { useEffect, useState } from 'react'
import './favoritos.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
function Favoritos(){
    const [filmes, setfilmes] = useState([])

    useEffect(()=>{
        const minhaLista =  localStorage.getItem("prime-flix")
        setfilmes(JSON.parse(minhaLista) || [])
    },[])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        })
        setfilmes(filtroFilmes)
        localStorage.setItem("prime-flix", JSON.stringify(filtroFilmes))
        toast.success("filme removido")
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>

            {filmes.length === 0 && <span>Voce nao possui nenhum filme salvo <a href='/'>ver filmes</a></span>}


            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>

                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={()=>excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Favoritos