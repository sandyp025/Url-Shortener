import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStoreContext } from "../contextApi/ContextApi";
import { ThemeToggle } from "./ui/ThemeToggle";
import { Button } from "./ui/Button";
import { ProfileDropdown } from "./ui/ProfileDropdown";
import { cn } from "../lib/utils";


const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, user } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="h-8 w-8 rounded-lg bg-custom-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl gradient-text">Clipo</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              ...(token ? [{ name: "Dashboard", path: "/dashboard" }] : [])
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative transition-colors hover:text-foreground/80",
                  path === item.path ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.name}
                {path === item.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-custom-gradient rounded-full"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {!token ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button variant="gradient" asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            ) : (
              <ProfileDropdown 
                user={user}
                onLogout={onLogOutHandler}
              />
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            {navbarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {navbarOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t bg-background/95 backdrop-blur"
          >
            <div className="container px-4 py-4 space-y-4">
              <nav className="flex flex-col space-y-2">
                {[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/about" },
                  ...(token ? [{ name: "Dashboard", path: "/dashboard" }] : [])
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setNavbarOpen(false)}
                    className={cn(
                      "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                      path === item.path 
                        ? "bg-accent text-accent-foreground" 
                        : "text-foreground/60 hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="pt-4 border-t">
                {!token ? (
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/login" onClick={() => setNavbarOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button variant="gradient" className="justify-start" asChild>
                      <Link to="/register" onClick={() => setNavbarOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" className="justify-start">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start"
                      onClick={() => {
                        onLogOutHandler();
                        setNavbarOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log out
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;