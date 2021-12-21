import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import RecipeCard from "./components/RecipeCard";
import Recipes from "./components/Recipes";
import UserProfile from "./components/UserProfile";

export default function App() {
  return (
    <>
      <Navigation>
        <Routes>
          <Route path="/recipes/:recipeId" element={<RecipeCard />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/" element={<Recipes />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Navigation>
    </>
  )
}