import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './Shared/Main'

function App() {

  const router = createBrowserRouter([
    {
      element: <Main />,
      children:
        [
          {
            path: "/",
            element: <h2>This is the Home Page</h2>
          },
          {
            path: "/shop",
            element: <h2>This is the Shop Page</h2>
          }
        ]
    }

  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
