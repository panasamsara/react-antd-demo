import { useParams } from  'react-router-dom'

export default function Login() {
  const params = useParams();

  return (
    <div>
      user Detail-- {params.id}
    </div>
  )
}