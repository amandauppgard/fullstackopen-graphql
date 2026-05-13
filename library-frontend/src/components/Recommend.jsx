import { useEffect } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show, token }) => {
  const userResult = useQuery(ME, { fetchPolicy: 'network-only' })
  const favoriteGenre = userResult.data?.me?.favoriteGenre
  const bookResult = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    fetchPolicy: 'network-only'
  })

  useEffect(() => {
    if (token) {
      userResult.refetch()
    }
  }, [token])

  if (!show) {
    return null
  }

  const books = bookResult.data?.allBooks || []

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>
      {favoriteGenre && <p>favorite genre: {favoriteGenre}</p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
