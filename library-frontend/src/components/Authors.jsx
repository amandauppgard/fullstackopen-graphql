import { useState } from "react"
import { useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries'

const Authors = ({ show, authors = [], token }) => {
  const [year, setYear] = useState('')
  const [author, setAuthor] = useState('')
  const [updateYear] = useMutation(EDIT_BIRTHYEAR, {refetchQueries: [{query: ALL_AUTHORS}]})

  if (!show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()

    if (author === '') {
      return
    }

    updateYear({
      variables: {
        name: author,
        setBornTo: Number(year)
      }
    }
    )

    setAuthor('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && (
        <>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <div>
              <label htmlFor='author-name'>
                name
              </label>
              <select
                id='author-name'
                name='name'
                value={author}
                onChange={e => setAuthor(e.target.value)}
              >
                <option value=''>Select author</option>
                {authors.map((a) => (
                  <option key={a.name} value={a.name}>{a.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor='author-born'>
                born
              </label>
              <input
                id='author-born'
                value={year}
                onChange={({target}) => setYear(target.value)}
              />
            </div>
            <button type='submit'>update author</button>
          </form>
        </>
      )}
    </div>
  )
}

export default Authors
