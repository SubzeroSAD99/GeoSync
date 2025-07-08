import React from "react";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "../RequireAuth.jsx";
import { useUI } from "../../contexts/UIContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { StyledMain } from "./Main.styles.mjs";
import Header from "../Header/Header.jsx";
import { privateRoutes, publicRoutes } from "../../routes.jsx";

const Main = () => {
  const { isMenu } = useUI();
  const { employee } = useAuth();

  return (
    <StyledMain $is_menu={isMenu && employee}>
      {employee && <Header />}

      <Routes>
        {publicRoutes.map(({ path, element }, i) => (
          <Route key={i} path={path} element={element} />
        ))}

        <Route element={<RequireAuth />}>
          {privateRoutes.map((route, i) => {
            if (route.children) {
              return (
                <Route key={i} path={route.path}>
                  {route.children.map((child, j) => (
                    <Route
                      key={`${i}-${j}`}
                      path={child.path}
                      index={child.index}
                      element={child.element}
                    />
                  ))}
                </Route>
              );
            }
            return (
              <Route
                key={i}
                path={route.path}
                index={route.index}
                element={route.element}
              />
            );
          })}
        </Route>
      </Routes>
    </StyledMain>
  );
};

export default Main;
