import { router } from "./config/router";
import { RouterProvider } from "react-router-dom";
// import StyleThemeProvider from "./theme/ThemeProvider";

function App() {
  
  return (
      <div>
          <RouterProvider router={router} />
      </div>
  );
}

export default App;
