import React from "react";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "../RequireAuth.jsx";
import { useUI } from "../../contexts/UIContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Content, StyledMain } from "./Main.styles.mjs";
import { privateRoutes, publicRoutes } from "../../routes.jsx";
import Menu from "./../Menu/Menu";

const Main = () => {
  const { isMenu } = useUI();
  const { employee } = useAuth();

  return (
    <>
      <StyledMain $is_menu={isMenu && employee}>
        {isMenu && employee && <Menu />}

        <Content>
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
        </Content>
      </StyledMain>
    </>
  );
};

export default Main;
