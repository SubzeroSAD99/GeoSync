import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "../RequireAuth.jsx";
import { useAuth } from "@contexts/AuthContext.jsx";
import { Content, StyledMain } from "./Main.styles.mjs";
import { privateRoutes, publicRoutes } from "@/routes.jsx";
import ProtectedRoute from "./../ProtectedRoute";

// carregar UI pesada só quando precisar
const Header = lazy(() => import("@components/Header/Header.jsx"));
const Menu = lazy(() => import("@components/Menu/Menu.jsx"));

const wrapWithProtection = (element, meta) => {
  if (!meta) return element;
  return (
    <ProtectedRoute resource={meta.resource} action={meta.action}>
      {element}
    </ProtectedRoute>
  );
};

const Main = () => {
  const { userLogged } = useAuth();

  return (
    <Suspense fallback={null}>
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
              {userLogged && (
                <Suspense fallback={null}>
                  <Header />
                </Suspense>
              )}
              <StyledMain>
                {userLogged && (
                  <Suspense fallback={null}>
                    <Menu />
                  </Suspense>
                )}

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
                                  element={wrapWithProtection(
                                    child.element,
                                    child.meta
                                  )}
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
                            element={wrapWithProtection(
                              route.element,
                              route.meta
                            )}
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
    </Suspense>
  );
};

export default Main;
