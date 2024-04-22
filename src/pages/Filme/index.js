import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import './filme-info.css'
import api from '../../services/api';
import { toast } from 'react-toastify';
function Filme(){
  const { id } = useParams()
  const navigate = useNavigate()

  const [filme, setfilme] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function loadFilme(){
      await api.get(`/movie/${id}`,{
        params:{
          api_key: "3a8c6cde3a0cdb4a9a16c59a5105c963",
          language: "pt-br",
        }
      })
      .then((response)=>{
        setfilme(response.data)
        setLoading(false)
      })
      .catch(()=>{
        console.log("FILME NAO ENCONTRADO")
        navigate("/", {replace: true})
        return
      })
    }

    loadFilme()


    return ()=>{
      console.log("componente foi desmontado")
    }
  },[navigate, id])

  function salvarFilme(){
    const minhaLista = localStorage.getItem("prime-flix")

    let filmesSalvos = JSON.parse(minhaLista) || []

    const hasFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id)

    if(hasFilme){
      toast.warn("esse filme ja esta na lista")
      return
    }
    filmesSalvos.push(filme)
    localStorage.setItem("prime-flix", JSON.stringify(filmesSalvos))
    toast.success("filme salvo com sucesso")
  }

    if(loading){
      return (
        <div className="filme-info">
          <h1>Carregando detalhes</h1>
        </div>
      )
    }

    return(
      
        <div className="filme-info">
          <h1>{filme.title}</h1>
          <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

          <h3>Sinopse</h3>
          <span>{filme.overview}</span>
          <strong>Avaliação: {filme.vote_average} /10</strong>

          <div className='area-button'>
              <button onClick={salvarFilme}>Salvar</button>
              <button>
                <a target='_blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} trailer`}>
                  Treiler
                </a>
              </button>
          </div>
        </div>
    )
}
  export default Filme;