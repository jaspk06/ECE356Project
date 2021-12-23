import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import RecipeCard from "./components/RecipeCard";
import RecipeForm from "./components/RecipeForm";
import Recipes from "./components/Recipes";
import UserForm from "./components/UserForm";
import UserProfile from "./components/UserProfile";

export default function App() {
  return (
    <>
      <Navigation>
        <Routes>
          <Route path="/recipes/:recipeID" element={<RecipeCard />} />
          <Route path="/create/recipe" element={<RecipeForm />} />
          <Route path="/create/user" element={<UserForm />} />
          <Route path="/edit/recipe/:recipeID" element={<RecipeForm update={true} />} />
          <Route path="/users/:userID" element={<UserProfile />} />
          <Route path="/" element={<Recipes />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Navigation>
    </>
  )
}