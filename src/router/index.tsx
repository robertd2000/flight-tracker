import { MainMap } from "@/components/Map/MainMap";
import { createBrowserRouter } from "react-router-dom";

/**
 * Здесь организуется роутинг всего приложения. react-router-dom
 */
const router = createBrowserRouter([
  {
    path: "/flight-tracker/",
    element: <MainMap />,
  },
]);

export default router;
