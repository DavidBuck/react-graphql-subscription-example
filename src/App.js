import React from "react"
import gql from "graphql-tag"
import { useSubscription } from "@apollo/react-hooks"
import { format } from "date-fns"

function App() {
  const { loading, error, data } = useSubscription(gql`
    subscription {
      sensor {
        time
        temp
        humidity
      }
    }
  `)

  if (loading) return <p>Loading...</p>
  if (error) return <p>`Error! ${error.message}`</p>

  return (
    <div className="container mx-auto p-4 m-4 border-solid border-2 border-gray-600 bg-gray-200">
      <h1 className="text-4xl text-gray-800 py-2 text-center">
        React GraphQL Subscription Example
      </h1>
      <table className="table-fixed mt-2 py-4 border-gray-500">
        <thead>
          <tr className="bg-gray-500">
            <th className="w-1/4 px-4 py-2 border-gray-600">Time</th>
            <th className="w-1/4 px-4 py-2 border-gray-600">Temperature</th>
            <th className="w-1/4 px-4 py-2 border-gray-600">Humidity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2 border-gray-600">
              {format(data.sensor.time * 1000, "hh:mm:ss a")}
            </td>
            <td className="border px-4 py-2 border-gray-600">
              {data.sensor.temp}
            </td>
            <td className="border px-4 py-2 border-gray-600">
              {data.sensor.humidity}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App
