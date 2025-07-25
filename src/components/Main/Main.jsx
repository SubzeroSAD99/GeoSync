import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { RequireAuth } from "../RequireAuth.jsx";
import { useAuth } from "@contexts/AuthContext.jsx";
import { Content, StyledMain } from "./Main.styles.mjs";
import { privateRoutes, publicRoutes } from "@/routes.jsx";
import Menu from "@components/Menu/Menu";
import Header from "@components/Header/Header.jsx";

const Main = () => {
  const { userLogged } = useAuth();

  return (
    <Routes>
      {/* Rotas públicas — SEM Header nem Menu */}
      {publicRoutes.map(({ path, element, children }, i) => {
        if (children) {
          return (
            <Route key={i} path={path}>
              {children.map((child, j) => (
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
        return <Route key={i} path={path} element={element} />;
      })}

      {/* Rotas privadas — COM Header e Menu */}
      <Route
        path="*"
        element={
          <>
            {userLogged && <Header />}
            <StyledMain>
              {userLogged && <Menu />}

              <Content>
                <Routes>
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
        }
      />
    </Routes>
  );
};

export default Main;
