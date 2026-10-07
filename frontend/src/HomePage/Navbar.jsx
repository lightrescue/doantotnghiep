import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import DropdownAccount from "./DropdownAccount";
import "../styles/Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
    const [query, setQuery] = useState("");
    const [openCats, setOpenCats] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const { count } = useCart();
    const { categories } = useShop();
    const { isLoggedIn, user } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const onSearch = (e) => {
        e.preventDefault();
        const q = query.trim();
        navigate(q ? `/san-pham?q=${encodeURIComponent(q)}` : "/san-pham");
    };

    return (
        <header className={`site-header ${isScrolled ? "header-scrolled" : ""}`}>
            {/* Topbar Announcement */}
            <div className="topbar">
                <div className="container topbar-inner">
                    <div className="topbar-left">
                        <span><i className="fa-solid fa-truck-fast"></i> Giao hàng siêu tốc 2H toàn quốc</span>
                        <span className="topbar-divider"></span>
                        <span><i className="fa-solid fa-shield-halved"></i> 100% Sản phẩm chính hãng</span>
                        <span className="topbar-divider"></span>
                        <span><i className="fa-solid fa-rotate-left"></i> 1 Đổi 1 trong 30 ngày</span>
                    </div>
                    <div className="topbar-right">
                        {isLoggedIn ? (
                            <Link to="/tai-khoan" className="topbar-greeting">
                                <i className="fa-solid fa-circle-user"></i> Xin chào, <b>{user?.name || "Khách hàng"}</b>
                            </Link>
                        ) : (
                            <Link to="/dang-nhap" className="topbar-link"><i className="fa-solid fa-user"></i> Đăng nhập / Đăng ký</Link>
                        )}
                        <Link to="/don-hang" className="topbar-link"><i className="fa-solid fa-boxes-packing"></i> Tra cứu đơn hàng</Link>
                        <a href="tel:19001234" className="topbar-phone"><i className="fa-solid fa-phone"></i> Hotline: <b>1900 1234</b></a>
                    </div>
                </div>
            </div>

            {/* Main Header Navigation */}
            <div className="mainbar">
                <div className="container mainbar-inner">
                    {/* Mobile Hamburger Toggle */}
                    <button 
                        type="button" 
                        className="mobile-menu-toggle" 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Menu"
                    >
                        <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
                    </button>

                    {/* Logo */}
                    <Link to="/" className="logo">
                        <div className="logo-icon-wrap">
                            <i className="fa-solid fa-bolt-lightning"></i>
                        </div>
                        <div className="logo-text">
                            <span className="logo-mark">Vi<span>Qi</span></span>
                            <span className="logo-sub">TECH</span>
                        </div>
                    </Link>

                    {/* Search bar */}
                    <form className="search" onSubmit={onSearch}>
                        <div className="search-input-wrap">
                            <i className="fa-solid fa-magnifying-glass search-icon"></i>
                            <input
                                type="text"
                                placeholder="Bạn tìm iPhone 16 Pro Max, Laptop Gaming, iPad..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {query && (
                                <button type="button" className="clear-search" onClick={() => setQuery("")}>
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            )}
                        </div>
                        <button type="submit" aria-label="Tìm kiếm">
                            <span>Tìm kiếm</span>
                        </button>
                    </form>

                    {/* Hotline Quick Call */}
                    <a href="tel:19001234" className="hotline">
                        <div className="hotline-icon">
                            <i className="fa-solid fa-headset"></i>
                        </div>
                        <div className="hotline-text">
                            <small>Tư vấn miễn phí</small>
                            <strong>1900 1234</strong>
                        </div>
                    </a>

                    {/* Shopping Cart Link */}
                    <Link to="/gio-hang" className="cart">
                        <div className="cart-icon-wrap">
                            <i className="fa-solid fa-cart-shopping"></i>
                            {isLoggedIn && count > 0 && (
                                <span className="cart-count">{count > 99 ? "99+" : count}</span>
                            )}
                        </div>
                        <span className="cart-label">Giỏ hàng</span>
                    </Link>

                    {/* Account Dropdown */}
                    <div className="account-wrap">
                        <DropdownAccount />
                    </div>
                </div>
            </div>

            {/* Category Sub-navigation */}
            <nav className={`catbar ${mobileMenuOpen ? "mobile-open" : ""}`}>
                <div className="container catbar-inner">
                    <div
                        className="cat-toggle-wrap"
                        onMouseLeave={() => setOpenCats(false)}
                    >
                        <button
                            type="button"
                            className="cat-toggle"
                            onClick={() => setOpenCats((v) => !v)}
                            onMouseEnter={() => setOpenCats(true)}
                        >
                            <i className="fa-solid fa-grid-2"></i>
                            <span>Danh mục sản phẩm</span>
                            <i className={`fa-solid fa-chevron-${openCats ? "up" : "down"} arrow-icon`}></i>
                        </button>

                        {openCats && (
                            <div className="cat-dropdown fade-in">
                                {categories.map((c) => (
                                    <Link
                                        key={c.id}
                                        to={`/san-pham?cat=${c.id}`}
                                        className="cat-dropdown-item"
                                        onClick={() => setOpenCats(false)}
                                    >
                                        <div className="cat-icon-badge">
                                            <i className={`fa-solid ${c.icon}`}></i>
                                        </div>
                                        <span>{c.name}</span>
                                        <i className="fa-solid fa-chevron-right cat-arrow"></i>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <ul className="cat-menu">
                        <li><NavLink to="/" end><i className="fa-solid fa-house"></i> Trang chủ</NavLink></li>
                        <li><NavLink to="/san-pham"><i className="fa-solid fa-layer-group"></i> Tất cả sản phẩm</NavLink></li>
                        <li><NavLink to="/khuyen-mai" className="nav-hot"><i className="fa-solid fa-fire"></i> Khuyến mãi Hot</NavLink></li>
                        <li><NavLink to="/tin-tuc"><i className="fa-solid fa-newspaper"></i> Tin công nghệ</NavLink></li>
                        <li><NavLink to="/gioi-thieu"><i className="fa-solid fa-circle-info"></i> Giới thiệu</NavLink></li>
                        <li><NavLink to="/lien-he"><i className="fa-solid fa-envelope"></i> Liên hệ</NavLink></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;

